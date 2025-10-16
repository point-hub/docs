# Multiple Submission Prevention

That's a very common and critical problem in web development, often referred to as a "double submit" or "multiple submission" issue. It occurs when a user clicks a button multiple times quickly, the network is slow, or they use the back button, resulting in duplicate API calls and duplicate data records.

The best solution involves a combination of client-side prevention (for the best user experience) and server-side validation (for guaranteed data integrity).

## Client-Side Prevention

### Button Disabling

Disable the submit button immediately upon the first click. Use Vue state management for this.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isSubmitting = ref(false)

async function handleSubmit() {
  if (isSubmitting.value) {
    return // Prevent immediate double-click
  }

  isSubmitting.value = true // Disable button immediately

  try {
    // 1. Send API Request (e.g., using useApiClientFetch)
    // await useApiClientFetch(...) 

    // 2. Handle Success (e.g., redirect or show message)
    console.log('Form submitted successfully!')
  } catch (error) {
    console.error('Submission failed:', error)
  } finally {
    // 3. Re-enable the button after the request completes (success or failure)
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- ... form fields ... -->
    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Saving...' : 'Submit Form' }}
    </button>
  </form>
</template>
```

### Route Change Guard

This strategy addresses the risk of the user clicking the browser's back or forward button while a submission is pending, which can lead to confusion or unintended duplicate submissions.

You can use the built-in Vue Router Composition API hook, onBeforeRouteLeave, in your form component to manage this.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const isSubmitting = ref(false) // Used to disable the button
const hasUnsavedChanges = ref(false) // Used for navigation guard

// --- 1. Submission Handler (as before) ---
async function handleSubmit() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  hasUnsavedChanges.value = true // Assume changes until API confirms success

  try {
    // API call here
    // await useApiClientFetch(...) 
    
    // Crucial: Only set to false on success
    hasUnsavedChanges.value = false 
  } catch (error) {
    console.error('Submission failed:', error)
  } finally {
    isSubmitting.value = false
  }
}

// --- 2. Route Change Guard Implementation ---
onBeforeRouteLeave((to, from, next) => {
  // If the user has made changes AND the form is NOT currently submitting,
  // ask for confirmation before leaving.
  if (hasUnsavedChanges.value && !isSubmitting.value) {
    const confirmation = window.confirm(
      'You have unsaved changes. Are you sure you want to leave?'
    )
    if (confirmation) {
      next() // Proceed with navigation
    } else {
      next(false) // Cancel navigation
    }
  } else {
    next() // No unsaved changes or form is submitting, proceed immediately
  }
})
</script>
```

::::

## Server-Side Guarantee

Client-side prevention is for UX; server-side logic is for data integrity. You must enforce uniqueness in your database schema to guarantee no duplicates.

### Unique Constraint (Database Schema)

This is the most crucial and non-negotiable step to prevent duplicates. If your application logic requires a specific field or set of fields to be unique (e.g., an email address for registration, or a user can only have one active profile), you must enforce it at the database level.

If you are saving an event record, ensure the combination of related keys (e.g., event_id, user_id, date) forms a unique index.

### Idempotency Key (Advanced/Transactional)

For sensitive, transactional operations (like creating a new order or charging a payment), use a unique Idempotency Key. This is the highest level of server-side defense against retries due to network failures or double submissions.

**Workflow Example:**

1. Client (Nuxt): Before calling the API, generate a unique ID (UUID, e.g., c2a5d...) and send it in a custom HTTP header: X-Idempotency-Key.

2. Server (Bun):

- **Check:** Look up the received `X-Idempotency-Key` in a dedicated, short-lived storage (like Redis or a special table).
- **Duplicate:** If the key exists, it means the request was already executed. Immediately return the successful status code (e.g., 200/201) associated with the previous request, and do not run the database insertion logic again.
- **New Request:** If the key is new, execute the database logic, save the key, and then return the response.

This ensures that regardless of how many times the client sends the same request (e.g., due to network retry logic), the transaction only executes once.
:::code-group
```ts [Backend]
/**
 * Server-Side Logic for Idempotency Key Check
 * * This prevents duplicate record creation even if the client retries the request.
 * It uses an in-memory Map to track processed keys for a short duration.
 */

// Define how long an idempotency key remains valid (e.g., 5 minutes)
const IDEMPOTENCY_WINDOW_MS = 5 * 60 * 1000;

// Storage for processed keys: Map<key: string, timestamp: number>
// In a production environment, this would be Redis or a database table.
const processedKeys = new Map<string, number>();

// Simulated Database Record Storage
const records: { id: number; data: string }[] = [];
let nextRecordId = 1;

/**
 * Handles the submission of a new form record, enforced by idempotency.
 */
async function handleFormSubmission(request: Request): Promise<Response> {
    // 1. Extract the Idempotency Key
    // The client sends this key in a custom header (e.g., 'X-Idempotency-Key')
    const idempotencyKey = request.headers.get('X-Idempotency-Key');

    if (!idempotencyKey) {
        return new Response(JSON.stringify({ error: "Missing X-Idempotency-Key header." }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 2. Check if the key has already been processed
    if (processedKeys.has(idempotencyKey)) {
        console.log(`[IDEMPOTENT] Key ${idempotencyKey} already processed. Skipping database write.`);
        
        // Return a successful status code (200/201) to the client.
        // In a real application, you might look up and return the previously created resource.
        return new Response(JSON.stringify({ 
            message: "Request already processed successfully.", 
            key: idempotencyKey 
        }), {
            status: 200, 
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 3. Process the new, unique request
    console.log(`[NEW REQUEST] Processing key ${idempotencyKey}...`);
    
    // Parse the form data (simulating receiving application data)
    const body = await request.json();
    
    // SIMULATE DATABASE WRITE
    const newRecord = { 
        id: nextRecordId++, 
        data: body.content || 'Default Data',
    };
    records.push(newRecord);
    
    // 4. Store the processed key and timestamp
    processedKeys.set(idempotencyKey, Date.now());

    // 5. Respond with success
    console.log(`[SUCCESS] Record ${newRecord.id} created.`);
    return new Response(JSON.stringify({ 
        message: "Record created successfully.", 
        record: newRecord 
    }), {
        status: 201, 
        headers: { 'Content-Type': 'application/json' },
    });
}

// -----------------------------------------------------------------------
// Optional: Cleanup old keys (In a real app, Redis TTL handles this)
// This is a minimal simulation. A production app would use Redis expiration.
function cleanupKeys() {
    const now = Date.now();
    for (const [key, timestamp] of processedKeys.entries()) {
        if (now - timestamp > IDEMPOTENCY_WINDOW_MS) {
            processedKeys.delete(key);
            // console.log(`Cleaned up expired key: ${key}`);
        }
    }
}
// Run cleanup every minute
setInterval(cleanupKeys, 60000); 
// -----------------------------------------------------------------------


// Set up the Bun HTTP Server
Bun.serve({
    port: 3001,
    async fetch(request: Request) {
        const url = new URL(request.url);

        if (url.pathname === '/api/submit-form' && request.method === 'POST') {
            return handleFormSubmission(request);
        }

        // Default handler for other routes
        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Bun server running on http://localhost:3001`);
```
```ts [Frontend]
import { v4 as uuidv4 } from 'uuid'; // Use a UUID generator

async function handleSubmit() {
    // 1. Generate the unique Idempotency Key before submission
    const idempotencyKey = uuidv4(); 
    
    // 2. Disable button and submit...
    
    try {
        await useApiClientFetch('/api/submit-form', {
            method: 'POST',
            body: { content: 'Form Data' },
            headers: {
                // 3. Send the key in the custom header
                'X-Idempotency-Key': idempotencyKey, 
            }
        });
        // Success
    } catch (e) {
        // Handle error
    }
}
```
:::
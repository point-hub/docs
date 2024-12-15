# Fail Fast

Fail fast is the idea that a system should detect and report errors as soon as they occur, rather than allowing them to propagate and potentially lead to more difficult-to-diagnose problems.

**Purpose:** By catching errors early, you can prevent further problems, improve debugging, and enhance system reliability.

## Incorrect Example

In this approach, the validation is done only after all steps are performed. This can lead to unnecessary operations or calculations being done before identifying an issue.

```ts
interface User {
  username: string;
  email: string;
  password: string;
}

function registerUser(user: User): void {
  // Step 1: Simulate some operations that may fail
  console.log("Checking availability of username...");
  // Assume this step takes some time or involves a database check
  
  console.log("Sending confirmation email...");
  // Again, simulate some email-sending process
  
  // Only validate at the end
  if (user.username.length < 3) {
    console.log("Username validation failed.");
  }
  
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(user.email)) {
    console.log("Email validation failed.");
  }
  
  if (user.password.length < 8) {
    console.log("Password validation failed.");
  }
  
  // This could lead to multiple failures being identified later, but resources are wasted.
  console.log("User registration completed (despite errors).");
}

// Test with an invalid user
const user = { username: "JD", email: "invalid-email", password: "short" };
registerUser(user);
```

Why it's incorrect: 

- Multiple operations (like checking username availability or sending emails) are done before the validation is done, even though the inputs are invalid.
- Unnecessary work is performed, which can be inefficient, especially in scenarios where you're interacting with external services or databases.
- You only catch validation issues at the end, after all operations are performed.


## Correct Example

In this approach, we immediately validate inputs, and if any input is incorrect, we stop further processing and throw an error. This is the "fail-fast" strategy — stop as soon as you detect an issue.

```ts
interface User {
  username: string;
  email: string;
  password: string;
}

function validateUsername(username: string): void {
  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters long.");
  }
}

function validateEmail(email: string): void {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid email format.");
  }
}

function validatePassword(password: string): void {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
}

function registerUser(user: User): void {
  try {
    // Fail fast - Validate inputs first
    validateUsername(user.username);
    validateEmail(user.email);
    validatePassword(user.password);
    
    // If validation passes, proceed with registration (e.g., database operations)
    console.log("User registration successful.");
  } catch (error) {
    // Handle the validation failure immediately
    console.error(`Registration failed: ${error.message}`);
  }
}

// Test with an invalid user
const invalidUser = { username: "JD", email: "invalid-email", password: "short" };
registerUser(invalidUser);
```

Why it's correct:

1. Failing Fast on Invalid Inputs:
    - The moment an invalid input is detected (e.g., username too short, invalid email, or weak password), an error is thrown, and further processing stops.
    - This ensures that no unnecessary operations (like checking username availability or sending an email) are executed if the inputs are invalid.

2. Clearer Error Messages:
    - The errors are thrown with specific messages indicating exactly what went wrong. You know exactly what needs to be fixed.

3. Early Exit:
    - If any validation fails, the function exits immediately with an error, preventing further code execution. This is efficient and ensures that the system doesn't proceed with invalid data.
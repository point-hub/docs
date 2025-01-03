# DRY (Don’t Repeat Yourself)

This principle encourages avoiding the duplication of code. When a piece of logic or functionality is repeated, it should be abstracted into a reusable function or module.

**Purpose:** Repeated code makes maintenance more difficult and increases the risk of bugs. By abstracting logic, you make the codebase more modular and maintainable.

## Problem

Imagine you're validating user input for registration where the same validation logic is repeated for multiple fields like username and email.

```ts
function validateUsername(username: string): boolean {
  if (username.length < 5) {
    console.log("Username must be at least 5 characters long");
    return false;
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    console.log("Username can only contain letters and numbers");
    return false;
  }
  return true;
}

function validateEmail(email: string): boolean {
  if (email.length < 5) {
    console.log("Email must be at least 5 characters long");
    return false;
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    console.log("Invalid email format");
    return false;
  }
  return true;
}

function validateUserForm(username: string, email: string): void {
  if (!validateUsername(username)) {
    console.log("Invalid Username");
  }
  if (!validateEmail(email)) {
    console.log("Invalid Email");
  }
}

validateUserForm("user123", "test@example.com");
```

Why It's Incorrect:

- The logic for validating the length of the username and email, and also the validation patterns (like checking the format of the email or username), is repeated.
- If the length validation or regex pattern changes, you'd need to modify it in multiple places.

## Solution

To follow the DRY principle, we can create a generic validation function for length and pattern checking and use it in the specific validation functions.

```ts
function validateLength(value: string, minLength: number): boolean {
  if (value.length < minLength) {
    console.log(`${value} must be at least ${minLength} characters long`);
    return false;
  }
  return true;
}

function validatePattern(value: string, pattern: RegExp, errorMessage: string): boolean {
  if (!pattern.test(value)) {
    console.log(errorMessage);
    return false;
  }
  return true;
}

function validateUsername(username: string): boolean {
  if (!validateLength(username, 5)) {
    return false;
  }
  if (!validatePattern(username, /^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")) {
    return false;
  }
  return true;
}

function validateEmail(email: string): boolean {
  if (!validateLength(email, 5)) {
    return false;
  }
  if (!validatePattern(email, /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email format")) {
    return false;
  }
  return true;
}

function validateUserForm(username: string, email: string): void {
  if (!validateUsername(username)) {
    console.log("Invalid Username");
  }
  if (!validateEmail(email)) {
    console.log("Invalid Email");
  }
}

validateUserForm("user123", "test@example.com");
```

Why It's Correct:

- **DRY with Helper Functions:** We created two reusable helper functions:
  - validateLength: Checks if the string is long enough.
  - validatePattern: Validates the string against a regex pattern.
- **Reusable Logic:** Instead of repeating the length and pattern validation logic inside each specific function, we now call the helper functions, making the code cleaner and reducing redundancy.
- **Maintainability:** If the length validation logic or regex patterns need to change, you only need to update the helper functions instead of repeating the changes in multiple places.
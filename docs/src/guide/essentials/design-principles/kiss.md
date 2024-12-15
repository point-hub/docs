# KISS (Keep It Simple, Stupid)

This principle emphasizes simplicity in code. Avoid unnecessary complexity and strive for solutions that are as simple as possible but still meet the requirements.

**Purpose:** Simple code is easier to read, understand, and maintain. Complexity should be introduced only when absolutely necessary.

## Incorrect Example

Here, the code is unnecessarily complex, making it harder to understand than it needs to be.

```ts
class User {
  private _name: string;
  private _email: string;
  private _isActive: boolean;

  constructor(name: string, email: string, isActive: boolean) {
    this._name = name;
    this._email = email;
    this._isActive = isActive;
  }

  // Complex method with unnecessary checks
  public getDetails(): string {
    let userDetails = "";
    if (this._isActive) {
      userDetails += `Name: ${this._name}, `;
    } else {
      userDetails += `Name: Inactive User, `;
    }

    if (this._email.indexOf("@") !== -1) {
      userDetails += `Email: ${this._email}, `;
    } else {
      userDetails += `Email: Invalid Email, `;
    }

    // A complex and long conditional statement that could be avoided
    if (this._name.length > 0 && this._email.length > 0 && this._isActive) {
      return `Active User Details - ${userDetails}`;
    } else if (
      this._name.length > 0 &&
      this._email.length > 0 &&
      !this._isActive
    ) {
      return `Inactive User Details - ${userDetails}`;
    } else if (this._name.length === 0 || this._email.length === 0) {
      return `Incomplete User Details`;
    } else {
      return `Unknown User Details`;
    }
  }
}
```

Why It's Incorrect:

- The method `getDetails()` does a lot of unnecessary checks.
- It makes the code more complex than it needs to be.
- There are redundant conditions and checks that can be simplified.
- The user details could be returned in a much cleaner way.

## Correct Example

Now, let's simplify the logic and make it more readable.

```ts
class User {
  private _name: string;
  private _email: string;
  private _isActive: boolean;

  constructor(name: string, email: string, isActive: boolean) {
    this._name = name;
    this._email = email;
    this._isActive = isActive;
  }

  public getDetails(): string {
    const status = this._isActive ? "Active" : "Inactive";
    const email = this._email.includes("@") ? this._email : "Invalid Email";

    return `${status} User - Name: ${this._name}, Email: ${email}`;
  }
}
```

Why It's Correct:
- The method `getDetails()` is much simpler.
- It checks for the user's status (Active or Inactive) and their email format in a more straightforward way.
- The conditional logic is minimal and avoids unnecessary complexity.
- It's easy to understand and maintain.

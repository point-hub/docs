# Separation of Concerns (SoC)

This principle states that different concerns or responsibilities of a program should be separated into distinct sections.

**Purpose:** Separation of concerns helps make the code more modular, easier to maintain, and allows changes to one part of the system without affecting others.

## Problem

In this example, a class mixes the concerns of data storage, business logic, and presentation:

```ts
class UserManager {
  private users: string[] = [];

  constructor() {
    // Initialization
  }

  // Concern 1: Data handling
  addUser(user: string): void {
    this.users.push(user);
    console.log(`User ${user} added to the system.`);  // Mixing logic with UI
  }

  // Concern 2: Business logic
  getUser(userId: number): string {
    if (userId < 0 || userId >= this.users.length) {
      throw new Error("User not found.");
    }
    return this.users[userId];
  }

  // Concern 3: Presentation logic (UI logic mixed with data handling)
  renderUserList(): void {
    this.users.forEach((user) => {
      console.log(`<li>${user}</li>`);  // Presentation logic mixed in
    });
  }
}
```

Issues with this code:
- **Data handling** (adding and retrieving users) is mixed with **presentation logic** (rendering user list).
- **Business logic** is also embedded in the UserManager class, making it harder to maintain and test.


## Solution

Here’s how you could refactor the code to follow the Separation of Concerns principle by dividing the responsibilities into different classes:

```ts
// Concern 1: Data handling (Model)
class UserManager {
  private users: string[] = [];

  addUser(user: string): void {
    this.users.push(user);
  }

  getUser(userId: number): string {
    if (userId < 0 || userId >= this.users.length) {
      throw new Error("User not found.");
    }
    return this.users[userId];
  }

  getAllUsers(): string[] {
    return this.users;
  }
}

// Concern 2: Presentation (View)
class UserView {
  renderUserList(users: string[]): void {
    users.forEach((user) => {
      console.log(`<li>${user}</li>`);  // Purely presentation logic
    });
  }
}

// Concern 3: Business Logic (Controller)
class UserController {
  private userManager: UserManager;
  private userView: UserView;

  constructor(userManager: UserManager, userView: UserView) {
    this.userManager = userManager;
    this.userView = userView;
  }

  addNewUser(user: string): void {
    this.userManager.addUser(user);
    this.displayUserList();
  }

  displayUserList(): void {
    const users = this.userManager.getAllUsers();
    this.userView.renderUserList(users);
  }
}
```

Explanation:
- **UserManager:** Handles data management (add user, get user, get all users).
- **UserView:** Takes care of presentation (rendering the user list).
- **UserController:** Coordinates between UserManager and UserView. It handles the business logic of adding a user and displaying the list.

## Benefits of this structure

- **Maintainability:** Each class has a single responsibility and can be modified independently without affecting the others.
- **Testability:** The logic for handling users, presentation, and business rules are separated, making it easier to test each part individually.
- **Extensibility:** You can add new features (like different types of views or complex user management features) without tightly coupling the system components.
# Clean Architecture

Clean Architecture follows this principle by organizing the system into layers or circles, each with its own set of responsibilities.

In Clean Architecture, you usually see the following layers:

- **Entities (Core domain):** Business rules, independent of any external systems.
- **Use Cases / Application Layer:** Application-specific business rules, how the system should behave.
- **Interface Adapters:** Code that converts between the external systems (e.g., UI, databases, APIs) and the internal domain models.
- **Frameworks & Drivers:** External systems and tools (e.g., databases, web frameworks, libraries).

## Incorrect Example

```ts
// Mixing layers: business logic and data access within the same class

class UserController {
  private users: Map<string, { id: string; name: string }> = new Map();

  async updateUserName(req: { userId: string; newName: string }) {
    // Data access logic mixed with business logic
    const user = this.users.get(req.userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    // Business logic
    user.name = req.newName;

    // Save back to data store
    this.users.set(req.userId, user);

    console.log('User name updated successfully');
  }

  // Direct data access in the controller
  addUser(id: string, name: string) {
    this.users.set(id, { id, name });
  }
}

// Example usage
const userController = new UserController();
userController.addUser('123', 'John');
userController.updateUserName({ userId: '123', newName: 'Alice' });
```

Issues with this Approach:
- **Data Access & Business Logic Mixed in Controller:** The controller now not only handles HTTP requests but also manages the in-memory database. This violates separation of concerns.
- **Lack of Use Cases:** There is no clear "use case" layer to manage the business logic separately from the UI/controller or data access.
- **Hard to Test:** The controller is responsible for too many things, making it harder to unit test and maintain.

## Correct Example

::: code-group
```ts [Entities]
class User {
  constructor(public id: string, public name: string) {}

  // Business logic for User entity can go here
  changeName(newName: string) {
    this.name = newName;
  }
}
```

```ts [Use Case]
interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

class UpdateUserName {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, newName: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.changeName(newName);
    await this.userRepository.save(user);
  }
}
```

```ts [Interface Adapters]
class UserController {
  constructor(private updateUserName: UpdateUserName) {}

  async updateUserName(req: { userId: string; newName: string }) {
    try {
      await this.updateUserName.execute(req.userId, req.newName);
      console.log('User name updated successfully');
    } catch (error) {
      console.error('Failed to update user name:', error);
    }
  }
}
```

```ts [Frameworks & Drivers]
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
}
```

```ts [Example Usage]
// Example usage
const userRepository = new InMemoryUserRepository();
const updateUserName = new UpdateUserName(userRepository);
const userController = new UserController(updateUserName);

// Simulate HTTP request
userController.updateUserName({ userId: '123', newName: 'Alice' });
```
:::

Key Principles Demonstrated:
- Entities (e.g., User class): Contains the core business logic and domain rules.
- Use Cases (e.g., UpdateUserName): Represents application-specific logic that coordinates entities to achieve the business goal.
- Interface Adapters (e.g., UserController): Translates input from the user interface (e.g., HTTP request) into something the use case can understand.
- Frameworks & Drivers (e.g., InMemoryUserRepository): Provides concrete implementations of external components like databases or external APIs.
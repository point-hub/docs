# Repository Pattern

The Repository Pattern is a design pattern used to manage data access and abstract the interaction with the data source (such as databases or APIs). It allows you to centralize the logic for querying and updating data, and it can be used to separate the domain logic from the data access logic.

## Incorrect Example

The incorrect implementation would violate one or more principles of the repository pattern, such as directly interacting with the data source inside business logic, or not properly abstracting the data source

```ts
// Entity class
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}

// Incorrect repository implementation
class IncorrectUserRepository {
  private users: User[] = [];

  // Directly performs CRUD operations in the same class (mixes business logic and data access)
  async createUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async updateUser(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) throw new Error("User not found");
    this.users[index] = user;
  }

  async deleteUser(id: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");
    this.users.splice(index, 1);
  }

  // Problematic: Logic directly interacting with an external data source like a database should be handled elsewhere
  async saveUserToDatabase(user: User): Promise<void> {
    // This method should not be here! The repository should abstract away this logic.
    // Let's simulate a database call for demonstration.
    console.log("Saving user to database...");
  }
}

// Usage
(async () => {
  const userRepository = new IncorrectUserRepository();

  // Creating a user
  const newUser = new User(1, "Jane Doe", "jane@example.com");
  await userRepository.createUser(newUser);

  // Directly dealing with database logic is bad practice
  await userRepository.saveUserToDatabase(newUser); // This should not be part of the repository
})();
```

Problems in the Incorrect Example:

- **Mixed Concerns:** The IncorrectUserRepository class mixes business logic (creating, updating, deleting users) with data access logic (e.g., saving to a database). This breaks the separation of concerns and makes the code harder to maintain and test.
- **Not Abstracted:** The saveUserToDatabase method is directly tied to a specific implementation of data persistence (e.g., saving to a database), which is not abstracted. In the Repository Pattern, you would want to abstract the actual data source logic to avoid tight coupling between the business logic and the storage details.
- **Lack of Interface:** The repository should ideally implement an interface, which allows you to easily swap implementations, e.g., switching from an in-memory repository to a database-backed repository without affecting the business logic.

## Correct Example

In the correct example, the repository class properly abstracts data access and exposes methods to interact with the data, without directly exposing implementation details of the data source (e.g., database, API).

```ts
// Entity class
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}

// Repository interface
interface IUserRepository {
  getById(id: number): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}

// Implementation of the repository (e.g., using an in-memory store or a database)
class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async getById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) throw new Error("User not found");
    this.users[index] = user;
    return user;
  }

  async delete(id: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");
    this.users.splice(index, 1);
  }
}

// Usage
(async () => {
  const userRepository: IUserRepository = new InMemoryUserRepository();

  // Create a new user
  const user = new User(1, "John Doe", "john@example.com");
  await userRepository.create(user);

  // Fetch user by ID
  const fetchedUser = await userRepository.getById(1);
  console.log(fetchedUser); // Output: User { id: 1, name: 'John Doe', email: 'john@example.com' }

  // Update user
  user.name = "John Doe Updated";
  await userRepository.update(user);

  // Fetch all users
  const allUsers = await userRepository.getAll();
  console.log(allUsers);

  // Delete user
  await userRepository.delete(1);
})();
```

Explanation:
- **Entity:** The User class represents an entity that will be persisted in the data source.
- **Repository Interface:** The IUserRepository interface defines common methods for data access (CRUD operations).
- **Repository Implementation:** The InMemoryUserRepository class implements the IUserRepository interface and uses an in-memory array to simulate data storage. In a real-world scenario, this would be replaced with an actual database or external data source.
- **Usage:** The repository methods are called asynchronously, and the operations abstract away the actual data persistence details.

# Clean Architecture

Clean Architecture follows this principle by organizing the system into layers or circles, each with its own set of responsibilities.

In Clean Architecture, you usually see the following layers:

- **Entities (Core domain):** Business rules, independent of any external systems.
- **Use Cases / Application Layer:** Application-specific business rules, how the system should behave.
- **Interface Adapters:** Code that converts between the external systems (e.g., UI, databases, APIs) and the internal domain models.
- **Frameworks & Drivers:** External systems and tools (e.g., databases, web frameworks, libraries).

## Problem

Without Clean Architecture, you're likely to face increased complexity, higher maintenance costs, and a less flexible system that is difficult to test, scale, and evolve. 

Clean Architecture is intended to solve these problems by organizing code into distinct layers with well-defined boundaries, making the system more modular, testable, and maintainable.

Let's break down the common issues:

1. Tightly Coupled Code

- **Problem:** When components of the system (e.g., database access, user interface, business logic) are tightly coupled, changes to one part of the system can have wide-reaching effects on others. This makes it difficult to modify or extend the system over time without introducing unintended side effects.
- **Impact:** Adding new features, fixing bugs, or refactoring becomes more challenging. Testing individual components is also difficult because of the dependencies between them.

2. Hard-to-Test Code

- **Problem:** Without clean architecture, business logic, data access, and presentation layers are often intertwined, making it hard to test them in isolation.
- **Impact:** Unit tests become complex or impossible to write. The lack of clear boundaries makes it difficult to mock dependencies or isolate components for testing purposes.

3. Code Duplication

- **Problem:** If you're not adhering to clear architectural principles, you might end up duplicating business logic or functionality across different layers of the application.
- **Impact:** This increases maintenance overhead. Any changes to duplicated logic must be replicated across multiple places, leading to higher risk of bugs or inconsistencies.

4. Lack of Flexibility

- **Problem:** Systems without a clean architecture are often hard to change because the code is entangled in such a way that making one change may affect multiple parts of the application. For example, modifying the user interface layer might require changes in the business logic or data access layers.
- **Impact:** The application becomes fragile. It’s hard to swap out or upgrade technologies (e.g., switching from a SQL database to NoSQL, or changing the UI framework).

5. Difficult to Scale

- **Problem:** Poor separation of concerns and a lack of modularity make it difficult to scale specific parts of the system.
- **Impact:** As the application grows in size and complexity, it becomes increasingly hard to scale different parts of the application independently. For example, scaling the backend service may require making changes to the user interface as well, even though they are separate concerns.

6. Inconsistent Codebase

- **Problem:** Without clear architectural guidelines, different parts of the code may be written in inconsistent styles or using different patterns. This can lead to confusion for new developers and difficulties when trying to maintain or extend the system.
- **Impact:** It becomes harder to onboard new developers, and existing developers may struggle to understand the reasoning behind certain decisions. This leads to a fractured development process and inconsistency in code quality.

7. Hard to Maintain and Extend

- **Problem:** Without clear modularity and separation of concerns, extending the system with new features or maintaining existing functionality becomes more difficult.
- **Impact:** As more features are added, the system's complexity increases, making future changes riskier and more prone to introducing defects. It also becomes difficult to track down where certain behaviors are defined, which slows down the process of fixing bugs or adding new features.

8. Inflexibility to Replace Frameworks/Technologies

- **Problem:** In tightly coupled systems, if you're using a specific framework (e.g., a web framework or ORM), replacing that framework can be a very painful process, as the system is likely designed around that specific tool.
- **Impact:** It's much harder to refactor or replace parts of your application that are tightly coupled with specific tools or libraries. This can make it difficult to adapt to new technologies or adopt better practices.

9. Spaghetti Code

- **Problem:** Without clean architectural boundaries, you might end up with "spaghetti code," where the flow of the program is tangled and convoluted, making it hard to understand how the system operates.
- **Impact:** The complexity of the codebase becomes overwhelming, and it becomes increasingly hard to understand how to add new features or fix bugs without inadvertently breaking other parts of the application.

10. Poor Dependency Management

- **Problem:** Without the discipline of Clean Architecture, dependencies between different parts of the application can become poorly managed. For example, the business logic layer might depend directly on the UI layer or the database layer.
- **Impact:** Dependency management becomes a headache as the system grows, leading to circular dependencies, difficulty in maintaining the code, and challenges in testing.

11. Lack of Separation Between Concerns

- **Problem:** If you're not separating business logic, data access, and user interfaces clearly, you'll end up with a system that lacks clear boundaries between its concerns.
- **Impact:** This increases the risk of logic leaking across different layers of the application. For example, a change to the data storage logic might have unexpected effects on the user interface.

12. Poor Reusability

- **Problem:** Without adhering to clean architectural principles, components of the system are less likely to be reusable because they’re tightly coupled to other parts of the system.
- **Impact:** Reusing or sharing logic across multiple applications or modules becomes difficult, leading to code duplication or reinventing the wheel.


## Solution

By adhering to Clean Architecture, you can ensure that your application remains scalable, adaptable, and easy to maintain over time, regardless of how large or complex it becomes.

::: code-group
```ts [Entities]
export class Customer {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string
  ) {}

  // Example of business logic to update customer details
  public updateContactInfo(newEmail: string, newPhoneNumber: string): void {
    if (!this.isValidEmail(newEmail)) {
      throw new Error('Invalid email');
    }
    this.email = newEmail;
    this.phoneNumber = newPhoneNumber;
  }

  private isValidEmail(email: string): boolean {
    // Simple email validation (just an example)
    return email.includes('@');
  }
}
```

```ts [Use Case]
import { Customer } from "../entities/Customer";

// Define an interface for the customer repository
export interface ICustomerRepository {
  save(customer: Customer): Promise<void>;
  findByEmail(email: string): Promise<Customer | undefined>;
}

// Use case for creating a customer
export class CreateCustomer {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(firstName: string, lastName: string, email: string, phoneNumber: string): Promise<Customer> {
    // Check if customer already exists (based on email)
    const existingCustomer = await this.customerRepository.findByEmail(email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }

    // Create a new customer
    const customer = new Customer(this.generateId(), firstName, lastName, email, phoneNumber);

    // Save the customer
    await this.customerRepository.save(customer);

    return customer;
  }

  private generateId(): string {
    return Math.floor(Math.random() * 100000).toString();
  }
}
```

```ts [Interface Adapters]
import { ICustomerRepository } from "../usecases/CreateCustomer";
import { Customer } from "../entities/Customer";

// In-memory repository implementation
export class InMemoryCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
    console.log('Customer saved:', customer);
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.email === email);
  }
}
```

```ts [Frameworks & Drivers]
import express, { Request, Response } from "express";
import { CreateCustomer } from "../usecases/CreateCustomer";
import { InMemoryCustomerRepository } from "../repositories/CustomerRepository";

// Setup the repository and use case
const customerRepository = new InMemoryCustomerRepository();
const createCustomerUseCase = new CreateCustomer(customerRepository);

// Express setup
const app = express();
app.use(express.json());

// Endpoint to create a new customer
app.post("/customers", async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  try {
    const customer = await createCustomerUseCase.execute(firstName, lastName, email, phoneNumber);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```
:::

### Directory Structure

```
src/
├── controllers/
│   └── CustomerController.ts
├── entities/
│   └── Customer.ts
├── repositories/
│   └── CustomerRepository.ts
├── usecases/
│   └── CreateCustomer.ts
└── app.ts

```

Key Principles Demonstrated:
- **Entities (Core Business Logic for Customer):** The Customer entity will represent the core of the application, holding properties and business logic related to a customer.
- **Use Case (Business Logic for Creating and Managing Customers):** The use case defines the logic for interacting with the Customer entity and repositories.
- **Interface Adapters (Interface Adapter for Managing Customer Data):** This layer interacts with the data source (in-memory, database, etc.). We'll implement an in-memory repository for simplicity.
- **Frameworks & Drivers (Web Layer for Exposing HTTP Endpoints):** The controller layer will expose a simple HTTP endpoint to create a customer and manage customer data.


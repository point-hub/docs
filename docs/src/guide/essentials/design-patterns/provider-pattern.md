# Provider Pattern

The Provider pattern is commonly used to abstract the creation and provisioning of dependencies or services in various contexts like dependency injection

## Problem

1. Direct instantiation inside the provider (which breaks the abstraction).
2. No clear separation between the interface of the provider and the concrete implementation.

```ts
// Incorrect Example: 
class Service {
  getData() {
    return "Service Data";
  }
}

class ServiceProvider {
  // The provider directly instantiates the service, breaking the pattern.
  provide() {
    return new Service(); // No abstraction over the service creation
  }
}

// Usage:
const provider = new ServiceProvider();
const service = provider.provide();
console.log(service.getData()); // "Service Data"
```

## Solution

1. Use an interface for the service provider.
2. Separate creation logic to make the provider more reusable and flexible.
3. Avoid direct instantiation within the provider class.

```ts
// Correct Example:

// Service interface
interface IService {
  getData(): string;
}

// Concrete implementation of the service
class Service implements IService {
  getData() {
    return "Service Data";
  }
}

// Another possible service implementation (e.g., a mock service)
class MockService implements IService {
  getData() {
    return "Mock Service Data";
  }
}

// ServiceProvider that abstracts the instantiation of services
class ServiceProvider {
  private serviceFactory: () => IService;

  constructor(serviceFactory: () => IService) {
    this.serviceFactory = serviceFactory;  // Accepts a factory function to create the service
  }

  provide(): IService {
    return this.serviceFactory();  // Uses the factory to create the service
  }
}

// Usage:
const serviceProvider = new ServiceProvider(() => new Service());
const service = serviceProvider.provide();
console.log(service.getData());  // "Service Data"

// If we need a mock service for testing:
const mockServiceProvider = new ServiceProvider(() => new MockService());
const mockService = mockServiceProvider.provide();
console.log(mockService.getData());  // "Mock Service Data"
```

Explanation: 
- **IService Interface:** This defines the contract that all service implementations must follow. Both Service and MockService implement this interface.
- **ServiceProvider:** It accepts a factory function (serviceFactory) that is responsible for creating instances of services. This abstraction allows flexibility in providing different service implementations (e.g., real or mock services).
- **Factory Function:** By passing a factory function to the provider, we make it easy to change the implementation of IService without modifying the provider itself.

Benefits of the Correct Approach:
- **Decoupling:** The provider doesn't need to know about the concrete Service class. It only knows how to provide an IService instance.
- **Flexibility:** You can easily swap the service implementation by changing the factory function, making it easier to adapt the provider to different contexts (e.g., production vs. testing).
- **Testability:** It's easy to inject a mock or stub implementation for testing purposes without modifying the provider.
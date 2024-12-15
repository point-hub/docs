# Strategy Pattern

The Strategy Pattern is a behavioral design pattern that allows an object to choose a behavior at runtime from a family of algorithms (strategies). This pattern defines a set of algorithms, encapsulates each one, and makes them interchangeable. The strategy allows the algorithm to vary independently from clients that use it.

Strategy Pattern can be seen as an implementation that helps with Separation of Concerns in a specific context. By encapsulating different behaviors (algorithms or strategies) in separate classes, you reduce the coupling between the context and the specific behavior, which aligns with the SoC principle.

While SoC applies more broadly to the system architecture and encourages modularization across various concerns (UI, business logic, etc.), the Strategy Pattern is a way to achieve Separation of Concerns within a specific behavior or task (like choosing different payment strategies).

## Incorrect Implementation

In the incorrect example, the Strategy pattern is implemented in a way that violates the core principle of the pattern, which is separation of concerns. A possible mistake could be that the context class (which uses the strategy) is directly responsible for creating or managing the strategies, which goes against the idea of decoupling strategies from the context.

```ts
class PayPalPayment {
  processPayment(amount: number) {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

class CreditCardPayment {
  processPayment(amount: number) {
    console.log(`Processing Credit Card payment of $${amount}`);
  }
}

class PaymentService {
  private strategy: any;

  constructor(paymentMethod: string) {
    // The PaymentService class is directly responsible for choosing the strategy.
    if (paymentMethod === 'paypal') {
      this.strategy = new PayPalPayment();
    } else if (paymentMethod === 'creditcard') {
      this.strategy = new CreditCardPayment();
    }
  }

  executePayment(amount: number) {
    this.strategy.processPayment(amount); // Error: strategy can be null or undefined
  }
}

const paymentService = new PaymentService('paypal');
paymentService.executePayment(100);
```

Problems with the Incorrect Implementation:

1. **Tight Coupling:** PaymentService is directly responsible for creating instances of the payment strategies (PayPalPayment and CreditCardPayment). This makes the code less flexible and harder to maintain.
2. **Poor Extensibility:** If new payment strategies need to be added (like BitcoinPayment, etc.), the PaymentService class must be modified every time. This violates the Open/Closed Principle.
3. **Fragility:** The class could break if an invalid paymentMethod is passed (e.g., the strategy would be null).

## Correct Implementation

The context (PaymentService) should not be responsible for instantiating the strategy; instead, it should be provided with a strategy at runtime. The strategy itself should be an abstraction with different concrete implementations.

```ts
// Correct Strategy pattern implementation in TypeScript

// Strategy Interface
interface PaymentStrategy {
  processPayment(amount: number): void;
}

// Concrete Strategy 1: PayPalPayment
class PayPalPayment implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

// Concrete Strategy 2: CreditCardPayment
class CreditCardPayment implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Processing Credit Card payment of $${amount}`);
  }
}

// Context Class
class PaymentService {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  executePayment(amount: number) {
    this.strategy.processPayment(amount);
  }
}

// Client Code
const paypal = new PayPalPayment();
const creditCard = new CreditCardPayment();

const paymentService = new PaymentService(paypal);
paymentService.executePayment(100); // Using PayPal payment strategy

paymentService.setStrategy(creditCard); // Changing strategy to Credit Card
paymentService.executePayment(200); // Using Credit Card payment strategy
```

Explanation:
- **Strategy Interface:** PaymentStrategy defines the contract (processPayment) that all concrete strategies must implement.
- **Concrete Strategies:** PayPalPayment and CreditCardPayment implement the PaymentStrategy interface and provide their own versions of the processPayment method.
- **Context:** PaymentService accepts a PaymentStrategy object in its constructor. It can also change the strategy at runtime with the setStrategy method, without needing to change the code of the context.
- **Client:** The client is free to choose the strategy (e.g., PayPalPayment or CreditCardPayment) and even switch strategies during runtime.

Benefits of the Correct Implementation:
- **Separation of Concerns:** The PaymentService class does not care about how the payment is processed; it delegates this responsibility to the strategy.
- **Flexibility:** We can easily add new payment methods by creating new concrete strategy classes that implement the PaymentStrategy interface, without modifying the existing classes.
- **Open/Closed Principle:** The code is open for extension (e.g., adding new payment methods) but closed for modification.
- **Easier Testing:** It’s easier to mock the PaymentStrategy interface when writing tests for the PaymentService.

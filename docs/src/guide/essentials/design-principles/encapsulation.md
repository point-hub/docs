# Encapsulation

Encapsulation refers to bundling data (variables) and methods that operate on the data into a single unit or class, and restricting access to some of the object's components.

**Purpose:** It helps protect the integrity of the data and prevents unintended interference or misuse.

## Problem

Without proper encapsulation, where the balance and accountHolder are publicly accessible and modifiable

```ts
class BankAccount {
  // Public properties: no restrictions on accessing or modifying them
  public balance: number;
  public accountHolder: string;

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  // Public method: deposit money into the account
  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log('Deposit amount must be greater than zero.');
    } else {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance is $${this.balance}.`);
    }
  }

  // Public method: withdraw money from the account
  public withdraw(amount: number): void {
    if (amount <= 0) {
      console.log('Withdrawal amount must be greater than zero.');
    } else if (amount > this.balance) {
      console.log('Insufficient balance.');
    } else {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance is $${this.balance}.`);
    }
  }
}

const account = new BankAccount("John Doe", 1000);
account.balance = 5000;  // No restriction: balance can be changed directly
account.accountHolder = "Jane Smith";  // No restriction: accountHolder can be changed directly
console.log(`Balance: $${account.balance}`);
```

## Solution

1. Private Property (balance):

    - The balance is marked as private, meaning it cannot be accessed or modified directly outside the BankAccount class. This ensures that no external code can directly change the balance, which helps prevent accidental or malicious modifications.

2. Protected Property (accountHolder):

    - The accountHolder property is marked as protected, which means it can be accessed within the class and by subclasses. In this example, the PremiumBankAccount subclass can access accountHolder and use it, but external code cannot.

3. Public Methods (deposit, withdraw, getBalance):

    - The `deposit` and `withdraw` methods are public, allowing other code to interact with the `BankAccount` object in a controlled way. They include validation to ensure that deposits and withdrawals are valid.
    - The `getBalance` method is public and provides a read-only way to access the balance.

4. Protected Method (displayAccountInfo):

    - The `displayAccountInfo` method is marked as `protected`, meaning it is only accessible within the class and by any subclasses. In this example, the `PremiumBankAccount` class can call the protected method from `BankAccount` to display account information.

5. Encapsulation with Inheritance:

    - The subclass `PremiumBankAccount` can access the `accountHolder` and `displayAccountInfo` due to the protected modifier, but external code cannot modify these properties directly. This demonstrates how encapsulation and inheritance can work together to provide controlled access to data.

```ts
class BankAccount {
  // Private property: balance should not be directly modified from outside
  private balance: number;

  // Protected property: `accountHolder` can be accessed by subclasses
  protected accountHolder: string;

  // Constructor to initialize the account details
  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  // Public method: deposit money into the account
  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log('Deposit amount must be greater than zero.');
    } else {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance is $${this.balance}.`);
    }
  }

  // Public method: withdraw money from the account
  public withdraw(amount: number): void {
    if (amount <= 0) {
      console.log('Withdrawal amount must be greater than zero.');
    } else if (amount > this.balance) {
      console.log('Insufficient balance.');
    } else {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance is $${this.balance}.`);
    }
  }

  // Getter for the balance (read-only access to balance)
  public getBalance(): number {
    return this.balance;
  }

  // Protected method: used internally in the class or subclasses to display account info
  protected displayAccountInfo(): void {
    console.log(`Account Holder: ${this.accountHolder}, Balance: $${this.balance}`);
  }
}

// Subclass to demonstrate usage of protected property
class PremiumBankAccount extends BankAccount {
  private membershipStatus: string;

  constructor(accountHolder: string, initialBalance: number, membershipStatus: string) {
    super(accountHolder, initialBalance);
    this.membershipStatus = membershipStatus;
  }

  // Public method: Display account info, which includes the protected property
  public displayPremiumAccountInfo(): void {
    this.displayAccountInfo(); // Accessing protected method of the parent class
    console.log(`Membership Status: ${this.membershipStatus}`);
  }
}

// Create an instance of BankAccount
const basicAccount = new BankAccount("John Doe", 1000);
basicAccount.deposit(500); // Depositing money into the account
basicAccount.withdraw(200); // Withdrawing money from the account
console.log(`Balance: $${basicAccount.getBalance()}`); // Access balance via getter

// Cannot directly access balance or accountHolder from outside the class
// console.log(basicAccount.balance);  // Error: 'balance' is private and only accessible within class 'BankAccount'
// console.log(basicAccount.accountHolder); // Error: 'accountHolder' is protected and accessible only within the class and subclasses

// Create an instance of PremiumBankAccount (a subclass)
const premiumAccount = new PremiumBankAccount("Jane Smith", 5000, "Gold");
premiumAccount.displayPremiumAccountInfo();  // Accessing inherited protected method from the parent class
```
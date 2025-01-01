# Singleton Pattern

The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it.

```ts
class Singleton {
  private static instance: Singleton;
  
  // Private constructor ensures no external instantiation
  private constructor() {}
  
  // Public method to access the instance
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public showMessage(): void {
    console.log("Singleton instance message!");
  }
}

// Usage
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

singleton1.showMessage();  // Output: Singleton instance message!

// Verify both instances are the same
console.log(singleton1 === singleton2);  // Output: true
```

Explanation:
- **Private Constructor:** The constructor is private, ensuring that the class cannot be instantiated from outside.
- **Static Instance:** The getInstance() method checks if an instance of the class already exists; if not, it creates a new one.
- **Global Access:** The single instance is accessed globally via getInstance().

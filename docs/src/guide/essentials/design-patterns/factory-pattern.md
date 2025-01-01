---
outline: deep
---

# Factory Pattern

The Factory Pattern is a creational design pattern that provides an interface for creating objects but allows subclasses to alter the type of objects that will be created. It is typically used to instantiate different types of objects in a more flexible way, without having to specify the exact class of the object that will be created.

## Example

### Problem

In this code, if you want to add a new animal type, such as a "bird", you need to modify the AnimalFactory class, specifically the createAnimal method. This modification breaks the OCP because you are altering existing code to accommodate new behavior.

```ts
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Cat {
  meow() {
    console.log('Meow!');
  }
}

class AnimalFactory {
  createAnimal(type: string): Dog | Cat {
    if (type === 'dog') {
      return new Dog();
    } else if (type === 'cat') {
      return new Cat();
    } else {
      throw new Error('Unknown animal type');
    }
  }
}

// Usage
const factory = new AnimalFactory();
const animal1 = factory.createAnimal('dog');
animal1.bark(); // Correct

const animal2 = factory.createAnimal('cat');
animal2.meow(); // Correct

// This violates the open/closed principle
const animal3 = factory.createAnimal('bird'); // Error: Unknown animal type
```

Issues with the above example:
- **Violation of Open/Closed Principle:** If you need to add a new animal, you would need to modify the AnimalFactory class. This makes the code difficult to extend and maintain.
- **Factory Logic in Concrete Class:** The logic for creating objects is directly inside the AnimalFactory class, which doesn't scale well when new types of animals need to be added.

### Solution

A correct implementation of the Factory Pattern would separate concerns better, use an abstract class or interface for the animal types, and allow for easy extension without modifying the factory.

```ts
// Define an abstract class for Animal
interface Animal {
  speak(): void;
}

// Concrete classes for specific animals
class Dog implements Animal {
  speak() {
    console.log('Woof!');
  }
}

class Cat implements Animal {
  speak() {
    console.log('Meow!');
  }
}

// Abstract factory class (optional, but helps in decoupling)
interface AnimalFactory {
  createAnimal(): Animal;
}

// Concrete factories
class DogFactory implements AnimalFactory {
  createAnimal(): Animal {
    return new Dog();
  }
}

class CatFactory implements AnimalFactory {
  createAnimal(): Animal {
    return new Cat();
  }
}

// Client code
const dogFactory = new DogFactory();
const dog = dogFactory.createAnimal();
dog.speak(); // Output: Woof!

const catFactory = new CatFactory();
const cat = catFactory.createAnimal();
cat.speak(); // Output: Meow!

// If we need to add more animals, we can create new factory classes
```

Advantages of the Correct Example:
- **Open/Closed Principle:** You can easily add new types of animals by simply creating new factories (BirdFactory, LionFactory, etc.) without modifying existing code.
- **Separation of Concerns:** The responsibility for object creation is separated into specific factories, and the AnimalFactory interface ensures a clear and extendable contract for creating animals.
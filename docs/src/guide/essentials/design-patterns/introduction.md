# Design Pattern

Design patterns can be broadly categorized into Creational, Structural, and Behavioral patterns. Each category serves a distinct purpose in software design, and understanding these categories helps developers select the most appropriate pattern based on the problem they are solving. Here's how the listed patterns can be categorized:

## 1. Creational Patterns

These patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. The goal is to create objects in a way that avoids specifying the exact class of object that will be created.

- [Singleton Pattern](/guide/essentials/design-patterns/singleton-pattern)
Ensures that a class has only one instance and provides a global point of access to it.

- [Factory Pattern](/guide/essentials/design-patterns/factory-pattern)
Provides an interface for creating instances of a class, with its subclasses deciding which class to instantiate.

- [Builder Pattern](/guide/essentials/design-patterns/builder-pattern)
Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

## 2. Structural Patterns

These patterns deal with object composition and help ensure that objects and classes are organized in a way that is easy to maintain and scale. The focus is on the relationships between objects and the composition of classes.

- [Adapter Pattern](/guide/essentials/design-patterns/adapter-pattern)
Converts one interface to another that a client expects, making incompatible interfaces compatible.

- [Decorator Pattern](/guide/essentials/design-patterns/decorator-pattern)
Adds behavior to an object dynamically, without affecting the behavior of other objects from the same class.

- [Proxy Pattern](/guide/essentials/design-patterns/proxy-pattern)
Provides a surrogate or placeholder for another object to control access to it (e.g., lazy initialization, caching).

## 3. Behavioral Patterns

These patterns are concerned with algorithms and the assignment of responsibilities between objects. They focus on how objects interact and communicate, emphasizing the interaction between the components.

- [Observer Pattern](/guide/essentials/design-patterns/observer-pattern)
Defines a one-to-many dependency where a change in one object triggers updates to all dependent objects (observers).

- [Strategy Pattern](/guide/essentials/design-patterns/strategy-pattern)
Defines a family of algorithms and allows clients to choose the appropriate algorithm at runtime.

- [Command Pattern](/guide/essentials/design-patterns/command-pattern)
Encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing, and undo functionality.


# Builder Pattern

The Builder Pattern is a design pattern used to construct a complex object step by step. It allows for the construction of an object to be independent of the parts that make it up, making the code more readable and maintainable.

## Incorrect Example

In this example, the Builder Pattern is not properly implemented because:

- The director should control the construction process, but it's missing here.
- The builder and product objects are not clearly separated.
- The steps of construction should be modular, and the product should not be exposed prematurely.

```ts
// Incorrect Implementation

class Car {
  engine: string = '';
  wheels: number = 0;
  color: string = '';
}

class CarBuilder {
  car: Car;

  constructor() {
    this.car = new Car();
  }

  setEngine(engine: string) {
    this.car.engine = engine;
  }

  setWheels(wheels: number) {
    this.car.wheels = wheels;
  }

  setColor(color: string) {
    this.car.color = color;
  }

  build() {
    return this.car;
  }
}

// Client Code
const builder = new CarBuilder();
builder.setEngine('V8');
builder.setWheels(4);
builder.setColor('Red');
const car = builder.build();
console.log(car);
```

Issues with this approach:

- There's no "director" that oversees the construction process.
- The builder directly exposes the Car object before it is fully constructed (not modular).
- The builder steps can be mixed in an inconsistent order, which may not be desirable in certain contexts (e.g., building objects in a specific order).

## Correct Example

- Encapsulating the construction process and keeping it independent of the client.
- Modular steps to ensure proper construction of the product.
- A director class that orchestrates the construction.

```ts
// Correct Implementation

class Car {
  engine: string = '';
  wheels: number = 0;
  color: string = '';
  seats: number = 0;
}

class CarBuilder {
  private car: Car;

  constructor() {
    this.car = new Car();
  }

  setEngine(engine: string) {
    this.car.engine = engine;
    return this; // Fluent interface
  }

  setWheels(wheels: number) {
    this.car.wheels = wheels;
    return this; // Fluent interface
  }

  setColor(color: string) {
    this.car.color = color;
    return this; // Fluent interface
  }

  setSeats(seats: number) {
    this.car.seats = seats;
    return this; // Fluent interface
  }

  build(): Car {
    return this.car;
  }
}

class CarDirector {
  private builder: CarBuilder;

  constructor(builder: CarBuilder) {
    this.builder = builder;
  }

  constructSportsCar() {
    this.builder.setEngine('V8').setWheels(4).setColor('Red').setSeats(2);
  }

  constructFamilyCar() {
    this.builder.setEngine('V6').setWheels(4).setColor('Blue').setSeats(5);
  }
}

// Client Code

const carBuilder = new CarBuilder();
const director = new CarDirector(carBuilder);

// Building a Sports Car
director.constructSportsCar();
const sportsCar = carBuilder.build();
console.log('Sports Car:', sportsCar);

// Building a Family Car
director.constructFamilyCar();
const familyCar = carBuilder.build();
console.log('Family Car:', familyCar);
```

- **Fluent Interface:** Methods like setEngine, setWheels, etc., return the builder instance itself, allowing for method chaining.
- **Director Class:** The CarDirector class is responsible for constructing the car in a specific order. This decouples the construction logic from the client code.
- **Separation of Concerns:** The builder class only constructs the Car object, and the director coordinates the construction process, ensuring it's done correctly.
---
outline: deep
---

# Builder Pattern

The Builder pattern allows the creation of a complex object step by step, separating the construction process from the actual object.

## Example

:::: code-group
```ts [car.ts]
class Car {
  private engine: string = '';
  private wheels: number = 0;
  private color: string = '';
  private seats: number = 0;

  setEngine(engine: string): void {
    this.engine = engine;
  }

  setWheels(wheels: number): void {
    this.wheels = wheels;
  }

  setColor(color: string): void {
    this.color = color;
  }

  setSeats(seats: number): void {
    this.seats = seats;
  }

  showDetails(): void {
    console.log(`Car Details: Engine = ${this.engine}, Wheels = ${this.wheels}, Color = ${this.color}, Seats = ${this.seats}`);
  }
}
```
```ts [car-builder.ts]
class CarBuilder {
  private car: Car = new Car();

  setEngine(engine: string): CarBuilder {
    this.car.setEngine(engine);
    return this;
  }

  setWheels(wheels: number): CarBuilder {
    this.car.setWheels(wheels);
    return this;
  }

  setColor(color: string): CarBuilder {
    this.car.setColor(color);
    return this;
  }

  setSeats(seats: number): CarBuilder {
    this.car.setSeats(seats);
    return this;
  }

  build(): Car {
    return this.car;
  }
}

```
```ts [client.ts]
const car = new CarBuilder()
  .setEngine("V8")
  .setWheels(4)
  .setColor("Red")
  .setSeats(5)
  .build();

car.showDetails();  // Output: Car Details: Engine = V8, Wheels = 4, Color = Red, Seats = 5
```
::::

Explanation: 

- **Car:** The complex object that needs to be built.
- **CarBuilder:** A builder class that provides methods for setting the properties of the car. It returns this for method chaining, making the construction process more readable.
- **Client:** The client code uses the builder to set specific properties of the Car and then calls build() to get the constructed object.
---
outline: deep
---

# Adapter Pattern

The Adapter Pattern allows incompatible interfaces to work together. It acts as a bridge between two interfaces.

## Example

### Problem

The `VehicleController` expects to control objects that implement a `move()` method. The `Car` already has a `move()` method, but the `Drone` has a `fly()` method, which isn't directly compatible. We'll create an adapter to make the Drone's `fly()` method compatible with the Vehicle's `move()` method.

### Solution

Key Concepts:

- **Client:** The `VehicleController` that controls both the `Car` and `Drone`.
- **Target Interface:** The interface that the `VehicleController` expects to interact with, which will be something like `Vehicle` that can `move()`.
- **Adapter:** The class that adapts a Drone's `fly()` method to the `move()` method that the VehicleController can call.
- **Adaptee:** The Drone that has the `fly()` method, but is not directly compatible with the `move()` method.

**1. Target Interface (Vehicle):**

The interface that the `VehicleController` expects all vehicles to implement.

```ts
// The Target interface
interface Vehicle {
  move(): void;
}
```

**2. Adaptee (Drone):**

The Drone class has a `fly()` method, which is not compatible with the `move()` method expected by the `VehicleController`.

```ts
// The Drone class with the `fly` method
class Drone {
  fly(): void {
    console.log("The drone is flying in the sky.");
  }
}
```

**3. Adapter (DroneAdapter):**

The `DroneAdapter` will adapt the `fly()` method of the `Drone` to the `move()` method that the `VehicleController` can use.

```ts
// The Adapter class that adapts the Drone to the Vehicle interface
class DroneAdapter implements Vehicle {
  private drone: Drone;

  constructor(drone: Drone) {
    this.drone = drone;
  }

  // Adapt the `move()` method to call `fly()` on the Drone
  move(): void {
    this.drone.fly();
  }
}
```

**4. Another Adaptee (Car):**

The `Car` class already implements the `move()` method as required by the `Vehicle` interface.

```ts
// The Car class implements the Vehicle interface
class Car implements Vehicle {
  move(): void {
    console.log("The car is driving on the road.");
  }
}
```

**5. Client (VehicleController):**

The `VehicleController` expects to control any `Vehicle` that implements the `move()` method.

```ts
// The VehicleController class that controls the Vehicle interface
class VehicleController {
  control(vehicle: Vehicle): void {
    console.log("Controlling the vehicle:");
    vehicle.move();
  }
}
```

**Usage**

Now, let’s create both a `Car` and a `Drone`, adapt the `Drone` using the `DroneAdapter`, and control both with the `VehicleController`.

```ts
// Main function to run the example
function main() {
  // Create a car and a drone
  const car: Vehicle = new Car();
  const drone: Vehicle = new DroneAdapter(new Drone()); // Adapter makes Drone compatible

  // Create the VehicleController to control both vehicles
  const controller = new VehicleController();

  // Control the car (directly implements `move()`)
  controller.control(car);

  // Control the drone (adapted through the DroneAdapter)
  controller.control(drone);
}

// Run the main function
main();
```

**Output**

```ts
Controlling the vehicle:
The car is driving on the road.
Controlling the vehicle:
The drone is flying in the sky.
```
---
outline: deep
---

# Magic Number

In programming, a magic number refers to a hardcoded value that appears directly in the code, without any explanation of its meaning. These values are often seen as a bad practice because they reduce code readability and maintainability. Instead of using magic numbers, it’s better to define constants or enums to give meaning to the values.

## Example

### Problem

```ts
function calculateCircleArea(radius: number): number {
  return 3.14159 * radius * radius;  // Magic number: 3.14159
}

function calculateDiscount(price: number): number {
  if (price > 1000) {
    return price * 0.2;  // Magic number: 0.2
  }
  return 0;
}
```

In this case:

- The value `3.14159` is a magic number for π (Pi), which can be hard to understand without context.
- The value `0.2` represents a 20% discount, which is not immediately clear from just looking at the code.

### Solution

Instead of using magic numbers, you can define constants to improve readability and maintainability:

```ts
const PI = 3.14159;
const DISCOUNT_THRESHOLD = 1000;
const DISCOUNT_RATE = 0.2;

function calculateCircleArea(radius: number): number {
  return PI * radius * radius;  // No magic number, use the constant PI
}

function calculateDiscount(price: number): number {
  if (price > DISCOUNT_THRESHOLD) {
    return price * DISCOUNT_RATE;  // No magic number, use constants
  }
  return 0;
}
```

- **Readability:** It's immediately clear what the constant represents (e.g., PI is the mathematical constant for π, DISCOUNT_RATE is the discount percentage).
- **Maintainability:** If the value of PI or DISCOUNT_RATE needs to change, you only need to update it in one place rather than hunting through the code to find all instances of the magic number.
- **Avoids Errors:** It's easier to avoid mistakes by referring to constants rather than reusing magic numbers in multiple places.

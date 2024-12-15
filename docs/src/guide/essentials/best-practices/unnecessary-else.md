# Unnecessary else

The else statement is commonly used to provide an alternative block of code when an if condition evaluates to false. However, avoiding the use of else can sometimes make code cleaner, more readable, and even more efficient. This can be especially helpful in cases where the logic is simple and can be expressed using early returns or guard clauses.

## Example 1: Simple Conditional Logic

### Incorrect Example

```ts
function getNumberSign(num: number): string {
  if (num > 0) {
    return "Positive";
  } else {
    if (num < 0) {
      return "Negative";
    } else {
      return "Zero";
    }
  }
}
```

In the above example, we use nested else blocks, which is unnecessary and leads to increased indentation and complexity.

Correct Example (avoiding else):

### Correct Example

In this corrected example, we return early for each condition, avoiding the need for any else statements. This makes the code simpler and easier to follow.

```ts
function getNumberSign(num: number): string {
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero";
}
```

## Example 1: Simple Conditional Logic

### Incorrect Example

```ts
function processOrder(order: Order): string {
  if (order.status === "pending") {
    // Process pending order
    return "Order is pending";
  } else {
    if (order.status === "shipped") {
      // Process shipped order
      return "Order has been shipped";
    } else {
      return "Unknown order status";
    }
  }
}
```

### Correct Example

```ts
function processOrder(order: Order): string {
  if (order.status === "pending") return "Order is pending";
  if (order.status === "shipped") return "Order has been shipped";
  return "Unknown order status";
}
```
## Example 1: Simple Conditional Logic

### Incorrect Example

```ts
function checkEligibility(age: number, hasPermission: boolean): string {
  if (age >= 18) {
    if (hasPermission) {
      return "Eligible";
    } else {
      return "Permission required";
    }
  } else {
    return "Underage";
  }
}
```

### Correct Example

```ts
function checkEligibility(age: number, hasPermission: boolean): string {
  if (age < 18) return "Underage";
  if (!hasPermission) return "Permission required";
  return "Eligible";
}

```

## Example 4: Using a Ternary Operator (for Simple Conditions)

### Incorrect Example

```ts
function getDiscount(isMember: boolean): number {
  if (isMember) {
    return 20;
  } else {
    return 5;
  }
}
```

### Correct Example

```ts
function getDiscount(isMember: boolean): number {
  return isMember ? 20 : 5;
}
```
# Deep Nesting

When dealing with nested if-else statements, it’s important to aim for readability, maintainability, and clarity. While nested conditionals are sometimes necessary, excessive nesting can make your code hard to follow and debug. 

## Example 1: Simple Conditional Logic

### Problem

In the example, we use nested else blocks, which is unnecessary and leads to increased indentation and complexity.

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

### Solution

Instead of deeply nesting conditionals, use early returns to handle edge cases and reduce nesting. This makes the code simpler and easier to follow.

```ts
function getNumberSign(num: number): string {
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero";
}
```

## Example 2: Using a Ternary Operator

### Problem

Without using the ternary operator, you'd need to write out full if-else statements, which can make the code unnecessarily longer, especially for simple conditional assignments.

```ts
function getDiscount(isMember: boolean): number {
  if (isMember) {
    return 20;
  } else {
    return 5;
  }
}
```

### Solution


A ternary operator is a concise way to perform conditional operations in many programming languages. It’s typically used as a shorthand for an if-else statement.

```ts
function getDiscount(isMember: boolean): number {
  return isMember ? 20 : 5;
}
```



## Example 3: Complex Conditional Logic

### Problem

In the example, we use nested if-else blocks, which is unnecessary and leads to increased indentation and complexity.

```ts
function getNumberSign(num: number): string {
  if (num > 0) {
    if (num % 2 === 0) {
        return "Positive even number";
    } else {
        return "Positive odd number";
    }
} else if (num < 0) {
    if (num % 2 === 0) {
        return "Negative even number";
    } else {
        return "Negative odd number";
    }
} else {
    return "Zero";
}
```

### Solution

In this example, we return early for a condition and use a ternary operator to determine if the number is positive or negative. This makes the code simpler and easier to follow.

```ts
function getNumberSign(num: number): string {
  if (num === 0) return "Zero";
  
  const sign = num > 0 ? "Positive" : "Negative";
  const parity = num % 2 === 0 ? "even" : "odd";
  
  return `${sign} ${parity} number`;
}
```
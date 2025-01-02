# Unnecessary else

The else statement is commonly used to provide an alternative block of code when an if condition evaluates to false. However, avoiding the use of else can sometimes make code cleaner, more readable, and even more efficient. This can be especially helpful in cases where the logic is simple and can be expressed using early returns or guard clauses.

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

In this example, we return early for each condition, avoiding the need for any else statements. This makes the code simpler and easier to follow.

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
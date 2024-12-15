---
outline: deep
---

# Naming Convention

Naming conventions in code are crucial for readability and maintainability. Here are some common conventions across various programming languages:

1. Camel Case

    - **Usage:** Common in languages like Java and Javascript.
    - **Example:** `myVariableName`, `calculateTotalAmount`

2. Snake Case
  
    - **Usage:** Frequently used in Python and some database naming.
    - **Example:** `my_variable_name`, `calculate_total_amount`

3. Pascal Case
  
    - **Usage:** Often used for class names in languages like C# and Java.
    - **Example:** `MyClassName`, `CalculateTotalAmount`

4. Kebab Case
  
    - **Usage:** Common in URLs and sometimes in CSS class names.
    - **Example:** `my-variable-name`, `calculate-total-amount`

5. Uppercase
  
    - **Usage:** Typically for constants.
    - **Example:** `MAX_VALUE`, `DEFAULT_TIMEOUT`

6. Lowercase
  
    - **Usage:** Typically for variables.
    - **Example:** `items`, `sum`


## Javascript Code

### Background

In Javascript, both `camelCase` and `snake_case` are commonly used for naming variables and functions, but they serve different conventions and preferences. Here’s a comparison of the two:

**Camel Case**

In camelCase, the first word is lowercase, and each subsequent word starts with an uppercase letter.

```js
let firstName = "Alice";
function calculateTotalPrice() { /*...*/ }
```

**Pros:**

- **Widely Accepted:** camelCase is the standard convention in Javascript, especially for variable and function names.
- **Cleaner Look:** It can make names look more elegant and easier to read in many cases.
- **Consistency with Built-in Objects:** Most Javascript built-in objects and methods use camelCase (e.g., `getElementById`, `setTimeout`).

**Cons:**

- **Readability:** Some people find it harder to read for longer names compared to snake_case.

**Snake Case**

In snake_case, all letters are lowercase, and words are separated by underscores.

```js
let first_name = "Alice";
function calculate_total_price() { /*...*/ }
```

**Pros:**

- **Readability:** Many find snake_case more readable, especially with longer names.
- **Common in Other Languages:** If you come from a background in languages like Python or Ruby, you might prefer snake_case.

**Cons:**

- **Less Common in Javascript:** It’s not the standard convention in Javascript, which can lead to inconsistency if mixed with camelCase.
- **Longer Names:** It can make variable names longer, which some might find cumbersome.

### Conclusion

In Javascript, camelCase is the preferred convention for variables and functions. While snake_case has its merits, especially in other programming environments, sticking to camelCase in Javascript helps maintain consistency and readability within your code.

- **Stick to camelCase:** For Javascript variables, functions, and object properties, it's best to use camelCase to align with community standards.
- **Use snake_case in Specific Contexts:** If you’re working with APIs or data formats that use snake_case (like JSON responses), it’s fine to use snake_case for those specific cases, but convert them to camelCase when using them in your Javascript code for consistency.

```js
let user_data = {
  first_name: "Alice",
  last_name: "Smith"
};

// Convert to camelCase
let user = {
  firstName: user_data.first_name,
  lastName: user_data.last_name
};
```

## Folder and Files

### Background

Both kebab case and snake case are popular naming conventions for folders and files, because it has the advantage of good readability. But kebab-case has more advantages because typing hyphens is usually simpler and doesn’t require the shift key.

### Conclusion

Naming conventions for folders and files are essential for organization and ease of navigation. Here are some guidelines you can follow:

- **Use Lowercase:** Using all lowercase letters can help avoid issues on case-sensitive file systems.
- **Use Kebab Case:** Use `knake-case` for multiple words for readability.
  - **Example:** `project-files`
- **Avoid Special Characters:** Stick to letters, numbers, and dashes. Avoid spaces and special characters to ensure compatibility across systems.
  - **Bad:** `my-file-@-2024`
  - **Good:** `my-file-2024`
- **Date Formatting:** If including dates, use a consistent format (e.g., YYYY-MM-DD).
  - **Example:** `2024-09-26-inventory-report`

## Database

### Background

When working with MongoDB, following a consistent naming convention for databases, collections, and fields is crucial for clarity and maintainability.

**Notes:**
- **Naming Restrictions:** https://www.mongodb.com/docs/manual/reference/limits/#naming-restrictions

### Conclusion

**General Guidelines**

- **Use Descriptive Names:** Choose clear and descriptive names that convey the purpose of the field. For example, use `created_at` instead of just `date`.
- **Use Lowercase:** Generally, use lowercase letters for names. MongoDB is case-sensitive, and lowercase can help avoid confusion.
- **Use Snake Case:** Use `snake_case` for multiple words for readability.
- **Avoid Spaces and Special Characters:** Use underscores (_) to separate words instead of spaces or special characters. For example, use `order_items` instead of `order items`.

**For Database Name**
- **Singular:** Singular names often represent a single entity or model, making it clear that the collection contains instances of that model.
- **Add db suffix:** Append `db` on the end of the name. (eg: `human_resource_db`)

**For Collection Name**
- **Plural:** Plural names make it clear that the collection holds multiple documents, which aligns with common naming practices in many frameworks and libraries. (eg: `inventories`, `item_groups`, `items`)

**For Field Name**
- **Use Descriptive Names:** Choose clear and descriptive names that convey the purpose of the field. For example, use `created_at` instead of just `date`.
- **Prefix for Types:** If applicable, prefix field names to indicate their type, like `is_active` for booleans or `total_count` for numbers.
  


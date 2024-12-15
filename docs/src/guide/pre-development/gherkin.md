# Gherkin

Gherkin is a language used for writing behavioral specifications in Behavior-Driven Development (BDD), and it's designed to be simple and readable by both technical and non-technical stakeholders. It's used to describe the behavior of a system in a structured way, often in the form of Given-When-Then scenarios.

Here’s a breakdown of how to write Gherkin correctly:

Basic Structure
A Gherkin feature file is typically structured in the following way:

1. Feature – A high-level description of the functionality or feature being described.
2. Scenario – A specific example or use case for the feature.
3. Given – Describes the initial context or state.
4. When – Describes the action or event that takes place.
5. Then – Describes the expected outcome or result of the action.

You can also use additional keywords like And, But, and Examples to add more detail and control.

```gherkin
Feature: User login

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username and password
    Then the user should be redirected to the dashboard
    And the user should see a welcome message
```

## Writing Guidelines

1. Be clear and concise: Gherkin is meant to be readable and understandable by all stakeholders (both technical and non-technical). Write in plain language.

2. Use keywords correctly:

- **Feature:** Describes what the feature does.
- **Scenario:** Describes a specific situation or behavior of the feature.
- **Given:** Describes the initial state before an action occurs.
- **When:** Describes the action or event that triggers the behavior.
- **Then:** Describes the expected outcome or result of the action.
- **And / But:** Used to combine multiple conditions or outcomes for better readability.

3. Be specific but not too detailed: Focus on the high-level business logic and expected behavior. Avoid implementation details.

4. Use indentation and spacing: Keep the scenarios visually organized by maintaining consistent indentation.

5. Maintain consistency: Always structure scenarios in the same way for readability. Stick to Given-When-Then order for each scenario.

6. Use Examples for data-driven tests: If you need to run the same scenario with different sets of data, use the Scenario Outline keyword.


```gherkin
Feature: User login with various credentials

  Scenario Outline: User login with different credentials
    Given the user is on the login page
    When the user enters the username "<username>" and password "<password>"
    Then the user should see the message "<message>"

    Examples:
      | username   | password   | message              |
      | user1      | pass123    | Welcome, user1!      |
      | user2      | wrongpass  | Invalid credentials  |
      | admin      | adminpass  | Welcome, admin!      |

```

6. Use Background for shared steps: If certain steps are common across multiple scenarios, use a Background section to define them.

```gherkin
Feature: User management

  Background: 
    Given the user is logged in as an admin

  Scenario: Creating a new user
    When the admin creates a new user
    Then the new user should appear in the user list
```

## CRUD Operations

When writing Gherkin scenarios for complex CRUD (Create, Read, Update, Delete) operations, it’s important to focus on clarity, reusability, and covering edge cases. CRUD scenarios can get quite complex, especially when multiple entities are involved, validations need to be tested, and the system's state can change in subtle ways.

Here are some tips and examples for writing effective Gherkin scenarios for complex CRUD functionality:

### 1. Focus on the High-Level Behavior, Not Implementation

In Gherkin, the goal is to describe the system's behavior from a user perspective, not the technical details. Avoid describing how CRUD operations are implemented (e.g., database queries or API calls). Instead, focus on the expected behavior and outcomes.

Good Example

```gherkin
Scenario: Create a new user with valid information
  Given the user is on the "Create User" page
  When the user enters valid details and clicks "Create"
  Then a new user should be created with the provided details
  And the user should be redirected to the user details page
```

Bad Example (Too technical):

```gherkin
Scenario: Create a new user with valid information
  Given the user is on the "Create User" page
  When the user submits a POST request with a name, email, and password
  Then the user should be saved in the database with a status of 200 OK
```

### 2. Organize Complex Scenarios Using Background.

If your CRUD operations share common setup steps, such as logging in or navigating to a certain page, use a Background section to reduce repetition.

```gherkin
Feature: User Management

  Background:
    Given the user is logged in as an admin

  Scenario: Create a new user
    Given the user is on the "Create User" page
    When the user enters valid user details
    Then the new user should be created

  Scenario: Update an existing user
    Given the user is on the "Edit User" page for user "John Doe"
    When the user updates the user details
    Then the user details should be updated successfully
```

### 3. Use Scenario Outlines for Data-Driven Tests.

For CRUD operations, it’s common to test multiple sets of data (e.g., creating users with different roles, updating users with various input values, etc.). Use Scenario Outline and Examples to test with different data inputs.


```gherkin
Feature: User Management

  Scenario Outline: Create a new user with different roles
    Given the user is on the "Create User" page
    When the user enters "<name>" and "<email>" and selects "<role>"
    Then the user should be created with the role "<role>"

  Examples:
    | name       | email              | role     |
    | John Doe   | john@example.com    | Admin    |
    | Jane Smith | jane@example.com    | Manager  |
    | Bob White  | bob@example.com     | User     |
```

### 4. Ensure You Test Validations (Edge Cases). 

CRUD operations often involve validations (e.g., form validation, database constraints). Ensure you write scenarios for invalid input and edge cases (e.g., required fields, duplicate entries, etc.).

```gherkin
Scenario: Attempt to create a user with an invalid email address
  Given the user is on the "Create User" page
  When the user enters "invalid-email" in the email field
  Then the user should see an error message "Invalid email address"

Scenario: Attempt to update a user with duplicate username
  Given the user is on the "Edit User" page for user "Jane Smith"
  When the user updates the username to "JohnDoe" (already taken)
  Then the user should see an error message "Username already exists"
```

### 5. Check State Changes After Each Operation 

For complex CRUD scenarios, ensure the state of the system is validated after each operation. This could include checking database changes, page redirects, or UI updates.

```gherkin
Scenario: Successfully creating a new user updates the user list
  Given the user is on the "Create User" page
  When the user enters valid details and clicks "Create"
  Then the user should be redirected to the user list page
  And the new user should appear in the user list with their details

Scenario: Deleting a user removes them from the user list
  Given the user is on the "User List" page
  When the user clicks the "Delete" button for "John Doe"
  Then the user should be removed from the list
  And the user should no longer appear in the user list
```

### 6. Test Edge Cases and Permission Scenarios. 

For applications with multiple user roles (e.g., admin, user), make sure to test permission-based CRUD operations. For example, ensure that non-admin users cannot perform certain actions.

```gherkin
Scenario: Non-admin user cannot create a new user
  Given the user is logged in as a "User"
  When the user navigates to the "Create User" page
  Then the user should see a "403 Forbidden" error
  And the user should not be able to submit the form

Scenario: Admin can delete any user
  Given the user is logged in as an "Admin"
  When the admin deletes a user "John Doe"
  Then the user "John Doe" should be removed from the system
```

### 7. Testing for Dependencies Between Entities

In more complex systems, the CRUD operations on one entity might impact others (e.g., creating a project might also involve creating tasks). Ensure you test such dependencies properly.

```gherkin
Scenario: Create a project and its tasks
  Given the user is on the "Create Project" page
  When the user enters project details and clicks "Create"
  Then the project should be created successfully
  And the user should be redirected to the project details page
  And the project should contain the following default tasks:
    | Task Name        | Assignee  |
    | Design Prototype | Alice    |
    | Write Documentation | Bob     |

Scenario: Delete a project removes associated tasks
  Given the user is on the "Project Details" page for "Project A"
  When the user clicks "Delete Project"
  Then the project "Project A" should be removed
  And all associated tasks should also be deleted
```

### 8. Incorporate Background Data (if applicable)

When your CRUD operations depend on specific data being pre-existing in the system, use Background steps to set up that context.

```gherkin
Feature: Managing user roles

  Background:
    Given the user "John Doe" already exists with the role "Admin"
    And the user "Jane Smith" already exists with the role "User"

  Scenario: Admin changes the role of a user
    Given the admin is on the "User Management" page
    When the admin changes "Jane Smith"'s role to "Manager"
    Then the user "Jane Smith" should have the role "Manager"

```

### 9. Use Descriptive Step Names for Clarity

When writing Gherkin for complex CRUD operations, try to be as descriptive as possible with step names to make the steps self-explanatory. This makes it easier for both developers and non-developers to understand.

```gherkin
Scenario: Edit an existing user's profile
  Given the admin is on the "Edit User" page for "John Doe"
  When the admin updates the user's email address to "newemail@example.com"
  Then the user's profile should be updated with the new email address
  And the user should see a success message "Profile updated successfully"

```

### 10. Ensure You Test Rollback Scenarios for Inconsistent Data

In some applications, a failure in one step of a CRUD operation may leave the system in an inconsistent state. Consider writing scenarios for rollback actions or ensuring that partial data updates do not occur.

```gherkin
Scenario: Creating a user with missing required fields should not leave partial data
  Given the user is on the "Create User" page
  When the user submits a form with missing fields (e.g., no email)
  Then the user should see an error message "Email is required"
  And no user should be created in the system
```

### Conclusion

Writing Gherkin scenarios for complex CRUD operations requires attention to detail and clear description of both the user actions and system responses. Use the tips above to ensure that your Gherkin feature files are easy to read, maintain, and comprehensive enough to cover the entire range of functionality for CRUD operations.

Organize scenarios with Background, Scenario Outline, and Examples.
Write edge cases for validation, permissions, and dependencies.
Keep step names descriptive and user-focused.
Test state changes and ensure the system remains consistent.
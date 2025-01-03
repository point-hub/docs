# Code Style

Code style refers to the conventions, standards, and best practices followed when writing code in a particular programming language or project. It ensures that code is readable, maintainable, and consistent, making it easier for teams to collaborate, debug, and enhance software over time. A well-defined code style can help reduce errors, improve performance, and make onboarding new team members easier.

## Code Formatting Tools

Automated tools can help maintain consistent code formatting and style across the entire codebase.

### How to achieve it

Use linters (e.g., [ESLint](https://eslint.org/)) and formatters (e.g., [Prettier](https://prettier.io/)) to enforce coding standards and automate formatting tasks.

### Visual Studio Code Extentions

Visual Studio Code (VS Code) extensions are typically installed using the `.vscode/extentions.json` file, which is part of the workspace configuration for a project. This file can be used to recommend extensions to other developers working on the same project.

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
  ]
}
```
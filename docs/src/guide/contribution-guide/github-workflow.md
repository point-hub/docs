# Github workflow

When developers use GitHub, they can interact with the repository in several ways, typically through push and pull requests. Here's an overview of each:

- **Push** is a direct update to the remote repository from the developer's local machine.
- **Pull Request** is a process for reviewing and merging code between branches with collaboration from other developers.

## Background

Sometimes developer doesn't understand why forking and pull requests are necessary instead of requesting push access to the repository, it’s important to explain the advantages and principles behind this process. 

Here’s a simplified explanation of why forking and pull requests are preferred over giving direct push access to a repository:

### 1. Preserving Code Quality & Avoiding Mistakes

- **Code Review Process:** When you fork a repository and submit a pull request (PR), the code goes through a review process. This gives others the opportunity to look at your changes, suggest improvements, or catch mistakes.
Without this process, changes would go directly into the main codebase, making it more likely for bugs, errors, or bad code to slip through unnoticed.

- **Protects the Main Branch:** The main branch (the production-ready code) should always be stable and functional. If developers had direct push access, they could accidentally push code that breaks the build, introduces bugs, or disrupts other developers' work. PRs allow others to review and test before the changes become part of the main branch.

### 2. Safety and Security

- **Control Over Changes:** With open-source or public repositories, allowing everyone to push directly could lead to malicious code or unintended mistakes being introduced. Forking and creating pull requests ensure that only trusted contributors can submit changes, while everyone else can suggest changes via PRs.

- **Avoiding Accidental Changes:** Even experienced developers can make mistakes. For example, they might push changes that break something elsewhere in the code, or forget to update documentation. Pull requests allow time for people to carefully review and discuss changes before merging them.

### 3. Clean History and Collaboration

- **Audit Trail:** Pull requests create a clear history of changes. Each pull request provides information about the changes made, why they were made, and who made them. This is useful for debugging, tracking issues, and understanding the evolution of the project.

- **Discussion and Feedback:** Pull requests foster communication. Developers can leave comments or suggestions, ask for clarifications, or propose alternatives. This leads to better collaboration and often results in better code because the team works together to improve it.

### 4. Stability of the Repository

- **Protecting the Master Branch:** In many projects, the main branch (like master or main) is the branch that reflects the production-ready state of the application. Allowing everyone to push directly to this branch can make it unstable and prone to breaking changes. Using pull requests ensures the main branch remains stable and production-ready.

- **Preventing Merge Conflicts:** If everyone pushes directly to the same branch, merge conflicts can arise, which can be hard to manage. Forking and PRs help reduce this risk because each contributor works in their own isolated space (fork and branch) and submits changes in a controlled way.

### 5. Maintainability and Scalability

- **Managing Large Teams or Contributors:** In larger projects, especially those with many contributors, having everyone push directly to the repository would be chaotic and difficult to manage. Pull requests provide an organized way to handle contributions, as changes are isolated until they are reviewed and approved.

- **Gradual Integration:** Pull requests allow changes to be integrated gradually, making it easier to track what’s changed, and when. If everyone pushed directly, it would be harder to ensure that the integration of features or fixes was done in a coherent and controlled way.

### 7. Ensuring Proper Testing and Quality Assurance

- **Automated Testing:** Before a PR is merged, automated tests (CI/CD pipelines) are often run to ensure that the changes don’t break the application or introduce bugs. If developers had direct push access, they might accidentally push code that skips testing or causes the tests to fail.

- **Quality Checks:** Pull requests can be tied to automated linting, formatting, and other checks that ensure code quality. Without PRs, these checks would be skipped or harder to implement consistently.

## Push

**What it is:** The push command is used when a developer wants to upload their local changes to a remote Git repository, such as one hosted on GitHub. It transfers commits from the local branch to the remote branch.

**When it's used:** Developers typically push their changes after committing them locally. This is a way of updating the remote repository with their new work.

**How it works:**

1. Create a branch locally: When starting to work on a feature, bug fix, or improvement, you create a new branch based on the main or master branch (or any branch you’re working from). This allows you to work in isolation and not interfere with the main codebase.

```bash
git checkout -b feature-xyz
```

2. Make changes to files in your branch (e.g., editing, adding, or deleting code).

3. Stage the changes using git add:

```bash
git add .
```

4. Commit your changes locally to the branch with a meaningful message:

```bash
git commit -m "Added feature XYZ"
```

5. Push the changes to GitHub:

```bash
git push origin feature-xyz
```

origin is the default name of the remote repository (GitHub in this case), and feature-xyz is the name of your branch.

## Pull Request (PR)

**What it is:** A pull request is a way to propose changes from one branch (often a feature or bug-fix branch) into another branch on GitHub. It allows other team members to review your code before it gets merged.

**When it's used:** Pull requests are generally used when developers want to collaborate, review each other’s code, or ensure that code is properly vetted before being integrated into the main codebase.

**How it works:**

1. A developer pushes their branch to the remote GitHub repository (similar to the push step above).
2. [Open a pull request on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request): 
    - Navigate to your repository on GitHub.
    - You'll see an option to open a PR when you push a branch. GitHub will display a prompt like: "Compare & pull request."
    - Select the base branch (usually main or master) and the compare branch (your feature branch, like feature-xyz).
3. Code review:
    - Team members will be notified about the PR.
    - They can review your code, suggest improvements, ask for changes, or approve it.
4. Once the code is reviewed and approved, it can be merged into the base branch.

# SOLID Principles

SOLID is an acronym for a set of five design principles aimed at making object-oriented software more understandable, flexible, and maintainable.

## Single Responsibility Principle (SRP): 

Each class should have only one reason to change, meaning it should only have one job or responsibility.

### Problem

In this case, the `EmployeeService` class is responsible for both employee data (name and salary) and saving data to a database. This violates SRP.

```ts
class EmployeeService {
  employees: { id: number, name: string, role: string }[] = [];

  // Responsibility 1: Handling Employee Data
  addEmployee(employee: { id: number, name: string, role: string }) {
    this.employees.push(employee);
  }

  // Responsibility 2: Generating Reports
  generateEmployeeReport() {
    return this.employees.map(emp => `${emp.name} - ${emp.role}`);
  }
}
```

### Solution

The `EmployeeService` class now only handles employee data, and a separate `ReportService` class is responsible for generating reports. This adheres to the SRP.

```ts 
class EmployeeService {
  employees: { id: number, name: string, role: string }[] = [];

  addEmployee(employee: { id: number, name: string, role: string }) {
    this.employees.push(employee);
  }

  getEmployees() {
    return this.employees;
  }
}

class ReportService {
  generateEmployeeReport(employees: { id: number, name: string, role: string }[]) {
    return employees.map(emp => `${emp.name} - ${emp.role}`);
  }
}
```

## Open/Closed Principle (OCP): 

Classes should be open for extension but closed for modification. This allows us to add new features without changing existing code.

### Problem

The following class requires modification when new employee roles are added. This violates the OCP, as the class is not open for extension but closed for modification.

```ts
class Employee {
  constructor(public id: number, public name: string, public role: string) {}

  getSalary() {
    if (this.role === 'Developer') {
      return 5000;
    } else if (this.role === 'Manager') {
      return 7000;
    } else {
      return 3000;  // Default salary for other roles
    }
  }
}
```

### Solution

The class can be extended by adding new role-based salary calculations without modifying the existing code. This follows the OCP.

```ts
abstract class Employee {
  constructor(public id: number, public name: string) {}

  abstract getSalary(): number;
}

class Developer extends Employee {
  getSalary() {
    return 5000;
  }
}

class Manager extends Employee {
  getSalary() {
    return 7000;
  }
}

class Designer extends Employee {
  getSalary() {
    return 4000;
  }
}
```

## Liskov Substitution Principle (LSP): 

Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

### Problem

In this example, `FullTimeEmployee` and `PartTimeEmployee` don't properly adhere to LSP. `PartTimeEmployee` is forced to return incorrect data (null salary) just because it's a subclass, breaking behavior expectations.

```ts
class Employee {
  constructor(public name: string, public role: string) {}
  getSalary() {
    return 3000;
  }
}

class FullTimeEmployee extends Employee {
  getSalary() {
    return 5000;  // Overridden salary for full-time employees
  }
}

class PartTimeEmployee extends Employee {
  getSalary() {
    return null;  // Invalid for part-time employees
  }
}
```

### Solution

The `PartTimeEmployee` class follows the LSP by properly implementing the getSalary() method, ensuring that all subclasses of `Employee` behave consistently.

```ts
class Employee {
  constructor(public name: string, public role: string) {}
  abstract getSalary(): number;
}

class FullTimeEmployee extends Employee {
  getSalary() {
    return 5000;
  }
}

class PartTimeEmployee extends Employee {
  getSalary() {
    return 2000;  // Correct salary for part-time employees
  }
}
```

## Interface Segregation Principle (ISP): 

Clients should not be forced to depend on interfaces they do not use.

### Problem

The following example forces `EmployeeService` to implement methods it doesn't need, violating the ISP.

```ts
interface EmployeeActions {
  addEmployee(employee: { id: number, name: string, role: string }): void;
  generateEmployeeReport(): string[];
  updateEmployeeDetails(employeeId: number, details: { name?: string, role?: string }): void;
}

class EmployeeService implements EmployeeActions {
  employees: { id: number, name: string, role: string }[] = [];

  addEmployee(employee: { id: number, name: string, role: string }) {
    this.employees.push(employee);
  }

  generateEmployeeReport() {
    return this.employees.map(emp => `${emp.name} - ${emp.role}`);
  }

  updateEmployeeDetails(employeeId: number, details: { name?: string, role?: string }) {
    const employee = this.employees.find(e => e.id === employeeId);
    if (employee) {
      Object.assign(employee, details);
    }
  }
}
```

### Solution

By splitting the `EmployeeActions` interface into smaller, more specific interfaces, we ensure that classes only implement methods they actually need.

```ts
interface EmployeeCreation {
  addEmployee(employee: { id: number, name: string, role: string }): void;
}

interface EmployeeReport {
  generateEmployeeReport(): string[];
}

interface EmployeeUpdate {
  updateEmployeeDetails(employeeId: number, details: { name?: string, role?: string }): void;
}

class EmployeeService implements EmployeeCreation, EmployeeReport {
  employees: { id: number, name: string, role: string }[] = [];

  addEmployee(employee: { id: number, name: string, role: string }) {
    this.employees.push(employee);
  }

  generateEmployeeReport() {
    return this.employees.map(emp => `${emp.name} - ${emp.role}`);
  }
}
```

## Dependency Inversion Principle (DIP): 

High-level modules should not depend on low-level modules. Both should depend on abstractions.

### Problem

The `EmployeeService` directly depends on the `Database` class. This is a violation of the DIP because higher-level modules (`EmployeeService`) should not depend on lower-level modules (`Database`).

```ts
class Database {
  save(data: string) {
    console.log('Data saved to database');
  }
}

class EmployeeService {
  private database = new Database(); // Direct dependency

  saveEmployeeData(employee: { id: number, name: string, role: string }) {
    this.database.save(JSON.stringify(employee));
  }
}
```

### Solution

The `EmployeeService` now depends on an abstraction (`DataStorage`) rather than a concrete class (`Database`), adhering to the DIP.

```ts
interface DataStorage {
  save(data: string): void;
}

class Database implements DataStorage {
  save(data: string) {
    console.log('Data saved to database');
  }
}

class FileStorage implements DataStorage {
  save(data: string) {
    console.log('Data saved to file');
  }
}

class EmployeeService {
  constructor(private dataStorage: DataStorage) {}

  saveEmployeeData(employee: { id: number, name: string, role: string }) {
    this.dataStorage.save(JSON.stringify(employee));
  }
}

// Usage
const database = new Database();
const employeeService = new EmployeeService(database);
employeeService.saveEmployeeData({ id: 1, name: 'Alice', role: 'Developer' });
```
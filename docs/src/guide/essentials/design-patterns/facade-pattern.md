# Facade Pattern

The Facade Pattern is a structural design pattern that provides a simplified interface to a complex subsystem. It acts as a wrapper that hides the complexities of a system and provides an easy-to-use interface to the client. The client interacts with the facade instead of dealing with various subsystem classes directly.

Let’s take a Human Resources (HR) Management System as an example. In a typical HR system, there are several subsystems responsible for various tasks such as:

- **EmployeeManagement:** Manages employee records, hiring, and terminations.
- **PayrollSystem:** Manages employee salaries, deductions, and bonuses.
- **LeaveManagement:** Tracks employee leave requests, approvals, and balances.
- **TrainingManagement:** Manages employee training sessions and records.

The Facade Pattern can be applied to simplify the interaction with these subsystems, providing a single interface for performing multiple HR-related tasks.

## Incorrect Example

The client interacts directly with each subsystem, making the code more complex and harder to maintain.

```ts
// Subsystem Classes (Same as above)
class EmployeeManagement {
  public hireEmployee(employeeId: string, employeeName: string): void {
    console.log(`Employee ${employeeName} (ID: ${employeeId}) hired.`);
  }

  public terminateEmployee(employeeId: string): void {
    console.log(`Employee with ID: ${employeeId} terminated.`);
  }
}

class PayrollSystem {
  public processPayroll(employeeId: string): void {
    console.log(`Processing payroll for Employee ID: ${employeeId}`);
  }

  public calculateBonus(employeeId: string): void {
    console.log(`Calculating bonus for Employee ID: ${employeeId}`);
  }
}

class LeaveManagement {
  public requestLeave(employeeId: string, days: number): void {
    console.log(`Leave request for Employee ID: ${employeeId} - ${days} days.`);
  }

  public approveLeave(employeeId: string, days: number): void {
    console.log(`Leave approved for Employee ID: ${employeeId} - ${days} days.`);
  }

  public rejectLeave(employeeId: string): void {
    console.log(`Leave rejected for Employee ID: ${employeeId}`);
  }
}

class TrainingManagement {
  public enroll(employeeId: string, training: string): void {
    console.log(`Employee ID: ${employeeId} enrolled in ${training} training.`);
  }

  public completeTraining(employeeId: string, training: string): void {
    console.log(`Employee ID: ${employeeId} completed ${training} training.`);
  }
}

// Client directly interacts with subsystems
const employeeManagement = new EmployeeManagement();
const payrollSystem = new PayrollSystem();
const leaveManagement = new LeaveManagement();
const trainingManagement = new TrainingManagement();

// Client manually performs all operations
const employeeId = "12345";
const employeeName = "John Doe";

employeeManagement.hireEmployee(employeeId, employeeName);  // Hire employee
payrollSystem.processPayroll(employeeId);                   // Process payroll
leaveManagement.requestLeave(employeeId, 5);                // Request leave
leaveManagement.approveLeave(employeeId, 5);                // Approve leave
trainingManagement.enroll(employeeId, "Leadership");        // Enroll in training
employeeManagement.terminateEmployee(employeeId);           // Terminate employee
```

## Correct Example

The facade will allow the HR department to perform common tasks like hiring an employee, processing payroll, and managing leave in a simple and unified manner.

```ts
// Subsystem Classes
class EmployeeManagement {
  public hireEmployee(employeeId: string, employeeName: string): void {
    console.log(`Employee ${employeeName} (ID: ${employeeId}) hired.`);
  }

  public terminateEmployee(employeeId: string): void {
    console.log(`Employee with ID: ${employeeId} terminated.`);
  }
}

class PayrollSystem {
  public processPayroll(employeeId: string): void {
    console.log(`Processing payroll for Employee ID: ${employeeId}`);
  }

  public calculateBonus(employeeId: string): void {
    console.log(`Calculating bonus for Employee ID: ${employeeId}`);
  }
}

class LeaveManagement {
  public requestLeave(employeeId: string, days: number): void {
    console.log(`Leave request for Employee ID: ${employeeId} - ${days} days.`);
  }

  public approveLeave(employeeId: string, days: number): void {
    console.log(`Leave approved for Employee ID: ${employeeId} - ${days} days.`);
  }

  public rejectLeave(employeeId: string): void {
    console.log(`Leave rejected for Employee ID: ${employeeId}`);
  }
}

class TrainingManagement {
  public enrollInTraining(employeeId: string, training: string): void {
    console.log(`Employee ID: ${employeeId} enrolled in ${training} training.`);
  }

  public completeTraining(employeeId: string, training: string): void {
    console.log(`Employee ID: ${employeeId} completed ${training} training.`);
  }
}

// Facade
class HRFacade {
  private employeeManagement: EmployeeManagement;
  private payrollSystem: PayrollSystem;
  private leaveManagement: LeaveManagement;
  private trainingManagement: TrainingManagement;

  constructor(
    employeeManagement: EmployeeManagement,
    payrollSystem: PayrollSystem,
    leaveManagement: LeaveManagement,
    trainingManagement: TrainingManagement
  ) {
    this.employeeManagement = employeeManagement;
    this.payrollSystem = payrollSystem;
    this.leaveManagement = leaveManagement;
    this.trainingManagement = trainingManagement;
  }

  // Method to hire a new employee and set up their initial payroll
  public hireNewEmployee(employeeId: string, employeeName: string): void {
    this.employeeManagement.hireEmployee(employeeId, employeeName);
    this.payrollSystem.processPayroll(employeeId);
    console.log(`New employee ${employeeName} hired and payroll processed.`);
  }

  // Method to handle leave requests for an employee
  public processLeaveRequest(employeeId: string, days: number): void {
    this.leaveManagement.requestLeave(employeeId, days);
    this.leaveManagement.approveLeave(employeeId, days);
  }

  // Method to enroll an employee in training
  public enrollEmployeeInTraining(employeeId: string, training: string): void {
    this.trainingManagement.enrollInTraining(employeeId, training);
  }

  // Method to process employee termination and handle related tasks
  public terminateEmployee(employeeId: string): void {
    this.leaveManagement.rejectLeave(employeeId); // Reject any pending leave requests
    this.employeeManagement.terminateEmployee(employeeId);
    console.log(`Employee ID: ${employeeId} terminated.`);
  }
}

// Client code
const employeeManagement = new EmployeeManagement();
const payrollSystem = new PayrollSystem();
const leaveManagement = new LeaveManagement();
const trainingManagement = new TrainingManagement();

const hrFacade = new HRFacade(employeeManagement, payrollSystem, leaveManagement, trainingManagement);

// Using the facade to perform complex tasks with a single call
hrFacade.hireNewEmployee("12345", "John Doe");         // Simplified hiring and payroll processing
hrFacade.processLeaveRequest("12345", 5);              // Handle leave request and approval
hrFacade.enrollEmployeeInTraining("12345", "Leadership"); // Enroll in training
hrFacade.terminateEmployee("12345");                   // Terminate employee and reject leave requests
```

Explanation:

1. Subsystem Classes:

    - **EmployeeManagement:** Manages employee records, including hiring and termination.
    - **PayrollSystem:** Handles payroll processing and bonus calculations.
    - **LeaveManagement:** Manages leave requests, approvals, and rejections.
    - **TrainingManagement:** Handles employee training enrollment and completion.

2. Facade Class (HRFacade):

    - The `HRFacade` provides simplified methods like `hireNewEmployee`, `processLeaveRequest`, `enrollEmployeeInTraining`, and `terminateEmployee`. These methods internally interact with the appropriate subsystems to complete a task.
    - This reduces the complexity for the client, who only needs to interact with the facade to perform common HR tasks.

3. Client Code:

    - The client interacts with the HRFacade to perform HR operations. For example, hiring an employee involves a single call to hireNewEmployee, which internally handles employee management, payroll processing, and other necessary tasks.
    - The client does not need to manage the complexity of interacting with multiple subsystems directly.

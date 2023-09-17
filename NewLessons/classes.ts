abstract class Department {
    // public is default
    // private
    // private readonly id: string;
    // private name: string;
    static happyYear = 2021;
    // private - only in this class vs protected is accusable from other class too
    protected employees: string[] = [];

    // readonly doesn't exist in JS
    constructor(protected readonly id: string, public name: string) {
        this.id = id;
        this.name = name;
    }
    // add "this" to catch unwanted behavior that way TS will help catch an error when you call a method
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
    printEmployee() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    static createEmployee(name: string) {
        return { name };
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        // super() connects to Department class and it requires the arguments from Department constructor
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log(`Acc Dep - id ${this.id}`);
    }
}

class AccountingDep extends Department {
    private lastReport: string;
    private static instance: AccountingDep;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Value is require!');
        }
        this.addReports(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDep('dnew1', []);
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    describe() {
        console.log(`Acc Dep - id ${this.id}`);
    }

    addReports(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

// const employeeMax = Department.createEmployee('Max');
// console.log(employeeMax, Department.happyYear);
// const accounting = new Department('accd1', 'Accounting');
// const webDev = new ITDepartment('accd2', ['Max']);
// webDev.addEmployee('Max');
// webDev.addEmployee('Seba');

// console.log(webDev);

// const acc = new AccountingDep('d2', []);
// const acc = AccountingDep.getInstance();
// console.log(acc.mostRecentReport);
// webDev.describe();
// acc.describe();
// acc.addReports('Something went wrong');
// acc.mostRecentReport = 'Raport o pracy';

// console.log(acc.mostRecentReport);
// acc.addEmployee('Max');
// acc.addEmployee('Karola');

// console.log(acc);
// accounting.addEmployee('Max');
// accounting.addEmployee('Seba');

// console.log(accounting);

// accounting.describe();

// const accountingCopy = { name: 'finance', describe: accounting.describe };

// accountingCopy.describe();

type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

interface EmployeeIN {
    name: string;
    startDate: Date;
}

interface AdminI {
    name: string;
    privileges: string[];
}

interface ElevatedEmployeeI extends EmployeeIN, Admin {}

// With union type
type Combinable = number | string;

type Numeric = number | boolean;

type Universal = Numeric & Combinable;

// ---
type UnknownEmployee = Employee | Admin;

const e1 = {
    name: 'Seba',
    privileges: ['praca zdalnie'],
};

// type guard
const logDetails = (emp: UnknownEmployee) => {
    console.log(emp.name);
    if ('startDate' in emp) {
        console.log(emp.startDate);
    }
    if ('privileges' in emp) {
        console.log(emp.privileges);
    }
};

logDetails(e1);

class Car {
    drive() {
        console.log('Driving');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck');
    }

    loadCargo(amount: number) {
        console.log(`Loading: ${amount} tons`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle: (vehicle: Vehicle) => void = (vehicle) => {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    }
    // does vehicle was created based on Truck
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};

useVehicle(v2);
useVehicle(v1);

// Discriminated Unions

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`${animal.type} moving at speed ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });
moveAnimal({ type: 'horse', runningSpeed: 30 });

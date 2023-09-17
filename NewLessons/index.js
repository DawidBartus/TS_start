"use strict";
const e1 = {
    name: 'Seba',
    privileges: ['praca zdalnie'],
};
const logDetails = (emp) => {
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
    loadCargo(amount) {
        console.log(`Loading: ${amount} tons`);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};
useVehicle(v2);
useVehicle(v1);
function moveAnimal(animal) {
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

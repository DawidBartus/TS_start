// // decorators
// function Logger(constructor: Function) {
//     console.log('Logging...');
//     console.log(constructor);
// }

// @Logger
// class PersonCreator {
//     name = 'Max';
//     constructor() {
//         console.log('Works');
//     }
// }

// const maxPerson = new PersonCreator();

// ---

// customize decorator

// function Logger2(logString: string) {
//     return function (constructor: Function) {
//         console.log(logString);
//         console.log(constructor);
//     };
// }

// @Logger2('Logging - person')
// class PersonCreator2 {
//     name = 'Max';
//     constructor() {
//         console.log('Works');
//     }
// }

// ---

// function Logger3(logString: string) {
//     return function (constructor: Function) {
//         console.log(logString);
//         console.log(constructor);
//     };
// }

// function WithTemplate(template: string, hookId: string) {
//     return function (constructor: any) {
//         console.log('rendering');
//         const p = new constructor();
//         const hookEl = document.getElementById(hookId);
//         if (hookEl) {
//             hookEl.textContent = `${template} ${p.name}`;
//         }
//     };
// }

// // bottom > up
// @Logger3('Person3 logger')
// @WithTemplate('My person object is', 'param')
// class PersonCreator3 {
//     name = 'Max';
//     constructor() {
//         console.log('Works');
//     }
// }

// ---

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
function Log2(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
) {
    console.log('___');
    console.log('Accessor decorator');
    console.log(target);
    console.log(propertyName);
    console.log(descriptor);
}

function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('___');
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('___');
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price');
        }
    }
    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }
    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

// ---

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // refer to an object defining on witch we defined a getter
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';
    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}
const p = new Printer();

const button = document.getElementById('button')!;
button.addEventListener('click', p.showMessage);

// Validation with decorators

// interface ValidatorConfig {
//     [property: string]: {
//         [validatableProp: string]: string[];
//     };
// }

// const registeredValidators: ValidatorConfig = {};

// function Required(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//         [propName]: ['required'],
//     };
// }
// function PositiveNum(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//         [propName]: ['required'],
//     };
// }

// function validate(obj: object) {

// }

// class Course {
//     @Required
//     title: string;
//     @PositiveNum
//     price: number;
//     constructor(t: string, p: number) {
//         this.price = p;
//         this.title = t;
//     }
// }

// const courseForm = document.getElementById('course')!;

// courseForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const titleEL = document.getElementById('title') as HTMLInputElement;
//     const priceEl = document.getElementById('price') as HTMLInputElement;
//     const title = titleEL.value;
//     const price = +priceEl.value;
//     const createdCourse = new Course(title, price);

//     if (!validate(createdCourse)) {
//         alert('Invalid input');
//         return;
//     }
//     console.log(createdCourse);
// });

// const names: Array<string> = ['Max', 'Seba'];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("It's done");
//     }, 2000);
// });

function merge<A extends object, B extends object>(objA: A, objB: B) {
    return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'Adam', hobbies: ['running'] }, { age: 27 });

console.log(mergeObj.age);
console.log(mergeObj.name);
console.log(mergeObj.hobbies);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'Got no value';
    if (element.length === 0) {
        description = `GOT one element`;
    } else {
        description = `"${element}" GOT ${element.length} elements`;
    }

    return [element, description];
}

console.log(countAndDescribe('Hi'));
console.log(countAndDescribe('100'));

function extractKey<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value ${obj[key]}`;
}
extractKey({ name: 'Max' }, 'name');

// generic class

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem('Max');
stringStorage.addItem('Maxim');
stringStorage.addItem('Maximus');
stringStorage.removeItem('Max');
console.log(stringStorage.getItem());

const numberStorage = new DataStorage<number | string>();
numberStorage.addItem(123);
numberStorage.addItem('123');

console.log(numberStorage.getItem());

const objectStorage = new DataStorage<object>();
const maxObj = { name: 'Max' };
objectStorage.addItem(maxObj);
objectStorage.addItem({ name: 'habanero', age: 23 });
objectStorage.removeItem(maxObj);

console.log(objectStorage.getItem());
console.log(1600 * 25);

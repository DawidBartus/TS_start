"use strict";
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Adam', hobbies: ['running'] }, { age: 27 });
console.log(mergeObj.age);
console.log(mergeObj.name);
console.log(mergeObj.hobbies);
function countAndDescribe(element) {
    let description = 'Got no value';
    if (element.length === 0) {
        description = `GOT one element`;
    }
    else {
        description = `"${element}" GOT ${element.length} elements`;
    }
    return [element, description];
}
console.log(countAndDescribe('Hi'));
console.log(countAndDescribe('100'));
function extractKey(obj, key) {
    return `Value ${obj[key]}`;
}
extractKey({ name: 'Max' }, 'name');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}
const stringStorage = new DataStorage();
stringStorage.addItem('Max');
stringStorage.addItem('Maxim');
stringStorage.addItem('Maximus');
stringStorage.removeItem('Max');
console.log(stringStorage.getItem());
const numberStorage = new DataStorage();
numberStorage.addItem(123);
numberStorage.addItem('123');
console.log(numberStorage.getItem());
const objectStorage = new DataStorage();
const maxObj = { name: 'Max' };
objectStorage.addItem(maxObj);
objectStorage.addItem({ name: 'habanero', age: 23 });
objectStorage.removeItem(maxObj);
console.log(objectStorage.getItem());
console.log(1600 * 25);

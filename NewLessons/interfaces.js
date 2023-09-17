"use strict";
let user1 = {
    name: 'Max',
    age: 24,
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    },
};
user1.greet('Hi');
let user2;
user2 = {
    name: 'Zotac',
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    },
};
user2.greet('Czesc');
class Person {
    constructor(n) {
        this.age = 30;
        this.name = n;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
}
let user3 = new Person('GTX');
user3.greet('Best ');
console.log(user3);
let add;
add = (n1, n2, n3) => {
    if (n3) {
        return n1 + n2 + n3;
    }
    else {
        return n1 + n2;
    }
};
let user4;
user4 = {
    age: 15,
};

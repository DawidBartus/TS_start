interface Person {
    name: string;
    age: number;
    greet(text: string): void;
}
// type Person = {
//     name: string;
//     age: number;
//     // hobbies: string[];
//     greet(text: string): void;
// }

// let user1: Person;

let user1: Person = {
    name: 'Max',
    age: 24,
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    },
};

user1.greet('Hi');

interface Name {
    readonly name: string;
}

interface SayHi extends Name {
    // readonly can be used both in interface and type
    greet(text: string): void;
    outPutName?: string;
}

let user2: SayHi;

user2 = {
    name: 'Zotac',
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    },
};
user2.greet('Czesc');

class Person implements SayHi {
    name: string;
    age = 30;
    constructor(n: string) {
        this.name = n;
    }
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

let user3 = new Person('GTX');

user3.greet('Best ');
console.log(user3);

interface AddFn {
    (a: number, b: number, c?: number): number;
}

let add: AddFn;

add = (n1, n2, n3?) => {
    if (n3) {
        return n1 + n2 + n3;
    } else {
        return n1 + n2;
    }
};

interface NameLess {
    // optional ?
    name?: string;
    age: number;
}

let user4: NameLess;

user4 = {
    // name: 'seba',
    age: 15,
};

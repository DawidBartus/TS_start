// const person: {
//     age: number;
//     name: string;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     age: 26,
//     name: 'David',
//     hobbies: ['coding', 'cooking', 'rollerblading'],
//     role: [2, 'developer'],
// };

// person.role.push('future');

// let favColors: string[];
// favColors = ['red'];

// for (const hobby of person.hobbies) {
//     console.log(hobby.toUpperCase());
// }
// person.role.push('future');

// person.role = [3, "admin", 5]

enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
}

const person = {
    age: 26,
    name: 'David',
    hobbies: ['coding', 'cooking', 'rollerblading'],
    role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
    console.log(`${person.name} is Admin`);
}

console.log(person);

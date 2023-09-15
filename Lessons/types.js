"use strict";
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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
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

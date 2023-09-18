"use strict";
var _a;
const paragraph = document.getElementById('param');
const userInput = document.getElementById('user_text');
userInput.value = 'Hi';
const errorBag = {
    email: 'Not a valid email',
    123: 'It will work',
};
function addNum(n, n2) {
    if (typeof n === 'string' || typeof n2 === 'string') {
        return n.toString() + n2.toString();
    }
    else {
        return n + n2;
    }
}
const result = addNum('Num', 2);
result.split(' ');
const fetchedUserData = {
    id: 'dasd1',
    name: 'Dave',
    job: { title: 'CEO', description: 'My own company' },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput2 = '';
const storedData = userInput2 !== null && userInput2 !== void 0 ? userInput2 : 'Default';
console.log(storedData);

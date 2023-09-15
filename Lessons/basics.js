"use strict";
const add = (num1, num2, showResult, phrase) => {
    if (showResult) {
        const result = num1 + num2;
        console.log(`${phrase} ${result}`);
    }
    return num1 + num2;
};
const number1 = 5;
const number2 = 2.3;
let printResultT = true;
const resultPhrase = 'Result is:';
console.log('output: ', add(number1, number2, printResultT, resultPhrase));

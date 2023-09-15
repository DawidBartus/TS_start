"use strict";
const addN = (n1, n2) => {
    return n1 + n2;
};
// console.log(addN(1, 12));
const printResult = (n1) => {
    console.log('Result:', n1);
};
const addAndHandle = (n1, n2, cb) => {
    const result = n1 + n2;
    cb(result);
};
addAndHandle(10, 20, printResult);
printResult(12);
console.log(printResult(addN(1, 12)));
let combineValues;
combineValues = addN;
// combineValues = printResult; // <- error
console.log(combineValues(13, 7));
console.log();

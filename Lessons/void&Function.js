"use strict";
const addNums = (n1, n2) => {
    return n1 + n2;
};
// console.log(addN(1, 12));
const printResults = (n1) => {
    console.log('Result:', n1);
};
printResults(12);
console.log(printResults(addNums(1, 12)));
let combineValuesS;
combineValuesS = addNums;
// combineValues = printResult; // <- error
console.log(combineValuesS(13, 7));

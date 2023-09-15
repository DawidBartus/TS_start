const addNums = (n1: number, n2: number): number => {
    return n1 + n2;
};

// console.log(addN(1, 12));

const printResults = (n1: number): void => {
    console.log('Result:', n1);
};
printResults(12);
console.log(printResults(addNums(1, 12)));

let combineValuesS: (a: number, b: number) => number;
combineValuesS = addNums;
// combineValues = printResult; // <- error

console.log(combineValuesS(13, 7));

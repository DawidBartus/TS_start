const addN = (n1: number, n2: number): number => {
    return n1 + n2;
};

// console.log(addN(1, 12));

const printResult = (n1: number): void => {
    console.log('Result:', n1);
};

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
    const result = n1 + n2;
    cb(result);
};
addAndHandle(10, 20, printResult);

printResult(12);

console.log(printResult(addN(1, 12)));

let combineValues: (a: number, b: number) => number;
combineValues = addN;
// combineValues = printResult; // <- error

console.log(combineValues(13, 7));

console.log();

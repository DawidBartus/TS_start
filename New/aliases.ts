// add number on concatenate strings

type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-string';

const combine = (
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDescriptor
) => {
    let result: Combinable;
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number'
    ) {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
};

const combineAges = combine(30, 56, 'as-number');
console.log(combineAges);

const combineStringAges = combine('30', '56', 'as-number');
console.log(combineStringAges);

const combineNames = combine('Olek', 'Annabelle', 'as-string');
console.log(combineNames);

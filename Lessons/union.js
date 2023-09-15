"use strict";
// add number on concatenate strings
const combine = (input1, input2) => {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
};
const combineAgesS = combine(30, 56);
console.log(combineAgesS);
const combineNamesS = combine('Olek', 'Annabelle');
console.log(combineAgesS);

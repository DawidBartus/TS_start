// add number on concatenate strings
var combine = function (input1, input2, resultConversion) {
    var result;
    if (resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
};
var combineAges = combine(30, 56, 'as-number');
console.log(combineAges);
var combineStringAges = combine('30', '56', 'as-number');
console.log(combineStringAges);
var combineNames = combine('Olek', 'Annabelle', 'as-string');
console.log(combineNames);

"use strict";
const numberElement = document.getElementById('value');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
let numberValue = 0;
numberElement.textContent = numberValue.toString();
const addNum = () => {
    numberValue += 1;
    numberElement.textContent = numberValue.toString();
};
const decrease = () => {
    numberValue -= 1;
    numberElement.textContent = numberValue.toString();
};
increaseButton.addEventListener('click', addNum);
decreaseButton.addEventListener('click', decrease);

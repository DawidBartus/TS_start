const num1 = document.getElementById('num1')! as HTMLInputElement;
const num2 = document.getElementById('num2')! as HTMLInputElement;
const button = document.getElementById('addButton')! as HTMLElement;
const resultSpan = document.getElementById('result')! as HTMLElement;

function add(number1: number, number2: number) {
    return number1 + number2;
}

button.addEventListener('click', function () {
    const num1Value = parseInt(num1.value);
    const num2Value = parseInt(num2.value);
    resultSpan.textContent = add(num1Value, num2Value).toString();
    console.log(add(num1Value, num2Value));
});

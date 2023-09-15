const numberElement = document.getElementById('value')! as HTMLElement;
const increaseButton = document.getElementById(
    'increase'
)! as HTMLButtonElement;
const decreaseButton = document.getElementById(
    'decrease'
)! as HTMLButtonElement;

let numberValue = 0;
numberElement.textContent = numberValue.toString();

const addNum: EventListener = () => {
    numberValue += 1;
    numberElement.textContent = numberValue.toString();
};
const decrease: EventListener = () => {
    numberValue -= 1;
    numberElement.textContent = numberValue.toString();
};

increaseButton.addEventListener('click', addNum);
decreaseButton.addEventListener('click', decrease);

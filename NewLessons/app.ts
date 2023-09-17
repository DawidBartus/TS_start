const paragraph = document.getElementById('param')! as HTMLElement;
const userInput = document.getElementById('user_text')! as HTMLInputElement;

userInput.value = 'Hi';

// i don't know the name of the property and the amount of it
interface ErrorContainer {
    [prop: string]: string;
}

// number can be converted to string
const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    123: 'It will work',
};

type Combinable2 = number | string;

function addNum(n: number, n2: number): number;
function addNum(n: string, n2: string): string;
function addNum(n: string, n2: number): string;
function addNum(n: number, n2: string): string;
function addNum(n: Combinable, n2: Combinable) {
    if (typeof n === 'string' || typeof n2 === 'string') {
        return n.toString() + n2.toString();
    } else {
        return n + n2;
    }
}

const result = addNum('Num', 2);

result.split(' ');

const fetchedUserData = {
    id: 'dasd1',
    name: 'Dave',
    job: { title: 'CEO', description: 'My own company' },
};
// optional chaining
console.log(fetchedUserData?.job?.title);

const userInput2 = '';

const storedData = userInput2 ?? 'Default';

console.log(storedData);

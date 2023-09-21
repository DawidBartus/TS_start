const templateElement = document.getElementById(
    'project-input'
)! as HTMLTemplateElement;
const hostElement = document.getElementById('app')! as HTMLDivElement;
const htmlContent = document.importNode(templateElement.content, true);
const htmlFormElement = htmlContent.firstElementChild as HTMLFormElement;

const loadForm = () => {
    if (htmlFormElement && hostElement) {
        htmlFormElement.id = 'user-input';
        hostElement.insertAdjacentElement('afterbegin', htmlFormElement);
        console.log('form load');
    }
};
loadForm();
// After form is load
const titleInput = document.getElementById('title') as HTMLInputElement;
const descriptionInput = document.getElementById(
    'description'
) as HTMLInputElement;
const peopleInput = document.getElementById('people') as HTMLInputElement;

interface Validate {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

const gatherUserInput = (): [string, string, number] | void => {
    const titleValidatable: Validate = {
        value: titleInput.value,
        required: true,
        minLength: 4,
    };
    const descriptionValidatable: Validate = {
        value: descriptionInput.value,
        required: true,
        minLength: 4,
    };
    const peopleValidatable: Validate = {
        value: +peopleInput.value,
        required: true,
        min: 1,
        max: 4,
    };

    if (
        !formValidate(titleValidatable) ||
        !formValidate(descriptionValidatable) ||
        !formValidate(peopleValidatable)
    ) {
        alert('Invalid input');
        return;
    } else {
        return [titleInput.value, descriptionInput.value, +peopleInput.value];
    }
};

const formValidate = (dataToValidate: Validate) => {
    let isValid = true;
    if (dataToValidate.required) {
        isValid =
            isValid && dataToValidate.value.toString().trim().length !== 0;
    }
    if (
        dataToValidate.minLength != null &&
        typeof dataToValidate.value === 'string'
    ) {
        isValid =
            isValid && dataToValidate.value.length >= dataToValidate.minLength;
    }
    if (
        dataToValidate.maxLength != null &&
        typeof dataToValidate.value === 'string'
    ) {
        isValid =
            isValid && dataToValidate.value.length <= dataToValidate.maxLength;
    }
    if (
        dataToValidate.min != null &&
        typeof dataToValidate.value === 'number'
    ) {
        isValid = isValid && dataToValidate.value >= dataToValidate.min;
    }
    if (
        dataToValidate.max != null &&
        typeof dataToValidate.value === 'number'
    ) {
        isValid = isValid && dataToValidate.value <= dataToValidate.max;
    }
    return isValid;
};

const submitHandler = (e: Event) => {
    e.preventDefault();
    const userInfo = gatherUserInput();

    if (Array.isArray(userInfo)) {
        const [title, description, people] = userInfo;
        console.log(title, description, people);
        htmlFormElement.reset();
    }
};

htmlFormElement.addEventListener('submit', submitHandler);

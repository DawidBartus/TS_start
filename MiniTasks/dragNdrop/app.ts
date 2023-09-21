// function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     const adjDescriptor: PropertyDescriptor = {
//         get() {
//             return originalMethod.bind(this);
//         },
//     };
//     return adjDescriptor;
// }

const AutoBind2 = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    return {
        get() {
            return descriptor.value.bind(this);
        },
    };
};

interface Validate {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

const validate = (validateInput: Validate) => {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    if (
        validateInput.minLength != null &&
        typeof validateInput.value === 'string'
    ) {
        isValid =
            isValid && validateInput.value.length >= validateInput.minLength;
    }
    if (
        validateInput.maxLength != null &&
        typeof validateInput.value === 'string'
    ) {
        isValid =
            isValid && validateInput.value.length <= validateInput.maxLength;
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value >= validateInput.min;
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value <= validateInput.max;
    }
    return isValid;
};

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const htmlContent = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = htmlContent.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInput = this.element.querySelector(
            '#title'
        ) as HTMLInputElement;
        this.descriptionInput = this.element.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.peopleInput = this.element.querySelector(
            '#people'
        ) as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    @AutoBind2
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            this.element.reset();
            console.log(title, description, people);
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInput.value;
        const description = this.descriptionInput.value;
        const people = +this.peopleInput.value;

        const titleValidatable: Validate = {
            value: title,
            required: true,
            minLength: 4,
        };
        const descriptionValidatable: Validate = {
            value: description,
            required: true,
            minLength: 4,
        };
        const peopleValidatable: Validate = {
            value: people,
            required: true,
            min: 1,
            max: 4,
        };
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input');
            return;
        } else {
            return [title, description, people];
        }
    }
}

class ProjectItems {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById(
            'project-list'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        const htmlContent = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = htmlContent.firstElementChild as HTMLElement;
        this.element.id = `${type}-projects`;
        this.attach();
        this.renderContent();
    }
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector(
            'h2'
        )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

const project = new ProjectInput();
const activeProjectList = new ProjectItems('active');
const finishedProjectList = new ProjectItems('finished');

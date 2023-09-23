const hostElement = document.getElementById('app')! as HTMLDivElement;

// form
const projectTemplate = document.getElementById(
    'project-input'
)! as HTMLTemplateElement;
const projectContent = document.importNode(projectTemplate.content, true);
const htmlFormElement = projectContent.firstElementChild as HTMLFormElement;
// section
const listTemplate = document.getElementById(
    'project-list'
)! as HTMLTemplateElement;
let listContent;
let listSection: HTMLElement;

const insertElement = (where: any, listSection: HTMLElement): void => {
    hostElement.insertAdjacentElement(where, listSection);
};

const loadForm = (): void => {
    if (htmlFormElement && hostElement) {
        htmlFormElement.id = 'user-input';
        insertElement('afterbegin', htmlFormElement);
        console.log('form load');
    }
};
loadForm();

type PageList = 'active' | 'finished';

const renderList = (listName: PageList): void => {
    listContent = document.importNode(listTemplate.content, true);
    listSection = listContent.firstElementChild as HTMLElement;
    listSection.id = `${listName}-projects`;
    insertElement('beforeend', listSection);

    listSection.querySelector(
        'h2'
    )!.textContent = `${listName.toUpperCase()} PROJECTS`;
    listSection.querySelector('ul')!.id = `${listName}-projects-list`;

    console.log(`${listName} project list load`);
};

renderList('active');
renderList('finished');

// After form & section is load
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

const formValidate = (dataToValidate: Validate): boolean => {
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
interface Post {
    title: string;
    description: string;
    people: number;
    key?: string | number;
}

const createLiElement = (postObject: Post): HTMLParagraphElement[] => {
    const paragraph = Object.keys(postObject).map((key) => {
        const newParagraph = document.createElement('p');
        const value = postObject[key as keyof Post];
        newParagraph.textContent = `${key}: ${value?.toString()}`;

        return newParagraph;
    });

    return paragraph;
};

const saveInput = ({ title, description, people }: Post) => {
    const listInnerParagraph = createLiElement({ title, description, people });
    const id = Math.random().toString();
    const newListElement = document.createElement('li');
    newListElement.id = id;

    listInnerParagraph.forEach((paragraph) =>
        newListElement.appendChild(paragraph)
    );

    document
        .getElementById('active-projects-list')!
        .appendChild(newListElement);
    newListElement.addEventListener('click', (e: MouseEvent) =>
        changeProjectTarget(e)
    );
    console.log('works');
};

const changeProjectTarget = (e: MouseEvent) => {
    const target = e.target as HTMLLIElement;
    const parentTarget = target.parentElement as HTMLUListElement;

    if (parentTarget.id === 'active-projects-list') {
        parentTarget.removeChild(target);
        document.getElementById('finished-projects-list')?.appendChild(target);
    } else if (parentTarget.id === 'finished-projects-list') {
        parentTarget.removeChild(target);
        document.getElementById('active-projects-list')?.appendChild(target);
    }
};

const submitHandler = (e: Event) => {
    e.preventDefault();
    const userInfo = gatherUserInput();

    if (Array.isArray(userInfo)) {
        const [title, description, people] = userInfo;
        saveInput({ title, description, people });
        htmlFormElement.reset();
    }
};

htmlFormElement.addEventListener('submit', submitHandler);

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

type PageListStatus = 'active' | 'finished';

interface Post {
    title: string;
    description: string;
    people: number;
    prjStatus: PageListStatus;
    id: string;
}

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

let activeList: Post[] = [];
let finishedList: Post[] = [];

const renderList = (listName: PageListStatus): void => {
    listContent = document.importNode(listTemplate.content, true);
    listSection = listContent.firstElementChild as HTMLElement;
    listSection.id = `${listName}-projects`;
    insertElement('beforeend', listSection);

    listSection.querySelector(
        'h2'
    )!.textContent = `${listName.toUpperCase()} PROJECTS`;
    listSection.querySelector('ul')!.id = `${listName}-projects-list`;

    listSection.addEventListener('dragover', (e) => dragOver(e));
    listSection.addEventListener('dragleave', (e) => dragLeave(e));
    listSection.addEventListener('drop', (e) => dragDrop(e));

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

const getProperNumber = (numberOfPeople: number): string => {
    if (numberOfPeople === 1) {
        return `1 person`;
    } else {
        return `${numberOfPeople} persons`;
    }
};

const createLiElement = (postObject: Post): HTMLLIElement => {
    const newListElement = document.createElement('li');
    newListElement.draggable = true;
    newListElement.id = postObject.id;

    const header = document.createElement('h2');
    const secondHeader = document.createElement('h3');
    const paragraph = document.createElement('p');

    header.textContent = `title: ${postObject['title' as keyof Post]}`;
    secondHeader.textContent = getProperNumber(postObject['people']);
    paragraph.textContent = `description: ${
        postObject['description' as keyof Post]
    }`;

    [header, secondHeader, paragraph].forEach((elem) => {
        newListElement.appendChild(elem);
    });

    return newListElement;
};

const renderProjectItem = () => {
    const projectActiveList = document.getElementById(`active-projects-list`)!;
    const projectFinishedList = document.getElementById(
        `finished-projects-list`
    )!;

    const activeElements = activeList.map((element) =>
        createLiElement(element)
    );
    const finishedElements = finishedList.map((element) =>
        createLiElement(element)
    );

    projectActiveList.innerHTML = '';
    projectFinishedList.innerHTML = '';

    activeElements.forEach((elem) => {
        projectActiveList.appendChild(elem);
        elem.addEventListener('dragstart', (e) => dragStartHandler(e, elem.id));
    });

    finishedElements.forEach((elem) => {
        projectFinishedList.appendChild(elem);
        elem.addEventListener('dragstart', (e) => dragStartHandler(e, elem.id));
    });
};

const changeProjectStatus = (obj: Post, newList: string) => {
    if (obj.prjStatus === 'active' && newList === 'finished-projects-list') {
        obj.prjStatus = 'finished';

        activeList = activeList.filter((elem) => elem.prjStatus === 'active');
        finishedList.push(obj);

        renderProjectItem();
    } else if (
        obj.prjStatus === 'finished' &&
        newList === 'active-projects-list'
    ) {
        obj.prjStatus = 'active';

        finishedList = finishedList.filter(
            (elem) => elem.prjStatus === 'finished'
        );
        activeList.push(obj);

        renderProjectItem();
    }

    return;
};

const submitHandler = (e: Event) => {
    e.preventDefault();
    const userInfo = gatherUserInput();

    if (Array.isArray(userInfo)) {
        const [title, description, people] = userInfo;
        const id = Math.random().toString();
        activeList.push({
            title,
            description,
            people,
            prjStatus: 'active',
            id,
        });
        renderProjectItem();
        htmlFormElement.reset();
    }
};

htmlFormElement.addEventListener('submit', submitHandler);

// Event listeners
const dragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
        const targetElement = e.target as HTMLElement;

        if (
            targetElement.id === 'finished-projects-list' ||
            targetElement.id === 'active-projects-list'
        ) {
            const listEl = document.getElementById(targetElement.id)!;
            listEl.classList.add('droppable');
        }
    }
};

const dragLeave = (e: DragEvent) => {
    const targetElement = e.target as HTMLElement;
    if (
        targetElement.id === 'finished-projects-list' ||
        targetElement.id === 'active-projects-list'
    ) {
        const listEl = document.getElementById(targetElement.id)!;
        listEl.classList.remove('droppable');
    }
};

const dragDrop = (e: DragEvent) => {
    const targetElement = e.target as HTMLElement;
    const data = e.dataTransfer!.getData('text/plain');

    const foundActiveObj = activeList?.find((elem) => elem.id === data);
    const foundFinishedObj = finishedList?.find((elem) => elem.id === data);
    let obj;

    if (foundActiveObj) {
        obj = foundActiveObj;
    }
    if (foundFinishedObj) {
        obj = foundFinishedObj;
    }

    if (obj) {
        changeProjectStatus(obj, targetElement.id);
    }
};

const dragStartHandler = (event: DragEvent, id: string) => {
    event.dataTransfer!.setData('text/plain', id);
    event.dataTransfer!.effectAllowed = 'move';
};
// --
const lists = document.querySelectorAll('ul');
lists.forEach((list) => {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('dragleave', dragLeave);
    list.addEventListener('drop', dragDrop);
});

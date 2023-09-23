"use strict";
const hostElement = document.getElementById('app');
const projectTemplate = document.getElementById('project-input');
const projectContent = document.importNode(projectTemplate.content, true);
const htmlFormElement = projectContent.firstElementChild;
const listTemplate = document.getElementById('project-list');
let listContent;
let listSection;
const insertElement = (where, listSection) => {
    hostElement.insertAdjacentElement(where, listSection);
};
const loadForm = () => {
    if (htmlFormElement && hostElement) {
        htmlFormElement.id = 'user-input';
        insertElement('afterbegin', htmlFormElement);
        console.log('form load');
    }
};
loadForm();
const dragOver = (e) => {
    if (e.dataTransfer) {
        e.preventDefault();
    }
};
const dragLeave = (e) => {
    const listEl = document.querySelector('ul');
    listEl.classList.remove('droppable');
};
const dragDrop = (e) => { };
const dragOver2 = (e) => {
    if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
        e.preventDefault();
        const targetElement = e.target;
        if (targetElement) {
            const listEl = document.getElementById(targetElement.id);
            listEl.classList.add('droppable');
        }
    }
};
const renderList = (listName) => {
    listContent = document.importNode(listTemplate.content, true);
    listSection = listContent.firstElementChild;
    listSection.id = `${listName}-projects`;
    insertElement('beforeend', listSection);
    listSection.querySelector('h2').textContent = `${listName.toUpperCase()} PROJECTS`;
    listSection.querySelector('ul').id = `${listName}-projects-list`;
    listSection.addEventListener('dragover', (e) => dragOver2(e));
    listSection.addEventListener('dragleave', (e) => dragLeave(e));
    listSection.addEventListener('drop', (e) => dragDrop(e));
    console.log(`${listName} project list load`);
};
renderList('active');
renderList('finished');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const peopleInput = document.getElementById('people');
const gatherUserInput = () => {
    const titleValidatable = {
        value: titleInput.value,
        required: true,
        minLength: 4,
    };
    const descriptionValidatable = {
        value: descriptionInput.value,
        required: true,
        minLength: 4,
    };
    const peopleValidatable = {
        value: +peopleInput.value,
        required: true,
        min: 1,
        max: 4,
    };
    if (!formValidate(titleValidatable) ||
        !formValidate(descriptionValidatable) ||
        !formValidate(peopleValidatable)) {
        alert('Invalid input');
        return;
    }
    else {
        return [titleInput.value, descriptionInput.value, +peopleInput.value];
    }
};
const formValidate = (dataToValidate) => {
    let isValid = true;
    if (dataToValidate.required) {
        isValid =
            isValid && dataToValidate.value.toString().trim().length !== 0;
    }
    if (dataToValidate.minLength != null &&
        typeof dataToValidate.value === 'string') {
        isValid =
            isValid && dataToValidate.value.length >= dataToValidate.minLength;
    }
    if (dataToValidate.maxLength != null &&
        typeof dataToValidate.value === 'string') {
        isValid =
            isValid && dataToValidate.value.length <= dataToValidate.maxLength;
    }
    if (dataToValidate.min != null &&
        typeof dataToValidate.value === 'number') {
        isValid = isValid && dataToValidate.value >= dataToValidate.min;
    }
    if (dataToValidate.max != null &&
        typeof dataToValidate.value === 'number') {
        isValid = isValid && dataToValidate.value <= dataToValidate.max;
    }
    return isValid;
};
const getProperNumber = (numberOfPeople) => {
    if (numberOfPeople === 1) {
        return `1 person`;
    }
    else {
        return `${numberOfPeople} persons`;
    }
};
const dragStartHandler = (event, id) => {
    console.log('drag start works');
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
};
const createLiElement = (postObject) => {
    const id = Math.random().toString();
    const newListElement = document.createElement('li');
    newListElement.id = id;
    const header = document.createElement('h2');
    const secondHeader = document.createElement('h3');
    const paragraph = document.createElement('p');
    header.textContent = `title: ${postObject['title']}`;
    secondHeader.textContent = getProperNumber(postObject['people']);
    paragraph.textContent = `description: ${postObject['description']}`;
    [header, secondHeader, paragraph].forEach((elem) => {
        newListElement.appendChild(elem);
    });
    return newListElement;
};
const saveInput = ({ title, description, people }) => {
    const listElement = createLiElement({ title, description, people });
    document.getElementById('active-projects-list').appendChild(listElement);
    listElement.addEventListener('dragstart', (e) => dragStartHandler(e, listElement.id));
    console.log('works');
};
const submitHandler = (e) => {
    e.preventDefault();
    const userInfo = gatherUserInput();
    if (Array.isArray(userInfo)) {
        const [title, description, people] = userInfo;
        saveInput({ title, description, people });
        htmlFormElement.reset();
    }
};
htmlFormElement.addEventListener('submit', submitHandler);

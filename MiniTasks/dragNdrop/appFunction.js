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
const renderList = (listName) => {
    listContent = document.importNode(listTemplate.content, true);
    listSection = listContent.firstElementChild;
    listSection.id = `${listName}-projects`;
    insertElement('beforeend', listSection);
    listSection.querySelector('h2').textContent = `${listName.toUpperCase()} PROJECTS`;
    listSection.querySelector('ul').id = `${listName}-projects-list`;
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
const saveInput = (title, description, numOfPeople) => {
    const id = Math.random().toString();
    const newListElement = document.createElement('li');
    newListElement.textContent = title;
    newListElement.id = id;
    document
        .getElementById('active-projects-list')
        .appendChild(newListElement);
    newListElement.addEventListener('click', (e) => changeProjectTarget(e));
};
const changeProjectTarget = (e) => {
    var _a, _b;
    const target = e.target;
    const parentTarget = target.parentElement;
    if (parentTarget.id === 'active-projects-list') {
        parentTarget.removeChild(target);
        (_a = document.getElementById('finished-projects-list')) === null || _a === void 0 ? void 0 : _a.appendChild(target);
    }
    else if (parentTarget.id === 'finished-projects-list') {
        parentTarget.removeChild(target);
        (_b = document.getElementById('active-projects-list')) === null || _b === void 0 ? void 0 : _b.appendChild(target);
    }
};
const submitHandler = (e) => {
    e.preventDefault();
    const userInfo = gatherUserInput();
    if (Array.isArray(userInfo)) {
        const [title, description, people] = userInfo;
        saveInput(title, description, people);
        htmlFormElement.reset();
    }
};
htmlFormElement.addEventListener('submit', submitHandler);

enum ProjectStatus {
    Active,
    Finished,
}
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public numOfPeople: number,
        public status: ProjectStatus
    ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstanceMethod() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );

        this.projects.push(newProject);
        const projectCopy = [...this.projects];
        for (const listenerFn of this.listeners) {
            listenerFn(projectCopy);
        }
    }
}

const projectState = ProjectState.getInstanceMethod();

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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementID: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(
            templateId
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementID)! as T;
        const htmlContent = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = htmlContent.firstElementChild as U;

        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
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
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent(): void {}

    @AutoBind2
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.element.reset();
        }
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

class ProjectItems extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                } else {
                    return project.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        // list
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector(
            'h2'
        )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
}

const project = new ProjectInput();
const activeProjectList = new ProjectItems('active');
const finishedProjectList = new ProjectItems('finished');

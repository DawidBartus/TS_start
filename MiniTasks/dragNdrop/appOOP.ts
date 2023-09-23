interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

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
        this.updateListeners();
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);

        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
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

class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
{
    private project: Project;

    get persons(): string {
        if (this.project.numOfPeople === 1) {
            return '1 person';
        } else {
            return `${this.project.numOfPeople} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @AutoBind2
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    dragEndHandler(_: DragEvent) {}
}

class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }
    @AutoBind2
    dragLeaveHandler(event: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }
    @AutoBind2
    dragOverHandler(event: DragEvent): void {
        if (
            event.dataTransfer &&
            event.dataTransfer.types[0] === 'text/plain'
        ) {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @AutoBind2
    dropHandler(event: DragEvent): void {
        const prjId = event.dataTransfer!.getData('text/plain');

        projectState.moveProject(
            prjId,
            this.type === 'active'
                ? ProjectStatus.Active
                : ProjectStatus.Finished
        );
    }

    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

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
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

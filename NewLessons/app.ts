// decorators
function Logger(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class PersonCreator {
    name = 'Max';
    constructor() {
        console.log('Works');
    }
}

const maxPerson = new PersonCreator();

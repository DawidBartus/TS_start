import NewToDo from './components/NewToDo';
import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import List from './components/DiffrentTask';

interface ToDos {
    id: string;
    task: string;
}

function App() {
    // const [toDo, setToDo] = useState<ToDos[]>([]);

    // const updateToDos = (task: string) => {
    //     const id = Math.random().toString();
    //     // setToDo([...toDo, { id, task }]);
    //     setToDo((prev) => [...prev, { id, task }]);
    // };
    // const deleteHandle = (id: string) => {
    //     setToDo((prev) => prev.filter((element) => element.id !== id));
    // };

    return (
        <div className="App">
            {/* <NewToDo onAddToDo={updateToDos} /> */}
            {/* <ToDoList items={toDo} onDelete={deleteHandle} /> */}

            <List/>
        </div>
    );
}

export default App;

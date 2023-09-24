import React, { useRef } from 'react';

type NewToDoType = {
    onAddToDo: (task: string) => void;
};

const NewToDo: React.FC<NewToDoType> = ({ onAddToDo }) => {
    const textRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredText = textRef.current!.value;
        onAddToDo(enteredText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="todo">Todo text</label>
            <input id="todo" type="text" ref={textRef} />
            <button type="submit">Add</button>
        </form>
    );
};

export default NewToDo;

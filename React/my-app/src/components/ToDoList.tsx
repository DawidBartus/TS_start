import React from 'react';
interface ToDoListProps {
    items: { id: string; task: string }[];
    onDelete: (id: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ items, onDelete }) => {
    return (
        <ul>
            {items.map((element) => (
                <li key={element.id}>
                    <span>{element.task}</span>
                    <button onClick={onDelete.bind(null, element.id)}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ToDoList;

import React, { ReactEventHandler, useRef, useState } from "react"

interface FormInt {
    onSave: (task: string)=> void
}

const Form: React.FC<FormInt> = ({onSave})=>{

    const taskIn = useRef<HTMLInputElement>(null)

    const saveInput = (e: React.FormEvent) =>{
        e.preventDefault()
        console.log("clikc")
        const value = taskIn.current!.value
        onSave(value)
    }
    return(
        <form onSubmit={saveInput}>
            <input type="text" ref={taskIn} /> 
            <button type="submit">Save</button>
        </form>
    )
}

interface TaskObj {
    name: string
    status: boolean
}

const tasks = [
    { name: "Zadanie 1", status: false },
    { name: "Zadanie 2", status: true },
    { name: "Zadanie 3", status: false },
    { name: "Zadanie 4", status: true },
    { name: "Zadanie 5", status: false },
  ];
  

const List = () =>{

    const [task, setTask] = useState<TaskObj[]>([...tasks])

const addTask = (tsk: string) =>{
    const newTask = {name: tsk, status: true}
    setTask(prev=>  [...prev, newTask])
}

const compliteTask = (e:any)=>{
setTask(prev=> prev.map(tsk=> tsk.name === e.target.id ? {...tsk, status: !tsk.status} : tsk))
}

const deleteTask = (name: string)=>{
    setTask(prev=> prev.filter(elem=> elem.name !==name))
}

    return <>
    <Form onSave={addTask}/>
    <h2>Active task</h2>
    <ul>{task?.map((elem, index)=>elem.status && <li key={elem.name + index}>
       <input type="checkbox" checked={!elem.status} id={elem.name} onChange={compliteTask}/> 
       {elem.name} 
       <button onClick={deleteTask.bind(null, elem.name)}>Delete</button></li>)}
    </ul>
    <h2>Inactive task</h2>
    <ul>{task?.map((elem, index)=>!elem.status && <li key={elem.name + index}>
    <input type="checkbox" checked={!elem.status} id={elem.name} onChange={compliteTask}/>
    {elem.name}
    <button onClick={deleteTask.bind(null, elem.name)}>Delete</button>
    </li>)}
    </ul>
    </>
}

export default List
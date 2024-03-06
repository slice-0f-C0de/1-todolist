import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {TypesForFilters} from "./App";

type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, id: string, newStatus: boolean) => void
    filter: string
    changeFilter: (todolistId: string, filter: TypesForFilters) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, ...props}: TodolistType) => {

    const [newTitle, setNewTitle] = useState('')

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.addTask(props.id, newTitle)
        setNewTitle('')
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeTitleHandler}
                   onKeyUp={addTaskOnKeyUpHandler}/>
            <Button title={'+'} onClick={addTaskHandler}/>
        </div>
        {tasks.length === 0 ? (<p>Тасок нет!</p>) : (
            <ul>
                {tasks.map(task => {

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatus = e.currentTarget.checked
                        props.changeTaskStatus(props.id, task.id, newStatus)
                    }

                    return <li key={task.id}>

                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={changeTaskStatusHandler}/>
                        <span>{task.title}</span>
                        <Button title={'X'} onClick={() => props.removeTask(props.id, task.id)}/>
                    </li>
                })}
            </ul>
        )}
        <div>
            <Button title={'All'} onClick={() => props.changeFilter(props.id,'All')}/>
            <Button title={'Active'} onClick={() => props.changeFilter(props.id,'Active')}/>
            <Button title={'Completed'} onClick={() => props.changeFilter(props.id,'Completed')}/>
        </div>
    </div>
}
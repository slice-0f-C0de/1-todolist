import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {TypesForFilters} from "./App";

type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filters: TypesForFilters) => void
    addTask: (newTitle: string) => void
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
        props.addTask(newTitle)
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
                    return <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={'X'} onClick={() => props.removeTask(task.id)}/>
                    </li>
                })}
            </ul>
        )}
        <div>
            <Button title={'All'} onClick={() => props.changeFilter('All')}/>
            <Button title={'Active'} onClick={() => props.changeFilter('Active')}/>
            <Button title={'Completed'} onClick={() => props.changeFilter('Completed')}/>
        </div>
    </div>
}
import React, {useState} from "react";
import {Button} from "./Button";
import {TypesForFilters} from "./App";

type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filters: TypesForFilters) => void
    addTask: () => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, ...props}: TodolistType) => {

    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <Button onClick={() => props.addTask()} title={'+'} />
        </div>
        {tasks.length === 0 ? (<p>Тасок нет!</p>) : (
            <ul>
                {tasks.map(task => {
                    return <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={'X'} onClick={() => props.removeTask(task.id)} />
                    </li>
                })}
            </ul>
        )}
        <div>
            <Button onClick={() => props.changeFilter('All')} title={'All'} />
            <Button onClick={() => props.changeFilter('Active')} title={'Active'} />
            <Button onClick={() => props.changeFilter('Completed')} title={'Completed'} />
        </div>
    </div>
}
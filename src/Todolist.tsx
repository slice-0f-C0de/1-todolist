import React from "react";
import {Button} from "./Button";


type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, ...props}: TodolistType) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <Button title={'+'} />
        </div>
        {tasks.length === 0 ? (<p>Тасок нет!</p>) : (
            <ul>
                {tasks.map(task => {
                    return <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>X</button>
                    </li>
                })}
            </ul>
        )}
        <div>
            <Button title={'All'} />
            <Button title={'Active'} />
            <Button title={'Completed'} />
        </div>
    </div>
}
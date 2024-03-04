import React from "react";

type TodolistType = {
    title: string
    tasks: TaskType[]
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks}: TodolistType) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        {tasks.length === 0 ? (<p>Тасок нет!</p>) : (
            <ul>
                {tasks.map(task => {
                    return <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                    </li>
                })}
            </ul>
        )}
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}
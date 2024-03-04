import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TypesForFilters = 'All' | 'Active' | 'Completed'

type TodolistsType = {
    id: string
    title: string
    filter: string
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])

    const removeTask = (id: string) => {
        const deletedTask = tasks.filter(el => el.id !== id)
        setTasks(deletedTask)
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([...tasks, newTask])
    }

    const changeTaskStatus = (id: string, newStatus: boolean) => {
        const newTaskStatus = tasks.map(el => el.id === id ? {...el, isDone: newStatus} : el)
        setTasks(newTaskStatus)
    }

    const changeFilter = (todolistId: string, filter: TypesForFilters) => {
        const newTodolistFilter = todolists.map(el => el.id === todolistId ? {...el, filter} : el)
        setTodolists(newTodolistFilter)
    }

    return (
        <div className="App">

            {todolists.map(todolists => {

                let allTasks = tasks

                if (todolists.filter === 'Active') {
                    allTasks = tasks.filter(el => !el.isDone)
                }
                if (todolists.filter === "Completed") {
                    allTasks = tasks.filter(el => el.isDone)
                }

                return <Todolist key={todolists.id}
                                 id={todolists.id}
                                 title={todolists.title}
                                 tasks={allTasks}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={todolists.filter}
                                 changeFilter={changeFilter}/>
            })}
        </div>
    );
}

export default App;

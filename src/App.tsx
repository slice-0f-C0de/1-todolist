import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TypesForFilters = 'All' | 'Active' | 'Completed'

function App() {

    const [filter, setFilter] = useState<TypesForFilters>('All')

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
        const task = tasks.find(el => el.id === id)
        if (task) {
            task.isDone = newStatus
            setTasks([...tasks])
        }
    }

    const changeFilter = (filters: TypesForFilters) => {
        setFilter(filters)
    }

    let allTasks = tasks

    if (filter === 'Active') {
        allTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === "Completed") {
        allTasks = tasks.filter(el => el.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'First Todolist'}
                      tasks={allTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;

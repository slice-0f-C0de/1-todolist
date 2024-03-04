import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TypesForFilters = 'All' | 'Active' | 'Completed'

function App() {

    const [filter, setFilter] = useState<TypesForFilters>('All')

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])

    const removeTask = (id: number) => {
        const deletedTask = tasks.filter(el => el.id !== id)
        setTasks(deletedTask)
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
                          changeFilter={changeFilter}/>
            </div>
        );
    }

    export default App;

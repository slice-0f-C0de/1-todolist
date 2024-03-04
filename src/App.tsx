import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])

    const removeTask = (id: number) => {
        const deletedTask = tasks.filter(el => el.id !== id)
        setTasks(deletedTask)
    }

    return (
        <div className="App">
            <Todolist title={'First Todolist'} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;

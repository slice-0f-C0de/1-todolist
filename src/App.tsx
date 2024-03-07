import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TypesForFilters = 'All' | 'Active' | 'Completed'

type TodolistsType = {
    id: string
    title: string
    filter: string
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }

    const addTask = (todolistId: string, newTitle: string) => {
        let task = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], task]})
    }

    const changeTaskStatus = (todolistId: string, id: string, newStatus: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: newStatus} : el)})
    }

    const changeFilter = (todolistId: string, filter: TypesForFilters) => {
        const newTodolistFilter = todolists.map(el => el.id === todolistId ? {...el, filter} : el)
        setTodolists(newTodolistFilter)
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {todolists.map(todolists => {

                let allTasks = tasks[todolists.id]

                if (todolists.filter === 'Active') {
                    allTasks = tasks[todolists.id].filter(el => !el.isDone)
                }
                if (todolists.filter === "Completed") {
                    allTasks = tasks[todolists.id].filter(el => el.isDone)
                }

                return <Todolist key={todolists.id}
                                 id={todolists.id}
                                 title={todolists.title}
                                 tasks={allTasks}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={todolists.filter}
                                 changeFilter={changeFilter}
                                 removeTodolist={removeTodolist}/>
            })}
        </div>
    );
}

export default App;

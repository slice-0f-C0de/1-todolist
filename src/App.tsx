import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title={'First Todolist'}/>
            <Todolist title={'Second Todolist'}/>
            <Todolist title={'Third Todolist'}/>
        </div>
    );
}

export default App;

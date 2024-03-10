import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
	id: string
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus} = props

	const changeFilterTasksHandler = (filter: FilterValuesType, todolistId: string) => {
		changeFilter(filter, todolistId)
	}

	const addTaskHandler = (title: string) => {
		props.addTask(title, props.id)
	}

	const onChangeTitleHandler = (newTitle: string) => {
		props.changeTaskTitle(props.id, newTitle, props.id)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
				<button onClick={() => props.removeTodolist(props.id)}>X</button>
			</h3>
			<AddItemForm addItem={addTaskHandler}/>
			<div>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, props.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, props.id)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all', props.id)}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active', props.id)}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed', props.id)}/>
			</div>
		</div>
	)
}

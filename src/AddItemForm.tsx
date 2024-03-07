import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormType = {
    callback: (newTitle: string) => void
}

const AddItemForm = (props: AddItemFormType) => {

    const [newTitle, setNewTitle] = useState('')

    const addItem = () => {
        props.callback(newTitle)
        setNewTitle('')
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return <div>
        <input value={newTitle}
               onChange={onChangeTitleHandler}
               onKeyUp={addTaskOnKeyUpHandler}/>
        <Button title={'+'} onClick={addItem}/>
    </div>
};

export default AddItemForm;
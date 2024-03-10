import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const editModeHandler = () => {
        setEditMode(!editMode)
        setTitle(title)
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ? <input value={title} onBlur={() => setEditMode(!editMode)} onChange={onChangeTitleHandler} autoFocus/>
        : <span onDoubleClick={editModeHandler}>{title}</span>
};

export default EditableSpan;
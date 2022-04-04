import './Form.css'
import React, { useContext } from 'react';
import { TodoContext } from '../App';


function EditAndDeleteButtons (props) {

    const todo = useContext(TodoContext);
    return (
        <div className='edit-btns'>
            <button onClick={() => props.deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => props.setTodoEditing(todo.id)}>Edit</button>
        </div>
    )
}

export default EditAndDeleteButtons;
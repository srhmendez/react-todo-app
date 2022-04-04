import React, { useContext } from 'react';
import _uniqueId from 'lodash/uniqueId';
import SubmitNewTodoBTN from './SubmitNewTodoBTN';
import { TodosContext } from '../App';
import './Form.css';


function Form(props) {

    //Use Context hook
    const todos = useContext(TodosContext);
    console.log(todos)

    //on form submit 
    function handleSubmitTodo(event) {
        event.preventDefault();

        const id =  _uniqueId();
        console.log(id)

        const newTodo = {
        id: id,
        task: props.todo,
        completed: false,
        }

        //setting the value of todos array to the current array, then adding the new todo at the end.
        props.setTodos([...todos].concat(newTodo))

        //setting default value of setTodo to empty string.
        props.setTodo('')
    }

      return (
        <form className="submit-form" onSubmit={handleSubmitTodo}>

            <input
            className='input'
            type='text' 
            onChange={(event) => props.setTodo(event.target.value)} 
            value={props.todo}
            />
            <SubmitNewTodoBTN/>

        </form>
      )
}

  export default Form
import React from 'react';
import _uniqueId from 'lodash/uniqueId';
import './App.css';

function App() {

  //useState Hooks for setting todos in array and keeping track of current todo
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState([]);
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editedTodoName, setEditedTodoName] = React.useState("");

  React.useEffect(() => {
    //retrieving data using ref. string "todos"
    const accessData = localStorage.getItem("todos")
    //parsing data
    const loadedTodos = JSON.parse(accessData)

    //if there is data to parse, set todos to the data that is stored in Local Storage.
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  //Use Effect Hook To Save Data to Local Storage
  React.useEffect(() => {
    const jsonTodos = JSON.stringify(todos)
    //string to reference data --- todos is the data being stored
    localStorage.setItem("todos",jsonTodos)
  }, [todos])

  //on form submit 
  function handleSubmitTodo(event) {
    event.preventDefault();

    const id =  _uniqueId();
    console.log(id)

    const newTodo = {
      id: id,
      task: todo,
      completed: false,
    }

    //setting the value of todos array to the current array, then adding the new todo at the end.
    setTodos([...todos].concat(newTodo))

    //setting default value of setTodo to empty string.
    setTodo('')
  }

  function deleteTodo(id){
    const todosAfterDelete = [...todos].filter((todo) => id !== todo.id)
    setTodos(todosAfterDelete)
  }

  function completeTodo(id){
    const updatedTodos = [...todos].map((todo) => {
      if (id === todo.id){
        todo.completed = !todo.completed;
      }
      console.log(todo)
      return todo
    })

    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.task = editedTodoName;
      }
      return todo
    })
    console.log(updatedTodos)
    setTodos(updatedTodos)

    //set values back to null & empty string
    setTodoEditing(null)
    setEditedTodoName("")
  }

  return (
    <div className="App">
      <h1>Todos</h1>
      <form onSubmit={handleSubmitTodo}>

        <input 
          type='text' 
          onChange={(event) => setTodo(event.target.value)} 
          value={todo}
        />
        <button 
          type='submit'>Add Todo
        </button>

      </form>

        {todos.map((todo) => <div key={todo.id}>

          {todoEditing === todo.id ? (<input 
            type="text" 
            onChange={(event) => setEditedTodoName(event.target.value)} 
            value={editedTodoName}
          />) : (<div><input 
            type="checkbox" 
            onChange={() => completeTodo(todo.id)} 
            checked={todo.completed}
            />
            <span className='todoText'>{todo.task}</span></div>
          )}

          {editedTodoName === "" ? (
            <div>
              {/* Edit & Delete Buttons */}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            </div>
          ) : (
            <div>
              {/* Submit Edited Task Name */}
              <button onClick={() => editTodo(todo.id)}> Submit </button>
            </div>
          )}

        </div>)}
    </div>
  );
}

export default App;

import React, { createContext, useEffect} from 'react';
import './App.css';
import Form from './components/Form'
import EditAndDeleteButtons from './components/EditAndDeleteButtons';

//useContext to pass todos up through children components
export const TodosContext = createContext();
export const TodoContext = createContext();

function App() {

  //useState Hooks for setting todos in array and keeping track of current todo
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState([]);
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editedTodoName, setEditedTodoName] = React.useState("");

  useEffect(() => {
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
  useEffect(() => {
    const jsonTodos = JSON.stringify(todos)
    //string to reference data --- todos is the data being stored
    localStorage.setItem("todos",jsonTodos)
  }, [todos])



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
      <TodosContext.Provider value={todos}>
        <Form 
          setTodo={setTodo}
          setTodos={setTodos}
          todo={todo}
          todos={todos}
        />
      </TodosContext.Provider>


        {todos.map((todo) => <div className="todo-div" key={todo.id}>

          {todoEditing === todo.id ? (<input 
            type="text" 
            onChange={(event) => setEditedTodoName(event.target.value)} 
            value={editedTodoName}
          />) : (<div className='todo-div'><input 
            type="checkbox" 
            onChange={() => completeTodo(todo.id)} 
            checked={todo.completed}
            />
            <span className='todoText'>{todo.task}</span></div>
          )}

          {editedTodoName === "" ? (
            <div className='todos'>
              <TodoContext.Provider value={todo}>
                {/* Edit & Delete Buttons */}
                <EditAndDeleteButtons
                deleteTodo={deleteTodo}
                setTodoEditing={setTodoEditing}
                />
              </TodoContext.Provider>
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

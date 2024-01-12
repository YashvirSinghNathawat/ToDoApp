import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]); 
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  useEffect(()=>{
    fetch("http://localhost:3000/todos",{
      method: 'GET'
    }).then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      setTodos(data)
    })
  },[]);
  const AddTodoHandler = ()=>{
    console.log(title);
    console.log(description);
    setTitle("");
    setDescription("");
    const data = {title,description};
    fetch("http://localhost:3000/todos",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }).then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      console.log(typeof data);
      setTodos([...todos,data])
    });
  }
  return (
      <div className='Main-Container'>
        <h1 className='h1'>TO-DO APP</h1>
        <div className='Top-Container'>
          <input type={"text"} placeholder={"Enter Title"} value={title} onChange={(e)=>setTitle(e.target.value)}></input>
          <input type={"text"} placeholder={"Enter description"} value={description} onChange={(e)=>setDescription(e.target.value)}></input>
          <button onClick={AddTodoHandler}>Add Todo</button>
        </div>
        <div className='Bottom-Container'>
        {
          todos.map((obj)=>{
            return (
              <Todo todo={obj} key={obj.id}/>
            )
          
        })
    }
        </div>
      </div>
  )
}
function Todo(props){
  return (
      <div className='ToDoContainer'>
          <span className='tickMark'></span>
          <h1>Title {props.todo.title}</h1>
          <h3>Description {props.todo.description}</h3>
          {/* <h6>ID {props.todo.id}</h6> */}
      </div>
  )
}


export default App

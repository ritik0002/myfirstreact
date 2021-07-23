import React, { useState, useRef,useEffect } from 'react';
import TodoList from './TodoList'
import './reset.css'
import './style.css'
import { v4 as uuidv4 } from 'uuid';
import firebase from "./firebase";

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();
  const ref=firebase.firestore().collection("tasks");
  console.log(ref);
  const [tasks,setTasks]=useState([]);
  const [loading, setLoading]=useState(false);


  function getData(){
     tasks.map((task)=>(
      setTodos(prevTodos => {
      return [...prevTodos, { id: task.id, name: task.title, complete: task.check }]
    })))
  }

  function addTodo() {
    const name = todoNameRef.current.value
    let id=uuidv4();
    if (name == "") return
    setTodos(prevTodos => {
      ref
      .doc(id)
      .set({ id: id, name: name, complete: false });
      return [...prevTodos, { id: id, name: name, complete: false }]
    })
    todoNameRef.current.value=null;
  }

  function deleteTodo(){
    let newTodo=[...todos];
    newTodo=newTodo.filter(Checktodo=>!Checktodo.complete);
    for( let i=0;i<todos.length;i++){
      console.log(todos[i].id)
      console.log("the id is "+todos[0].name)
      if(todos[i].complete==true){
        ref
        .doc(todos[i].id)
        .delete()
    }
  }
    setTodos(newTodo);
    
  }

  function updateTodo(id){
    const newTodo=[...todos]
    
    const todo=newTodo.find(todo=>todo.id === id)
    todo.complete=!todo.complete;  //opposite state
    console.log("Check "+todo.id);
   
    
    setTodos(newTodo)
  }


function getTasks(){
  setLoading(true);
  ref.onSnapshot((querySnapshot)=>{
    const items=[];
    querySnapshot.forEach((doc)=>{
      items.push(doc.data());
      console.log(doc.data);
    });
    tasks.map((task)=>(
      setTodos(prevTodos => {
      return [...prevTodos, { id: task.id, name: task.name, complete: task.check }]
    })))
    setTasks(items);
    setLoading(false);
  });
}

useEffect(()=>{
  getTasks();
},[]);

  if(loading){
    return <h1>Loading....</h1>
  }
   
  return (
    <>
    <h1>WORKING!</h1>
     {tasks.map((task)=>(
     <div><h2>{task.title}</h2>          
      <p>{task.check}</p>
      </div>
      )
    )}
 



      <h1 class="test">To do List</h1>
      <div class="list">
      <TodoList todos={todos} updateTodo={updateTodo} />
      </div>
      <div class="text">
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={deleteTodo}> Clear Complete</button>
      </div>
  </>
  )
}

export default App;

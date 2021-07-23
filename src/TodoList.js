import React from 'react'
import Todo from './Todo'
export default function TodoList({todos,updateTodo} ) {
    return (
        
        todos.map(todo =>{
            return <Todo key={todo} updateTodo={updateTodo} todo={todo}/>
        })
    )
}

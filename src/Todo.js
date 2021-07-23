import React from 'react'

export default function Todo({todo,updateTodo}) {
    function changeTodo(){
        updateTodo(todo.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete}  onChange={changeTodo} />
                {todo.name}
            </label>
        </div>
    )
}

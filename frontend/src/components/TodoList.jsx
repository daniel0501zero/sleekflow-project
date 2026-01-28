import Todo from './TodoItem.jsx'
import React from 'react'

const TodoList = ({ todos, user }) => {
    return (
        <div className="flex flex-col gap-5 justify-center items-center mt-9">
            {todos.map((todo) => {
                return (
                    <Todo key={todo._id} id={todo._id} name={todo.name} status={todo.status} description={todo.description} dueTime={todo.dueTime} updatedAt={todo.updatedAt} createdAt={todo.createdAt} users={todo.users} user={user}/>
                )
            })}
        </div>
    )
}

export default TodoList
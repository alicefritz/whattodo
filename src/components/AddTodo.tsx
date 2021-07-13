import React, {FormEvent, useState} from 'react'
import {ITodo} from './Todos'

interface Props{
  todos: Array<ITodo>;
  setTodos: (todos: Array<ITodo>) => void;
}

const AddTodo: React.FC<Props> = ({todos, setTodos}) => {
  
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newDate, setNewDate] = useState('')

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    return setNewDate(e.target.value)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setNewTodoTitle(e.target.value)
  }

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if(!newTodoTitle){
      alert("Please add a title for your task")
      return
    }else{
      const newTodo = {id:todos.length+1, title: newTodoTitle, urgent: false, deadline: newDate}
      const newTodos = todos.concat(newTodo)
      setNewTodoTitle('')
      setNewDate('')
      setTodos(newTodos)
    }
  }

  
  return (
    <div className="new-todo">
        <form onSubmit={addTodo} className="new-todo-form">
          <input type="text" className="new-todo-title" placeholder="New Todo.." onChange={handleOnChange} value={newTodoTitle} autoComplete="off"/>
          <input type="datetime-local" className="new-todo-date" onChange={handleDate} value={newDate}/>
          <button className="new-todo-button">Add</button>
        </form>
        
      </div>
  )
}

export default AddTodo;
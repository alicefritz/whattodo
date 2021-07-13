import React from 'react'
import {ITodo} from './Todos'

interface Props{
  todo: ITodo;
  deleteTodo: (id: number) => void;
  toggleUrgency: (id: number) => void;
}

const hasPassed = (date: string) => {
  console.log(new Date().valueOf() - new Date(date).valueOf())
  return (new Date().valueOf() - new Date(date).valueOf()) > 0 ? true : false;
}

const Todo: React.FC<Props> = ({todo, deleteTodo, toggleUrgency}) => {

  return (
    <div className="todo">
      <div className="todo-info">
        <div className={todo.urgent ? "todo-urgency urgent" : "todo-urgency"} title={todo.urgent ? "This is an urgent task!" : "This is a non-urgent task"} onClick={() => toggleUrgency(todo.id)}>!</div>
        <div>
          <h3 className="todo-title">{todo.title}</h3>
          <h5>{hasPassed(todo.deadline) ? "Deadline has passed" : todo.deadline.replace(/T/g, " at ")}</h5>
        </div>       
      </div>
      <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  )
}

export default Todo;
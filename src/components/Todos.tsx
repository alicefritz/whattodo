import React, {useState, useEffect} from 'react'
import Todo from './Todo'
import AddTodo from './AddTodo'

export interface ITodo{
  id: number;
  title: string;
  urgent: boolean;
  deadline: string;
}

const Todos: React.FC = () => {

  const [todos, setTodos] = useState<Array<ITodo>>(JSON.parse(localStorage.getItem('todos') || '[]'))
  const [onlyUrgent, setOnlyUrgent] = useState(false)
  const [sortASC, setSortASC] = useState(false);


  const visibleTodos = onlyUrgent ? todos.filter(todo => todo.urgent) : todos 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const toggleUrgent = () => {
    setOnlyUrgent(!onlyUrgent)
  }

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const toggleUrgency = (id: number) => {
    const newTodos = todos.map(todo => {
      todo.id === id && (todo.urgent = !todo.urgent)
      return todo
    })
    setTodos(newTodos)
  }

  const sortByDate = () => {
    const newTodos = [...todos]
    newTodos.sort((a,b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return sortASC ? (new Date(a.deadline).valueOf() - new Date(b.deadline).valueOf()) : (new Date(b.deadline).valueOf() - new Date(a.deadline).valueOf());
    });
    setTodos(newTodos)
    setSortASC(!sortASC)
  }





  return (
    <div className="todos">
      <h2>Todos</h2>
      <div className="sorting"> 
        
        {todos.length > 0 && <button className="urgent-toggle" onClick={toggleUrgent}>{onlyUrgent ? "Show all todos" : "Hide non-urgent todos"}</button>}
        {todos.length > 0 && <button onClick={sortByDate}>{sortASC ? "Sort by ASC (soonest first)" : "Sort by DESC (soonest last)"}</button>}
        
      </div>
      <div className="todo-container">
        {visibleTodos.map(todo => {
          return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleUrgency={toggleUrgency}/>
        })}
      </div>
      <AddTodo todos={todos} setTodos={setTodos}/>
      
      
    </div>
  )
}

export default Todos;

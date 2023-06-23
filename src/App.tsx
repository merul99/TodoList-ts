import { useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import ITodo from './Components/Interface';
import TodoList from './Components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<ITodo[]>([])
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add, active = todos, complete = completedTodos

    if (source.droppableId === "pendingTodos") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "pendingTodos") {
      active.splice(destination.index, 0, add)
      active.map(todo => todo.isDone = false)
    } else {
      complete.splice(destination.index, 0, add)
      complete.map(todo => todo.isDone = true)
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="card w-75 border-dark mt-5 m-auto">
        <div className='card-header border-dark'>
          <h2 className='m-2 text-center'>To Do List with TypeScript</h2>
        </div>
        <div className='card-body'>
          <div className='d-flex justify-content-center'>
            <InputField todo={todo} setTodo={setTodo} submitHandler={submitHandler} />
          </div>
          <hr style={{ border: "1px solid black" }} />
          <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;

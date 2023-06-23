import { useState } from "react";
import ITodo from "./Interface";
import { MdOutlineDoneOutline, MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import { Draggable } from "react-beautiful-dnd";

interface ISingleToDo {
    todo: ITodo
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
    index: number;
    completedTodos: ITodo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
}


const SingleTodo = ({ todo, todos, setTodos, index, completedTodos, setCompletedTodos }: ISingleToDo) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const doneHandler = (id: number) => {
        const foundCompletedTodo = completedTodos.find(todo => todo.id === id);
        const foundPendingTodo = todos.find(todo => todo.id === id);

        if (foundCompletedTodo) {
            setCompletedTodos(completedTodos.filter(todo => todo.id !== foundCompletedTodo.id))
            foundCompletedTodo.isDone = false
            setTodos([...todos, foundCompletedTodo])
        }
        if (foundPendingTodo) {
            setTodos(todos.filter(todo => todo.id !== foundPendingTodo.id))
            foundPendingTodo.isDone = true
            setCompletedTodos([...completedTodos, foundPendingTodo])
        }
    }

    const deleteHandler = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
        setCompletedTodos(completedTodos.filter(todo => todo.id !== id))
    }

    const editHandler = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: editTodo } : todo))
        setIsEditMode(false)
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <div className="card mb-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div className="card-body d-flex justify-content-between"
                    >
                        {
                            isEditMode ? <form onSubmit={() => editHandler(todo.id)}>
                                <input className="form-control" type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                            </form> : todo.isDone ?
                                <s>{todo.todo}</s>
                                : <div>{todo.todo}</div>
                        }
                        <div className="d-flex gap-2">
                            {
                                todo.isDone !== true && <MdOutlineModeEdit style={{ cursor: "pointer" }} size="25px" onClick={() => {
                                    if (!isEditMode && !todo.isDone) {
                                        setIsEditMode(!isEditMode)
                                    }
                                }} />
                            }
                            <MdOutlineDelete style={{ cursor: "pointer" }} size="25px" onClick={() => deleteHandler(todo.id)} />
                            <MdOutlineDoneOutline style={{ cursor: "pointer" }} size="22px" onClick={() => doneHandler(todo.id)} color={todo.isDone ? "green" : ""} />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default SingleTodo
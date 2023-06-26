import { useState } from "react";
import { ISingleToDo } from "./Interface";
import { MdOutlineDoneOutline, MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteTodo, doneTodo, updateTodo } from "../Redux/Action/actionCreator";


const SingleTodo = ({ todo, index }: ISingleToDo) => {
    const dispatch = useDispatch()
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const doneHandler = (id: number) => {
        dispatch(doneTodo(id))
    }

    const deleteHandler = (id: number) => {
        dispatch(deleteTodo(id))
    }

    const editHandler = (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        dispatch(updateTodo(id, editTodo))
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
                            isEditMode ? <form onSubmit={(e) => editHandler(e, todo.id)}>
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
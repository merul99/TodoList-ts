import { Droppable } from "react-beautiful-dnd";
import ITodo from "./Interface";
import SingleTodo from "./SingleTodo";

interface IToDos {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
    completedTodos: ITodo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
}


const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: IToDos) => {

    return (
        <div className="p-3 ">
            {
                todos.length > 0 ?
                    <div className="d-flex justify-content-between gap-5">
                        <Droppable droppableId="pendingTodos">
                            {(provided) => (
                                <div className="card border-success w-50 h-100" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="card-header border-success">
                                        <h3 className="text-center">Pending Todos</h3>
                                    </div>
                                    <div className="card-body">
                                        {
                                            todos.length > 0 ? todos.map((todo, index) => <SingleTodo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} index={index} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />)
                                                : <div className="text-center">Nothing to display. </div>
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="completedTodos">
                            {(provided) => (
                                <div className="card border-danger w-50 h-100" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="card-header border-danger">
                                        <h3 className="text-center">Completed Todos</h3>
                                    </div>
                                    <div className="card-body">
                                        {
                                            completedTodos.length > 0 ? completedTodos.map((todo, index) => <SingleTodo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} index={index} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />)
                                                : <div className="text-center">Nothing to display. </div>
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    : <div className="text-center">Nothing to display. </div>
            }
        </div>
    )
}

export default TodoList
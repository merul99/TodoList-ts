import { Droppable } from "react-beautiful-dnd";
import { IToDos } from "./Interface";
import SingleTodo from "./SingleTodo";

const TodoList = ({ pendingTodos, completedTodos }: IToDos) => {
    return (
        <div className="p-3 ">
            {/* {
                state.length > 0 ? */}
            <div className="d-flex justify-content-between gap-5">
                <Droppable droppableId="pendingTodos">
                    {(provided) => (
                        <div className="card border-success w-50 h-100"
                            ref={provided.innerRef} {...provided.droppableProps}
                        >
                            <div className="card-header border-success">
                                <h3 className="text-center">Pending Todos</h3>
                            </div>
                            <div className="card-body">
                                {
                                    pendingTodos.length > 0 ? pendingTodos.map((todo, index) => <SingleTodo todo={todo} key={todo.id} index={index} />)
                                        : <div className="text-center">Nothing to display. </div>
                                }
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="completedTodos">
                    {(provided) => (
                        <div className="card border-danger w-50 h-100"
                            ref={provided.innerRef} {...provided.droppableProps}>

                            <div className="card-header border-danger">
                                <h3 className="text-center">Completed Todos</h3>
                            </div>
                            <div className="card-body">
                                {
                                    completedTodos.length > 0 ? completedTodos.map((todo, index) => <SingleTodo todo={todo} key={todo.id} index={index} />)
                                        : <div className="text-center">Nothing to display. </div>
                                }
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            {/* : <div className="text-center">Nothing to display. </div>
             } */}
        </div >
    )
}

export default TodoList
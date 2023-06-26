import { ADD_TODO, DELETE_TODO, DONE_TODO, UPDATE_TODO } from "../actionTypes";
import { IInitialState, ActionProp } from '../../Components/Interface'

const initialState: IInitialState = { todos: [], completedTodos: [] }

const todoReducer = (state: IInitialState = initialState, action: ActionProp) => {
    switch (action.type) {
        case ADD_TODO:
            return state = {
                ...state,
                todos: [...state.todos, action.payload],
            }
        case DELETE_TODO:
            const foundCompletedTodo2 = state.completedTodos.find(todo => todo.id === action.payload);
            const foundPendingTodo2 = state.todos.find(todo => todo.id === action.payload);
            if (foundCompletedTodo2) {
                return {
                    ...state,
                    completedTodos: state.completedTodos.filter(todo => todo.id !== foundCompletedTodo2.id)
                };
            } else if (foundPendingTodo2) {
                return {
                    ...state,
                    todos: state.todos.filter(todo => todo.id !== foundPendingTodo2.id)
                };
            }
            return state;
        case UPDATE_TODO:
            return state = {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, todo: action.payload.editTodo } : todo)
            }
        case DONE_TODO:
            const foundCompletedTodo = state.completedTodos.find(todo => todo.id === action.payload);
            const foundPendingTodo = state.todos.find(todo => todo.id === action.payload);
            if (foundCompletedTodo) {
                const updatedTodo = { ...foundCompletedTodo, isDone: !foundCompletedTodo.isDone };
                return {
                    ...state,
                    todos: [...state.todos, updatedTodo],
                    completedTodos: state.completedTodos.filter(todo => todo.id !== foundCompletedTodo.id)
                };
            } else if (foundPendingTodo) {
                const updatedTodo = { ...foundPendingTodo, isDone: !foundPendingTodo.isDone };
                return {
                    ...state,
                    completedTodos: [...state.completedTodos, updatedTodo],
                    todos: state.todos.filter(todo => todo.id !== foundPendingTodo.id)
                };
            }
            return state;
        default:
            return state
    }
}

export default todoReducer
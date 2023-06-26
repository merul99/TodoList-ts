import { ADD_TODO, DELETE_TODO, DONE_TODO, UPDATE_TODO } from "../actionTypes";
import { ITodo } from "../../Components/Interface";



export const addTodo = (todo: ITodo) => {
    return {
        type: ADD_TODO,
        payload: todo
    };
};

export const deleteTodo = (id: number) => {
    return {
        type: DELETE_TODO,
        payload: id
    };
};

export const doneTodo = (id: number) => {
    return {
        type: DONE_TODO,
        payload: id
    };
};

export const updateTodo = (id: number, editTodo: string) => {
    return {
        type: UPDATE_TODO,
        payload: { id, editTodo }
    };
};
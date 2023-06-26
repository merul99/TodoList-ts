import { ADD_TODO, DELETE_TODO, DONE_TODO, UPDATE_TODO } from "../Redux/actionTypes";

export interface ITodo {
    id: number;
    todo: string;
    isDone: boolean
}

export interface IInitialState {
    todos: ITodo[];
    completedTodos: ITodo[]
}

interface IAbcd {
    id: number;
    editTodo: string
}

interface IAddtodoAction {
    type: typeof ADD_TODO;
    payload: ITodo
}

interface IDeletetodoAction {
    type: typeof DELETE_TODO;
    payload: number
}


interface IDonetodoAction {
    type: typeof DONE_TODO;
    payload: number
}


interface IUpdatetodoAction {
    type: typeof UPDATE_TODO;
    payload: IAbcd
}

export type ActionProp = IAddtodoAction | IDeletetodoAction | IDonetodoAction | IUpdatetodoAction


export interface IToDos {
    pendingTodos: ITodo[];
    completedTodos: ITodo[];
}

export interface ISingleToDo {
    todo: ITodo
    index: number;
}
import {createSlice, nanoid} from "@reduxjs/toolkit"

const initialState = {
    todos: [{id: 1, text: 'gym', completed: false}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, text: action.payload.text} : todo)
        },
        toggleComplete: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo)
        }
    }
})
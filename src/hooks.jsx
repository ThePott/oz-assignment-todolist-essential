import { useState, useEffect, useContext, createContext, useCallback, useReducer } from "react"

// ===== CONTEXT =====
const TodolistContext = createContext(null)

const useTodolistContext = () => {
    const context = useContext(TodolistContext)
    if (!context) {
        throw new Error('Fruit components must be used within FruitBox')
    }
    return context
}

// ==== GENERAL API REQUEST ====
const simpleRequest = async (url, method, body) => {
    const response = await fetch(
        url,
        {
            method: method,
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(body)
        }
    )

    if (!response.ok) {
        console.log("---- invalid response:", response)
        throw new Error()
    }

    const json = await response.json()
    return json
}

const requestPost = async (url, todo) => {
    try {
        await simpleRequest(url, "POST", todo)
    } catch (error) {
        console.error("---- ERROR:", error)
    }
}

const requestDelete = async (baseUrl, todo) => {
    try {
        const deleteUrl = `${baseUrl}/${todo.id}`
        await simpleRequest(deleteUrl, "DELETE")
    } catch (error) {
        console.error("---- ERROR:", error)
    }
}

const requestGet = async (url, setJson) => {
    try {
        const json = await simpleRequest(url, "GET")
        setJson(json)
    } catch (error) {
        console.error("---- ERROR:", error)
    }
}

const requestPut = async (baseUrl, todo) => {
    try {
        const deleteUrl = `${baseUrl}/${todo.id}`

        await simpleRequest(deleteUrl, "DELETE")
        await simpleRequest(baseUrl, "POST", todo)

    } catch (error) {
        console.error("---- ERROR:", error)
    }
}

// ==== PURPOSE SPECIFIC API CUSTOM HOOK
const useTodoApi = () => {
    const url = "http://localhost:3000/todo"
    const [todoJson, setTodoJson] = useState(null)

    useEffect(
        () => {
            requestGet(url, setTodoJson)
        },
        []
    )

    const putTodo = useCallback((todo) => { requestPut(url, todo) }, [])

    const deleteTodo = useCallback((todo) => { requestDelete(url, todo) }, [])

    const postTodo = useCallback((todo) => { requestPost(url, todo) }, [])

    return { todoJson, setTodoJson, putTodo, deleteTodo, postTodo }

}

const useQuoteApi = () => {
    const url = "https://dummyjson.com/quotes/random"
    const [quoteJson, setQuoteJson] = useState(null)
    useEffect(
        () => {
            requestGet(url, setQuoteJson)
        },
        []
    )

    return { quoteJson }
}

const updatingTodoReducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return null
        case "TOGGLE_UPDATE":
            if (!state) { return action.todo }
            if (state.id === action.todo.id) { return null }
            return action.todo
        default:
            return state
    }
}
const useTodoUpdate = () => {
    const [updatingTodo, updatingTodoDispatch] = useReducer(updatingTodoReducer, null)

    return { updatingTodo, updatingTodoDispatch }
}


export { useTodoApi, useQuoteApi, TodolistContext, useTodolistContext, useTodoUpdate }

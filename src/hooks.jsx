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
const todoApiReducer = (state, action) => {
    const copiedState = state ? [...state] : []
    switch (action.type) {
        case "SET":
            return action.todoJson
        case "UPDATE_WHAT":
            const targetTodoWhat = copiedState.find((todo) => todo.id === action.todo.id)
            targetTodoWhat.what = action.todo.what
            return copiedState
        case "TOGGLE_IS_DONE":
            const targetTodoDone = copiedState.find((todo) => todo.id === action.todo.id)
            targetTodoDone.isDone = !targetTodoDone.isDone
            return copiedState
        case "DELETE":
            const filteredArray = copiedState.filter((todo) => todo.id !== action.todo.id)
            return filteredArray
        case "POST":
            console.log("---- posting:", action.what)
            const todo = {
                id: Number(new Date()),
                what: action.what,
                isDone: false
            }
            return [...copiedState, todo]
        case "REORDER":
            const done = action.todo.isDone
            const groupedObject = Object.groupBy(
                copiedState,
                ({isDone}) => isDone === done ? "myGroup" : "notMyGroup"
            )
            
            const myGroup = groupedObject.myGroup
            const notMyGroup = groupedObject.notMyGroup
            
            const indexOffset = Math.round(action.diffY / (12 + 48))
            const oldIndex = myGroup.findIndex((todo) => todo.id === action.todo.id)
            const newIndex = Math.min(myGroup.length -1, Math.max(0, oldIndex + indexOffset))

            if (indexOffset === 0) { 
                return state 
            }

            if (indexOffset < 0) {
                myGroup.splice(oldIndex, 1)
                myGroup.splice(newIndex, 0, action.todo)
            } else {
                myGroup.splice(newIndex + 1, 0, action.todo)
                myGroup.splice(oldIndex, 1)
            }
            
            return [...myGroup, ...notMyGroup]

        default:
            return state
    }
}
const useTodoApi = () => {
    const url = "http://localhost:3000/todo"
    const [todoJson, todoApiDispatch] = useReducer(todoApiReducer, null)

    // const setTodoJson = (todoJson) => todoApiDispatch({ type: "SET", todoJson })
    
    useEffect(
        () => {
            if (!todoJson) { return }
            localStorage.setItem("todoJson", JSON.stringify(todoJson))
        },
        [todoJson]
    )

    useEffect(
        () => {
            // requestGet(url, setTodoJson)
            const jsonInString = localStorage.getItem("todoJson")
            const json = JSON.parse(jsonInString)
            todoApiDispatch({type: "SET", todoJson: json})
        },
        []
    )


    const putTodo = useCallback((todo) => { requestPut(url, todo) }, [])

    const deleteTodo = useCallback((todo) => { requestDelete(url, todo) }, [])

    const postTodo = useCallback((todo) => { requestPost(url, todo) }, [])

    return { todoJson, todoApiDispatch, putTodo, deleteTodo, postTodo }

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

const searchReducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return ""
        case "SET":
            return action.text
        default:
            return state
    }
}
const useSearch = () => {
    const [searchText, searchTextDispatch] = useReducer(searchReducer, "")
    return { searchText, searchTextDispatch }
}


export { useTodoApi, useQuoteApi, TodolistContext, useTodolistContext, useTodoUpdate, useSearch }

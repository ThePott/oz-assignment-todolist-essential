import { useState, useEffect, useContext, createContext, useCallback } from "react"

const TodolistContext = createContext(null)

const useTodolistContext = () => {
    const context = useContext(TodolistContext)
    if (!context) {
        throw new Error('Fruit components must be used within FruitBox')
    }
    return context
}

/** BODY <- JSON */
const requestApi = async (setResponseJson, setResponseStatus, url, method, body) => {
    try {
        setResponseStatus("IS_LOADING")

        const response = await fetch(
            url,
            {
                method,
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(body)
            }
        )

        const json = await response.json()
        if (!response.ok) { throw new Error() }

        setResponseJson(json)
        setResponseStatus("SUCCESS")
    } catch (error) {
        setResponseStatus("ERROR")
    }
}

const simpleRequest = async (url, method, body) => {
    const response = await fetch(
        url,
        {
            method: method,
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(body)
        }
    )
    const json = await response.json()
    if (!response.ok) {
        console.log("---- invalid response:", response, json)
         throw new Error()
         }
    return json
}

const requestDelete = async (baseUrl, todo) => {
    try {
        const deleteUrl = `${baseUrl}/${todo.id}`
        await simpleRequest(deleteUrl, "DELETE")
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

const useApi = (destination, method = "GET", body = undefined) => {
    const url = destination === "QUOTE" ? "https://dummyjson.com/quotes/random" : "http://localhost:3000/todo"
    const [responseJson, setResponseJson] = useState(null)
    const [responseStatus, setResponseStatus] = useState("IS_LOADING")

    /** 우선 최초 마운트에만 호출, 지켜보고 필요하면 의존성 배열에 더 넣자 */
    useEffect(
        () => { requestApi(setResponseJson, setResponseStatus, url, method, body) },
        []
    )

    const putTodo = useCallback(
        (todo) => { 
            console.log("---- started put?")
            requestPut(url, todo) 
        },
        []
    )

    const deleteTodo = useCallback(
        (todo) => { 
            console.log("---- started?")
            requestDelete(url, todo)
         }
    )

    return { responseJson, setResponseJson, responseStatus, putTodo, deleteTodo }

}

export { useApi, TodolistContext, useTodolistContext }

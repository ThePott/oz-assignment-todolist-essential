import { useState, useEffect } from "react"

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

const useApi = (destination, method = "GET", body = undefined) => {
    const url = destination === "QUOTE" ? "https://dummyjson.com/quotes/random" : "http://localhost:3000/todo"
    const [responseJson, setResponseJson] = useState(null)
    const [responseStatus, setResponseStatus] = useState("IS_LOADING")

    /** 우선 최초 마운트에만 호출, 지켜보고 필요하면 의존성 배열에 더 넣자 */
    useEffect(
        () => { requestApi(setResponseJson, setResponseStatus, url, method, body) },
        []
    )

    return { responseJson, responseStatus }

}

export { useApi }

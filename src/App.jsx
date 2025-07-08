import { useState } from "react"
import Quote from "./components/Quote"
import Timer from "./components/Timer"
import TodoInput from "./components/TodoInput"
import TodoSection from "./components/TodoSection"
import { TodolistContext, useApi } from "./hooks"


const App = () => {
  const [updatingTodo, setUpdatingTodo] = useState(null)

  const { responseJson: quoteJson, responseStatus: quoteStatus } = useApi("QUOTE")
  const { responseJson: todoJson, setResponseJson: setTodoJson, responseStatus: todoStatus, putTodo, deleteTodo, postTodo } = useApi("TODO")
  
  return (
    <TodolistContext.Provider value={{setTodoJson, putTodo, deleteTodo, postTodo, setUpdatingTodo}}>
      <div className="app-boundary">
        <Timer />
        <Quote quoteJson={quoteJson} quoteStatus={quoteStatus} />
        <TodoSection todoJson={todoJson} />
        <TodoInput updatingTodo={updatingTodo} />
      </div>
    </TodolistContext.Provider>
  )
}

export default App

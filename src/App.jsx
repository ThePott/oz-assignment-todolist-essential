import { useState } from "react"
import Quote from "./components/Quote"
import Colock from "./components/Colock"
import TodoInput from "./components/TodoInput"
import TodoSection from "./components/TodoSection"
import { TodolistContext, useTodoApi, useQuoteApi } from "./hooks"


const App = () => {
  // const 
  const [updatingTodo, setUpdatingTodo] = useState(null)

  const { quoteJson } = useQuoteApi()
  const { todoJson, setTodoJson } = useTodoApi()
  
  return (
    <TodolistContext.Provider value={{setTodoJson, updatingTodo, setUpdatingTodo}}>
      <div className="app-boundary">
        <Colock />
        <Quote quoteJson={quoteJson}  />
        <TodoSection todoJson={todoJson} />
        <TodoInput updatingTodo={updatingTodo} />
      </div>
    </TodolistContext.Provider>
  )
}

export default App

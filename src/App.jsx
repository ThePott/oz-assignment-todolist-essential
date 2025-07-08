import Quote from "./components/Quote"
import Timer from "./components/Timer"
import TodoInput from "./components/TodoInput"
import TodoSection from "./components/TodoSection"
import { TodolistContext, useApi } from "./hooks"


const App = () => {
  const { responseJson: quoteJson, responseStatus: quoteStatus } = useApi("QUOTE")
  const { responseJson: todoJson, setResponseJson: setTodoJson, responseStatus: todoStatus, putTodo, deleteTodo, postTodo } = useApi("TODO")
  // console.log("---- put todo, delete todo:", putTodo, deleteTodo)

  return (
    <TodolistContext.Provider value={{setTodoJson, putTodo, deleteTodo, postTodo}}>
      <div className="app-boundary">
        <Timer />
        <Quote quoteJson={quoteJson} quoteStatus={quoteStatus} />
        <TodoSection todoJson={todoJson} />
        <TodoInput />
      </div>
    </TodolistContext.Provider>
  )
}

export default App

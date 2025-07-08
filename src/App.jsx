import Colock from "./components/Colock"
import Quote from "./components/Quote"
import TodoInput from "./components/TodoInput"
import TodoSection from "./components/TodoSection"
import { TodolistContext, useQuoteApi, useTodoApi, useTodoUpdate } from "./hooks"


const App = () => {
  const { updatingTodo, updatingTodoDispatch } = useTodoUpdate()
  const { quoteJson } = useQuoteApi()
  const { todoJson, setTodoJson } = useTodoApi()

  return (
    <TodolistContext.Provider value={{ setTodoJson, updatingTodo, updatingTodoDispatch }}>
      <div className="app-boundary">
        <Colock />
        <Quote quoteJson={quoteJson} />
        <TodoSection todoJson={todoJson} />
        <TodoInput updatingTodo={updatingTodo} />
      </div>
    </TodolistContext.Provider >
  )
}

export default App

import Colock from "./components/Colock"
import Quote from "./components/Quote"
import TodoInput from "./components/TodoInput"
import TodoSection from "./components/TodoSection"
import EditModal from "./components/EditModal"
import { TodolistContext, useQuoteApi, useTodoApi, useTodoUpdate } from "./hooks"


const App = () => {
  const { updatingTodo, updatingTodoDispatch } = useTodoUpdate()
  const { quoteJson } = useQuoteApi()
  const { todoJson, setTodoJson, todoApiDispatch } = useTodoApi()

  return (
    <TodolistContext.Provider value={{ setTodoJson, todoApiDispatch, updatingTodo, updatingTodoDispatch }}>
      <div className="container">
        {updatingTodo && <EditModal />}
        <div className={`app-boundary ${updatingTodo ? "blur" : ""}`}>
          <Colock />
          <Quote quoteJson={quoteJson} />
          <TodoSection todoJson={todoJson} />
          <TodoInput updatingTodo={updatingTodo} />
        </div>
      </div>
    </TodolistContext.Provider >
  )
}

export default App

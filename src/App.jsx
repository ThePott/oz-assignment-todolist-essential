import Quote from "./components/Quote"
import Timer from "./components/Timer"
import TodoBox from "./components/TodoBox"
import TodoInput from "./components/TodoInput"
import Divider from "./components/Divider"
import TodoSection from "./components/TodoSection"
import { useContext, createContext } from "react"
import { useApi, TodolistContext } from "./hooks"


const App = () => {
  const { responseJson: quoteJson, responseStatus: quoteStatus } = useApi("QUOTE")
  const { responseJson: todoJson, setResponseJson: setTodoJson, responseStatus: todoStatus } = useApi("TODO")


  return (
    <TodolistContext.Provider value={setTodoJson}>
      <div className="app-boundary">
        < Divider />< Divider />< Divider />
        <Timer />
        <Quote quoteJson={quoteJson} quoteStatus={quoteStatus} />
        <TodoSection todoJson={todoJson} />
        <TodoInput />
      </div>
    </TodolistContext.Provider>
  )
}

export default App

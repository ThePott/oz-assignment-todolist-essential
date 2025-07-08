import Quote from "./components/Quote"
import Timer from "./components/Timer"
import TodoBox from "./components/TodoBox"
import TodoInput from "./components/TodoInput"
import Divider from "./components/Divider"
import {useApi} from "./hooks"
const App = () => {
  const { responseJson: quoteJson, responseStatus: quoteStatus } = useApi("QUOTE")
  const { responseJson: todoJSON, responseStatus: todoStatus } = useApi("TODO")


  

  return (
    <div className="app-boundary">
      <Timer />
      <Quote quoteJson={quoteJson} quoteStatus={quoteStatus} />
      <Divider />
      <TodoInput />
    </div>
  )
}

export default App

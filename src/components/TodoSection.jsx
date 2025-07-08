import Divider from './Divider'
import TodoBox from "./TodoBox"

const TodoSkeleton = () => {
  return (
    <>
      <div className="todo">skeleton</div>
      <div className="todo"></div>
      <div className="todo"></div>
    </>
  )
}

const TodoMany = ({ todoArray }) => {
  if (!todoArray || todoArray.length === 0) { return null }

  return (
    <>
      <Divider />
      {todoArray.map((todo) => <TodoBox key={todo.id} todo={todo} />)}
    </>
  )
}

const TodoSection = ({ todoJson }) => {
  if (!todoJson) { return <TodoSkeleton /> }

  const groupedOjbect = Object.groupBy(
    todoJson,
    ({ isDone }) => isDone ? "done" : "notYet"
  )
  
  const doneArray = groupedOjbect["done"]
  const notYetArray = groupedOjbect["notYet"]

  return (
    <>
      <TodoMany todoArray={doneArray} />
      <TodoMany todoArray={notYetArray} />
      <Divider />
    </>
  )
}

export default TodoSection
import Divider from './Divider'
import TodoBox from "./TodoBox"
import { useTodolistContext } from "../hooks"

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

  const { updatingTodo } = useTodolistContext()

  const isUpdatingArray = updatingTodo ? todoArray.map((todo) => todo.id === updatingTodo.id) : todoArray.map(() => false)

  return (
    <>
      <Divider />
      {todoArray.map((todo, index) => <TodoBox key={todo.id} todo={todo} isUpdating={isUpdatingArray[index]} />)}
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
      <TodoMany todoArray={notYetArray} />
      <TodoMany todoArray={doneArray} />
      <Divider />
    </>
  )
}

export default TodoSection
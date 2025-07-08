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

  const isUpdatingArray = todoArray.map((todo) => updatingTodo ? todo.id === updatingTodo.id : false)
  if (updatingTodo) {
  }
  return (
    <div className="todo-many">
      {/* <Divider /> */}
      {todoArray.map((todo, index) => <TodoBox key={todo.id} todo={todo} isUpdating={isUpdatingArray[index]} />)}
    </div>
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
    <div className='todo-section'>
      <TodoMany todoArray={notYetArray} />
      <TodoMany todoArray={doneArray} />
      <Divider isVertical={true} />
    </div>
  )
}

export default TodoSection
import Divider from './Divider'
import TodoBox from "./TodoBox"
import { useTodolistContext, useSearch } from "../hooks"
import { getRegExp } from "korean-regexp"

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
  if (!todoArray || todoArray.length === 0) { return <div className="todo-many"></div> }

  const { updatingTodo } = useTodolistContext()

  const isUpdatingArray = todoArray.map((todo) => updatingTodo ? todo.id === updatingTodo.id : false)

  return (
    <div className="todo-many">
      {todoArray.map((todo, index) => <TodoBox key={todo.id} todo={todo} isUpdating={isUpdatingArray[index]} />)}
    </div>
  )
}



const TodoSection = ({ todoJson }) => {
  if (!todoJson) { return <TodoSkeleton /> }

  const { searchText, searchTextDispatch } = useSearch()
  const regexp = getRegExp(searchText)
  const filteredArray = todoJson.filter((todo) => todo.what.match(regexp))
  // console.log("---- filtered array:", filteredArray.length, searchText)
  // console.log("---- search text:", searchText)

  const groupedOjbect = Object.groupBy(
    filteredArray,
    ({ isDone }) => isDone ? "done" : "notYet"
  )

  const doneArray = groupedOjbect["done"]
  const notYetArray = groupedOjbect["notYet"]

  return (
    <>
      <input className="search" type="text" onChange={(event) => searchTextDispatch({ type: "SET", text: event.target.value })} />
      <div className='todo-section'>
        <TodoMany todoArray={notYetArray} />
        <TodoMany todoArray={doneArray} />
        <Divider isVertical={true} />
      </div>
    </>
  )
}

export default TodoSection
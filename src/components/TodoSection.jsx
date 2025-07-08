import Divider from './Divider'
import TodoBox from "./TodoBox"
import { useTodolistContext, useSearch } from "../hooks"
import { getRegExp } from "korean-regexp"

const TodoSkeleton = () => {
  return (
    <>
      <input className="search" type="text" />
      <div className='todo-section'>
        <TodoMany todoArray={[]} />
        <TodoMany todoArray={[]} />
      </div>
    </>
  )
}

const TodoMany = ({ todoArray }) => {
  const { updatingTodo } = useTodolistContext()

  const unwarppedArray = todoArray ?? []

  const isUpdatingArray = unwarppedArray.map((todo) => updatingTodo ? todo.id === updatingTodo.id : false)

  return (
    <div className="todo-many">
      {unwarppedArray.map((todo, index) => <TodoBox key={todo.id} data-index={index} todo={todo} isUpdating={isUpdatingArray[index]} />)}
    </div>
  )
}



const TodoSection = ({ todoJson }) => {
  if (!todoJson) { return <TodoSkeleton /> }

  const { searchText, searchTextDispatch } = useSearch()
  const regexp = getRegExp(searchText)
  const filteredArray = todoJson.filter((todo) => todo.what.match(regexp))

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
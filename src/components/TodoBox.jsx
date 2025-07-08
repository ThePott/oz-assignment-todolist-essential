import React from "react"
import { useTodolistContext } from "../hooks"

const TodoBox = React.memo(
  ({ todo, isUpdating }) => {
    const { setTodoJson, putTodo, deleteTodo, setUpdatingTodo } = useTodolistContext()

    const toggleIsDone = () => {
      setTodoJson((prev) => {
        const copiedArray = [...prev]
        const targetTodo = copiedArray.find((el) => el.id === todo.id)
        targetTodo.isDone = !targetTodo.isDone
        return copiedArray
      })

      putTodo(todo)
    }

    const handleDelete = () => {
      setTodoJson((prev) => {
        const filteredArray = prev.filter((el) => el.id !== todo.id)
        return filteredArray
      })

      deleteTodo(todo)
    }

    const toggleUpdate = () => {
      setUpdatingTodo(
        (prev) => {
          if (!prev) { return todo }
          if (prev.id === todo.id) { return null }
          return todo
        }
      )
    }

    return (
      <div className={`todo ${isUpdating ? "updating" : ""}`} onClick={toggleUpdate}>
        <input type='checkbox' onChange={toggleIsDone} checked={todo.isDone} />
        <p>{todo.what}</p>
        <button className="delete" onClick={handleDelete}>삭제</button>
      </div>
    )
  }
)

export default TodoBox
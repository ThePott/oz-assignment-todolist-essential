import React from "react"
import { useTodolistContext } from "../hooks"

const TodoBox = React.memo(
  ({ todo, isUpdating }) => {
    const { setTodoJson, updatingTodoDispatch } = useTodolistContext()

    const toggleIsDone = () => {
      setTodoJson((prev) => {
        const copiedArray = [...prev]
        const targetTodo = copiedArray.find((el) => el.id === todo.id)
        targetTodo.isDone = !targetTodo.isDone
        return copiedArray
      })
    }

    const handleDelete = () => {
      setTodoJson((prev) => {
        const filteredArray = prev.filter((el) => el.id !== todo.id)
        return filteredArray
      })
    }

    const toggleUpdate = () => {
      updatingTodoDispatch({type: "TOGGLE_UPDATE", todo})
    }

    return (
      <div className={`todo ${isUpdating ? "updating" : ""}`}>
        <input type='checkbox' onChange={toggleIsDone} checked={todo.isDone} />
        <p onClick={toggleUpdate}>{todo.what}</p>
        <button className="delete" onClick={handleDelete}>삭제</button>
      </div>
    )
  }
)

export default TodoBox
import React from "react"
import { useTodolistContext } from "../hooks"

const TodoBox = React.memo(
  ({ todo, isUpdating }) => {
    const { todoApiDispatch, updatingTodoDispatch } = useTodolistContext()

    const toggleIsDone = () => {
      todoApiDispatch({ type: "TOGGLE_IS_DONE", todo})
    }

    const handleDelete = () => {
      todoApiDispatch({type: "DELETE", todo})
    }

    const toggleUpdate = () => {
      updatingTodoDispatch({ type: "TOGGLE_UPDATE", todo })
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
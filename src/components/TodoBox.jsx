import React, { useRef, useState } from "react"
import { useTodolistContext } from "../hooks"

const TodoBox = React.memo(
  ({ todo, isUpdating }) => {
    const { todoApiDispatch, updatingTodoDispatch } = useTodolistContext()
    const [startY, setStartY] = useState(null)

    const toggleIsDone = () => {
      todoApiDispatch({ type: "TOGGLE_IS_DONE", todo })
    }

    const handleDelete = () => {
      todoApiDispatch({ type: "DELETE", todo })
    }

    const toggleUpdate = () => {
      updatingTodoDispatch({ type: "TOGGLE_UPDATE", todo })
    }

    const handleDragStart = (event) => {
      setStartY(event.clientY)
    }

    const handleDragEnd = (event) => {
      const endY = event.clientY
      const diffY = endY - startY
      todoApiDispatch({ type: "REORDER", todo, diffY })
    }

    return (
      <div className={`todo ${isUpdating ? "updating" : ""}`}

        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <input type='checkbox' onChange={toggleIsDone} checked={todo.isDone} />
        <p onClick={toggleUpdate}>{todo.what}</p>
        <button className="delete" onClick={handleDelete}>삭제</button>
      </div>
    )
  }
)

export default TodoBox
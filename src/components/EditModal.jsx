import { useRef } from 'react'
import { useTodolistContext } from "../hooks"

const EditModal = () => {
  const { updatingTodo, todoApiDispatch, updatingTodoDispatch } = useTodolistContext()
  const inputRef = useRef(null)



  if (inputRef && inputRef.current) {
    inputRef.current.value = updatingTodo ? updatingTodo.what : ""
  } else {
    setTimeout(
      () => {inputRef.current.value = updatingTodo ? updatingTodo.what : ""},
      100
    )
  }
  
  // }
  // if (inputRef && inputRef.current) {
  //   inputRef.current.value = updatingTodo.what
  // }

  const submitChange = (event) => {
    if (event.key !== "Enter") { return }
    const copiedTodo = { ...updatingTodo }
    copiedTodo.what = inputRef.current.value
    todoApiDispatch({type: "UPDATE_WHAT", todo: copiedTodo})
    updatingTodoDispatch({type: "RESET"})
  }

  const cancelChange = (event) => {
    updatingTodoDispatch({type: "RESET"})
  }

  return (
    <div className='modal-background' onClick={cancelChange}>
      <input type="text" ref={inputRef} onKeyDown={submitChange} onClick={(event) => {event.stopPropagation()}} />
    </div>
  )
}

export default EditModal
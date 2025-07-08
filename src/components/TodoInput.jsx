import React, { useRef } from 'react'
import { useTodolistContext } from '../hooks'

const TodoInput = ({updatingTodo}) => {
  const { setTodoJson, postTodo } = useTodolistContext()
  const inputRef = useRef(null)

  if (updatingTodo) {
    inputRef.current.value = updatingTodo.what
  } else if (inputRef && inputRef.current) {
    inputRef.current.value = ""
  }

  const submitTodo = () => {
    if (!inputRef) { return }
    const todo = {
      id: Number(new Date()),
      what: inputRef.current.value,
      isDone: false
    }
    postTodo(todo)
    setTodoJson((prev) => [...prev, todo])
  }

  const buttonText = updatingTodo ? "수정" : "추가"

  return (
    <div className='todo-input-section'>
      <button onClick={() => {inputRef.current.value = "yaaas"}}>등록</button>
      <button onClick={() => console.log("---- cur val:", inputRef.current.value)}>ref</button>
      <input ref={inputRef} />
      <button onClick={submitTodo}>{buttonText}</button>
    </div>
  )
}

export default TodoInput
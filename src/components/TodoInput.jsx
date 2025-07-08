import React, { useRef } from 'react'
import { useTodolistContext } from '../hooks'

const TodoInput = () => {
  const { setTodoJson, postTodo } = useTodolistContext()
  const inputRef = useRef(null)

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

  return (
    <div className='todo-input-section'>
      <input ref={inputRef} />
      <button onClick={submitTodo}>버튼</button>
    </div>
  )
}

export default TodoInput
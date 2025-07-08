import { useRef } from 'react'
import { useTodolistContext } from '../hooks'

const TodoInput = ({ updatingTodo }) => {
  const { setTodoJson, postTodo, putTodo, setUpdatingTodo } = useTodolistContext()
  const inputRef = useRef(null)

  if (updatingTodo) {
    console.log("--- fill in what to do ")
    inputRef.current.value = updatingTodo.what
  } else if (inputRef && inputRef.current) {
    inputRef.current.value = ""
  }

  const submitTodo = () => {
    if (!inputRef || !inputRef.current) { return }

    const newWhat = inputRef.current.value

    if (updatingTodo) {
      const copiedTodo = { ...updatingTodo }
      copiedTodo.what = newWhat
      putTodo(copiedTodo)

      setTodoJson((prev) => {
        const copiedArray = [...prev]
        const todo = copiedArray.find((el) => el.id === updatingTodo.id)
        if (!todo) { return prev }
        todo.what = newWhat
        return copiedArray
      })

      setUpdatingTodo(null)
    } else {
      const todo = {
        id: Number(new Date()),
        what: newWhat,
        isDone: false
      }
      postTodo(todo)
      setTodoJson((prev) => [...prev, todo])
    }

    console.log("---- sumbmitting done. now clear input")
    // inputRef.current.value = "으랏찻차"
    inputRef.current.value = "yaaas"
  }


  const buttonText = updatingTodo ? "수정" : "추가"

  return (
    <div className='todo-input-section'>
      <button onClick={() => { inputRef.current.value = "yaaas" }}>등록</button>
      <button onClick={() => console.log("---- cur val:", inputRef.current.value)}>ref</button>
      <input ref={inputRef} />
      <button onClick={submitTodo}>{buttonText}</button>
    </div>
  )
}

export default TodoInput
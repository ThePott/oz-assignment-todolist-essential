import { useRef } from 'react'
import { useTodolistContext } from '../hooks'

const TodoInput = ({ updatingTodo }) => {
  const { setTodoJson, setUpdatingTodo } = useTodolistContext()
  const inputRef = useRef(null)

  // 인풋의 초깃값 설정
  if (updatingTodo) {
    inputRef.current.value = updatingTodo.what
  } else if (inputRef && inputRef.current) {
    inputRef.current.value = ""
  }


  const submitTodo = () => {
    if (!inputRef || !inputRef.current) { return }

    const newWhat = inputRef.current.value

    if (updatingTodo) {

      setTodoJson((prev) => {
        const copiedArray = [...prev]
        const todo = copiedArray.find((el) => el.id === updatingTodo.id)
        if (!todo) { return prev }
        todo.what = newWhat
        return copiedArray
      })

      updatingTodoDispatch({type: "RESET"})
    } else {
      setTodoJson((prev) => [...prev, todo])
    }

    inputRef.current.value = ""
  }


  const buttonText = updatingTodo ? "수정" : "추가"

  return (
    <div className='todo-input-section'>
      <input ref={inputRef} />
      <button onClick={submitTodo}>{buttonText}</button>
    </div>
  )
}

export default TodoInput
import { useRef } from 'react'
import { useTodolistContext } from '../hooks'

const TodoInput = ({ updatingTodo }) => {
  // const { setTodoJson } = useTodolistContext() // <---- 둘 다 지워야
  const { updatingTodoDispatch, todoApiDispatch } = useTodolistContext()
  const inputRef = useRef(null)

  // 인풋의 초깃값 설정
  if (updatingTodo) {
    inputRef.current.value = updatingTodo.what
  } else if (inputRef && inputRef.current) {
    inputRef.current.value = ""
  }


  const submitTodo = () => {
    if (!inputRef || !inputRef.current) { return }

    const what = inputRef.current.value

    if (updatingTodo) {

      const copiedTodo = { ...updatingTodo }
      copiedTodo.what = what
      todoApiDispatch({ type: "UPDATE", todo: updatingTodo })
      updatingTodoDispatch({ type: "RESET" })

    } else {

      todoApiDispatch({type: "POST", what})
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
import { useTodolistContext } from "../hooks"

const TodoBox = ({todo}) => {
  const {setTodoJson, putTodo, deleteTodo} = useTodolistContext()

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

  return (
    <div className='todo'>
      <input type='checkbox' onChange={toggleIsDone} checked={todo.isDone} />
      <p>{todo.what}</p>
      <button className="delete" onClick={handleDelete}>삭제</button>
    </div>
  )
}

export default TodoBox
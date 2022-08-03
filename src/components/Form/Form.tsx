import React, { useState, useRef, useEffect } from "react"

const Form = ({
  task,
  setTask,
  setTodoList,
  todoList,
  setFilterStatus,
}: IFormProps) => {
  const [error, setError] = useState<boolean>(false)

  const todoInput = useRef<HTMLInputElement>(null)

  // Task Text Setup
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTask(e.currentTarget.value)
  }

  // Add Task To The List
  const addTask = (): void => {
    let newID = Number((Math.random() * 1000).toFixed(2))
    if (task !== "") {
      const newTask = { taskName: task, isCompleted: false, id: newID }
      todoList.unshift(newTask)
      setTodoList([...todoList])
      setTask("")
      setFilterStatus("all")
    } else {
      showError()
    }
  }

  // Auto Focus
  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.focus()
    }
  }, [])

  // Empty Input Error
  const showError = (): void => {
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 1500)
  }

  return (
    <div className="flex h-12 w-full border-[1px] border-gray-500/25 rounded">
      <input
        type="text"
        ref={todoInput}
        placeholder={error ? "Cannot be empty" : "Type your to do's for today"}
        className={
          error
            ? "input-error"
            : "h-full w-full px-4 rounded-t-md rounded-b-md rounded-r-[0] text-paletteWhite focus: border-none outline-none placeholder:text-paletteWhite/70 bg-paletteDark"
        }
        value={task}
        onChange={handleChange}
      />
      <button
        data-testid="Add"
        className="flex justify-center items-center text-paletteWhite font-semibold px-1 border-l-[1px] border-gray-500/25  text-center text-sm w-32 hover:cursor-pointer hover:bg-paletteTeal rounded-r-md"
        onClick={addTask}
      >
        Add To Do
      </button>
    </div>
  )
}

export default Form

import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import Task from "../components/Task/Task"
import Filter from "../components/Filter/Filter"
import { motion } from "framer-motion"
import { listContainer } from "../animations/framerConfigs"

const Home: NextPage = () => {
  const todoInput = useRef<HTMLInputElement>(null)
  const [task, setTask] = useState<string>("")
  const [todoList, setTodoList] = useState<ITask[]>([
    { taskName: "Тестовое задание", isCompleted: true, id: 1 },
    { taskName: "Прекрасный Код", isCompleted: true, id: 2 },
    { taskName: "Покрытие тестами", isCompleted: true, id: 3 },
  ])

  const [error, setError] = useState<boolean>(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filteredTodos, setFilteredTodos] = useState<ITask[]>([])

  // Choose What Task To Complete
  const completeTask = (taskNumber: number): void => {
    setTodoList(
      todoList.map((task: ITask) => {
        if (task.id === taskNumber) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          }
        }
        return task
      })
    )
  }

  // Local Storage Setup
  // Сейчас в нем нет особого смысла, т.к каждый раз устанавливаю исходный To Do List
  const saveToLocalStorage = (): void => {
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify(todoList))
    } else {
      localStorage.setItem("todoList", JSON.stringify([]))
    }
  }

  // Add Task To The List
  const addTask = (): void => {
    let newID = Number((Math.random() * 1000).toFixed(2))
    if (task !== "") {
      const newTask = { taskName: task, isCompleted: false, id: newID }
      setTodoList([...todoList, newTask])
      setTask("")
    } else {
      showError()
    }
  }

  // Empty Input Error
  const showError = (): void => {
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 1500)
  }

  // Filter Handler
  const filterHandler = (): void => {
    switch (filterStatus) {
      case "completed":
        setFilteredTodos(todoList.filter((task) => task.isCompleted))
        break
      case "active":
        setFilteredTodos(todoList.filter((task) => !task.isCompleted))
        break
      case "all":
        setFilteredTodos(todoList)
        break
    }
  }

  // Update Filtered List
  useEffect(() => {
    filterHandler()
    saveToLocalStorage()
  }, [todoList, filterStatus])

  // Auto Focus
  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.focus()
    }
  }, [])

  // Task Text Setup
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTask(e.currentTarget.value)
  }

  return (
    <>
      <Head>
        <title>To Do App</title>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-start h-screen p-4 ">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-thin text-pink-300/50 ">
          todos
        </h1>

        <div className="flex flex-col w-full min-w-[345px] gap-6 lg:w-[80%] xl:max-w-[800px] shadow-lg p-4 border-[1px] border-gray-500/10">
          {/* Input */}
          <div className="flex h-12 w-full border-[1px] border-gray-500/25 rounded">
            <input
              type="text"
              ref={todoInput}
              placeholder={error ? "Cannot be empty" : "Type your to do"}
              className={
                error
                  ? "input-error"
                  : "h-full w-full px-4 rounded focus: border-none outline-none"
              }
              value={task}
              onChange={handleChange}
            />
            <button
              data-testid="Add"
              className="flex justify-center items-center text-gray-600 px-1 border-l-[1px] border-gray-500/25  text-center text-sm w-32 hover:cursor-pointer hover:bg-pink-300/40"
              onClick={addTask}
            >
              Add To Do
            </button>
          </div>

          {/* Todo List */}

          <motion.div className="w-full flex flex-col justify-center items-start gap-3 text-center">
            {filteredTodos.map((task: ITask) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  isCompleted={task.isCompleted}
                  id={task.id}
                  completeTask={completeTask}
                />
              )
            })}
          </motion.div>

          {/* Filters */}
          <Filter
            todoList={todoList}
            setTodoList={setTodoList}
            setStatus={setFilterStatus}
            filteredTodos={filteredTodos}
            currentStatus={filterStatus}
          />
        </div>
      </main>
    </>
  )
}

export default Home

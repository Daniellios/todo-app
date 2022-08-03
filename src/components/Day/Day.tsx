import React from "react"
import { useEffect, useRef, useState } from "react"
import DayTitle from "../DayTitle/DayTitle"
import Filter from "../Filter/Filter"
import Form from "../Form/Form"
import TaskList from "../TaskList/TaskList"
import { motion, Reorder } from "framer-motion"

const Day = ({ title }: IDayProps) => {
  const [task, setTask] = useState<string>("")
  const [todoList, setTodoList] = useState<ITask[]>([
    { taskName: "Проснуться", isCompleted: true, id: 1 },
    { taskName: "Умыться", isCompleted: true, id: 2 },
    { taskName: ":)", isCompleted: true, id: 3 },
  ])

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

  // DeleteTask
  const deleteTask = (taskNumber: number): void => {
    console.log("DELETE")
    setTodoList(todoList.filter((task: ITask) => task.id !== taskNumber))
  }

  // Local Storage Setup
  const saveToLocalStorage = (): void => {
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify(todoList))
    } else {
      const storageList = JSON.parse(localStorage.getItem("todoList") || "{}")
    }
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
    // saveToLocalStorage()
  }, [todoList, filterStatus])

  return (
    <motion.div className="flex flex-col w-full h-max gap-6 shadow-lg p-4  bg-paletteDarkGray rounded">
      {/* Header */}
      <DayTitle title={title} />

      {/* Input */}
      <Form
        task={task}
        setTask={setTask}
        setTodoList={setTodoList}
        todoList={todoList}
        setFilterStatus={setFilterStatus}
      />
      {/* Todo List */}
      <TaskList
        filteredTodos={filteredTodos}
        completeTask={completeTask}
        originalTodos={todoList}
        deleteTask={deleteTask}
      />

      {/* Filters */}
      <Filter
        todoList={todoList}
        setTodoList={setTodoList}
        setStatus={setFilterStatus}
        filteredTodos={filteredTodos}
        currentStatus={filterStatus}
      />
    </motion.div>
  )
}

export default Day

import React from "react"
import { useEffect, useRef, useState } from "react"
import DayTitle from "../DayTitle/DayTitle"
import Filter from "../Filter/Filter"
import Form from "../Form/Form"
import TaskList from "../TaskList/TaskList"

const Day = ({ day, month }: IDayProps) => {
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

  // Local Storage Setup
  // Сейчас в нем нет особого смысла, т.к каждый раз устанавливаю исходный To Do List
  const saveToLocalStorage = (): void => {
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify(todoList))
    } else {
      localStorage.setItem("todoList", JSON.stringify([]))
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
    saveToLocalStorage()
  }, [todoList, filterStatus])

  return (
    <div className="flex flex-col w-full h-max gap-6 shadow-lg p-4  bg-paletteDarkGray rounded">
      {/* Header */}
      <DayTitle day={day} month={month} />

      {/* Input */}
      <Form
        task={task}
        setTask={setTask}
        setTodoList={setTodoList}
        todoList={todoList}
      />
      {/* Todo List */}
      <TaskList filteredTodos={filteredTodos} completeTask={completeTask} />

      {/* Filters */}
      <Filter
        todoList={todoList}
        setTodoList={setTodoList}
        setStatus={setFilterStatus}
        filteredTodos={filteredTodos}
        currentStatus={filterStatus}
      />
    </div>
  )
}

export default Day

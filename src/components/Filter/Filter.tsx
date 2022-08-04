import React from "react"
import { motion } from "framer-motion"

const Filter = ({
  todoList,
  setTodoList,
  setStatus,
  currentStatus,
}: IFilterProps) => {
  //Tasks Left Counter
  const tasksLeft = (): string => {
    let msg = ""
    if (todoList) {
      let completedCount: ITask[] = todoList.filter((task) => !task.isCompleted)

      if (completedCount.length === 1) {
        msg = "1 item left"
        return msg
      } else if (completedCount.length > 1) {
        msg = `${completedCount.length} items left`
        return msg
      } else {
        msg = "Nothing to do :)"
        return msg
      }
    }
    return msg
  }

  const filterAll = (): void => {
    setStatus("all")
  }

  const filterActive = (): void => {
    setStatus("active")
  }

  const filterCompleted = (): void => {
    setStatus("completed")
  }

  const clearCompleted = (): void => {
    setTodoList(todoList.filter((task: ITask) => !task.isCompleted))
  }

  return (
    <div className="w-full flex justify-between gap-4 items-center sm:flex-row">
      <span
        data-testid="items-counter"
        className="order-1 text-center hidden sm:flex md:order-none md:text-left  md:text-lg text-paletteWhite  md:w-[130px] "
      >
        {tasksLeft()}
      </span>
      <div className="flex gap-1 md:gap-4 order-2  md:order-none">
        <button
          onClick={filterAll}
          className={
            currentStatus === "all" ? "filter-button-active" : "filter-button"
          }
        >
          All
        </button>
        <button
          onClick={filterActive}
          className={
            currentStatus === "active"
              ? "filter-button-active"
              : "filter-button"
          }
        >
          Active
        </button>
        <button
          onClick={filterCompleted}
          className={
            currentStatus === "completed"
              ? "filter-button-active"
              : "filter-button"
          }
        >
          Completed
        </button>
      </div>
      <button
        onClick={clearCompleted}
        className="filter-button order-3  md:order-none"
      >
        Clear Completed
      </button>
    </div>
  )
}

export default Filter

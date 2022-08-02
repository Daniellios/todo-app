import React from "react"

const Filter = ({
  todoList,
  setTodoList,
  setStatus,
  filteredTodos,
  currentStatus,
}: IFilterProps) => {
  //Tasks Left Counter
  //По картинке примера немного непонятно как отображается количество оставшихся Todo, поэтому всегда считается количество именно незавершенных заданий
  // независимо от текущего фильтра
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
    <div className="w-full flex justify-between  items-center">
      <span
        data-testid="items-counter"
        className="text-xs sm:text-lg text-paletteWhite w-[130px]"
      >
        {tasksLeft()}
      </span>
      <div className="flex gap-1 md:gap-4">
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

      <button onClick={clearCompleted} className="filter-button">
        Clear Completed
      </button>
    </div>
  )
}

export default Filter

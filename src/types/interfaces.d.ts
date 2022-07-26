interface ITask {
  taskName?: string
  isCompleted: boolean
  id: number
}

interface ITaskProps {
  task: ITask.taskName
  isCompleted: ITask.isCompleted
  id: ITask.id
  completeTask(taskNumber: number): void
}

interface IFilterProps {
  todoList: ITask[]
  setTodoList: React.Dispatch<React.SetStateAction<ITask[]>>
  setStatus: React.Dispatch<React.SetStateAction<string>>
  filteredTodos: ITask[]
  currentStatus: string
}

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

interface ITaskListProps {
  filteredTodos: ITask[]
  completeTask(taskNumber: number): void
}

interface IFormProps {
  task: ITask.taskName
  setTask: React.Dispatch<React.SetStateAction<string>>
  todoList: ITask[]
  setTodoList: React.Dispatch<React.SetStateAction<ITask[]>>
}

interface IDayProps {
  day?: number
  month?: string
}

interface IDayTitleProps {
  day?: number
  month?: string
}

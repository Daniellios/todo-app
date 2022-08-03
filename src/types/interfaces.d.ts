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
  deleteTask(taskNumber: number): void
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
  deleteTask(taskNumber: number): void
  originalTodos: ITask[]
}

interface IFormProps {
  task: ITask.taskName
  setTask: React.Dispatch<React.SetStateAction<string>>
  todoList: ITask[]
  setTodoList: React.Dispatch<React.SetStateAction<ITask[]>>
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>
}

interface IDayProps {
  title: string
}

interface IDayTitleProps {
  title: string
}

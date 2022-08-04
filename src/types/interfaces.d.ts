interface ITask {
  taskName: string
  isCompleted: boolean
  id: string
}

interface ITaskProps {
  task: ITask.taskName
  isCompleted: ITask.isCompleted
  id: ITask.id
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
  originalTodos: ITask[]
}

interface IFormProps {
  todoList: ITask[]
  setTodoList: React.Dispatch<React.SetStateAction<ITask[]>>
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>
}

interface IListComponent {
  list: IListProps
}

interface IListProps {
  listID: string
  title: string
  todoList: ITask[]
}

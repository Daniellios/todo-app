interface ITask {
  taskName: string
  isCompleted: boolean
  id: string
}

interface ITaskProps {
  task: ITask.taskName
  isCompleted: ITask.isCompleted
  taskID: string
  listID: string
}

interface IFilterProps {
  todoList: ITask[]
}

interface ITaskListComponent {
  listID: string
  todos: ITask[]
}

interface IFormProps {
  list: IListProps
}

interface IListComponent {
  list: IListProps
}

interface IListProps {
  listID: string
  title: string
  todoList: ITask[]
  listCount?: number | string
}

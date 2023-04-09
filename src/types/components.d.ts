interface ITaskProps extends ITask {
  taskID: string;
  listID: string;
}

interface IFilterProps {
  todoList: ITask[];
}

interface ITaskListComponent {
  listID: string;
  todos: ITask[];
}

interface IFormProps {
  list: IBoardListProps;
}

interface IListComponent {
  list: IBoardListProps;
}

interface IBoardListProps extends IBoard {
  color?: string;
}

interface ITaskProps extends ITask {
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
  listID: string;
}

interface IListComponent {
  list: IBoardListProps;
}

interface IBoardListProps extends IBoard {
  color?: string;
}
interface IProject {
  id: string;
  projectName: string;
  projectBoards: IBoardListProps[];
}

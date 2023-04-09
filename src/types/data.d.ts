interface ITask {
  taskName: string;
  isCompleted: boolean;
  id: string;
}

interface IBoard {
  listID: string;
  title: string;
  todoList: ITask[];
  listCount?: number | string;
  filteredList: ITask[];
}

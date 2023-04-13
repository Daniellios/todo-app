interface ITask {
  id: string;
  taskName: string;
  isCompleted: boolean;
  dates?: ITaskDates;
}

interface ITaskDates {
  startDate?: Date | null;
  endDate?: Date | null;
}

interface IBoard {
  listID: string;
  title: string;
  todoList: ITask[];
  listCount?: number | string;
  filteredList: ITask[];
}

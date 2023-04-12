import { createSlice, PayloadAction, nanoid, current } from "@reduxjs/toolkit";
import { initialBoards } from "../contstants/initialData";
import tasksLeft from "../helpers/tasksLeft";
import { setAll, setActive, setCompleted } from "./fliterSlice";
import { RootState } from "./store";

export const dayListReducer = createSlice({
  name: "dayListReducer",
  initialState: initialBoards,
  reducers: {
    addBoard: {
      reducer(state, action: PayloadAction<IBoardListProps>) {
        state.push(action.payload);
      },
      prepare(boardName: string) {
        return {
          payload: {
            listID: nanoid(),
            title: boardName,
            todoList: [],
            filteredList: [],
          },
        };
      },
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      return state.filter(
        (list: IBoardListProps) => action.payload !== list.listID
      );
    },

    setListName: (state, action: PayloadAction<IBoardListProps>) => {
      return state.map((list: IBoardListProps) => {
        if (action.payload.listID === list.listID) {
          return {
            ...list,
            ...action.payload,
          };
        }
        return list;
      });
    },
    editListName: (state, action: PayloadAction<IBoardListProps>) => {
      return state.map((list: IBoardListProps) => {
        if (action.payload.listID === list.listID) {
          return {
            ...list,
            ...action.payload,
          };
        }
        return list;
      });
    },
    addTask: (state, action: PayloadAction<{ ID: string; task: string }>) => {
      state.map((list: IBoardListProps) => {
        if (list.listID === action.payload.ID) {
          const newTask = {
            id: "T" + nanoid(6),
            isCompleted: false,
            taskName: action.payload.task,
          };
          list.filteredList.unshift(newTask);
          list.todoList.unshift(newTask);
          list.listCount = tasksLeft(list.filteredList.length);
        }
        return list;
      });
    },
    editTask: (
      state,
      action: PayloadAction<{
        ID: string;
        taskID: string;
        updatedTaskName: string;
      }>
    ) => {
      state.map((list: IBoardListProps) => {
        if (list.listID === action.payload.ID) {
          let editedTask = list.todoList.find(
            (task: ITask) => task.id === action.payload.taskID
          );

          if (!editedTask) return;

          editedTask.taskName = action.payload.updatedTaskName;
        }
      });
    },
    deleteTask: (
      state,
      action: PayloadAction<{ ID: string; taskID: string }>
    ) => {
      // IMPROVE - pass whole todo list, no need to map into filter?
      state.map((list: IBoardListProps) => {
        if (list.listID === action.payload.ID) {
          list.todoList = list.todoList.filter(
            (task: ITask) => task.id !== action.payload.taskID
          );
          list.filteredList = list.todoList;
          list.listCount = tasksLeft(list.filteredList.length);
        }
      });
    },
    completeTask: (
      state,
      action: PayloadAction<{ ID: string; taskID: string }>
    ) => {
      state.map((list: IBoardListProps) => {
        if (list.listID === action.payload.ID) {
          list.todoList.filter((task: ITask) => {
            if (task.id === action.payload.taskID) {
              task.isCompleted = !task.isCompleted;
            }
          });
          list.filteredList = list.todoList;
        }
      });
    },
    clearCompleted: (state) => {
      state.map((list: IBoardListProps) => {
        list.todoList = list.todoList.filter(
          (task: ITask) => !task.isCompleted
        );
        list.filteredList = list.todoList;
        list.listCount = tasksLeft(list.filteredList.length);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAll, (state, action) => {
      state.map((list: IBoardListProps) => {
        list.filteredList = list.todoList;
      });
    });
    builder.addCase(setActive, (state, action) => {
      state.map((list: IBoardListProps) => {
        list.filteredList = list.todoList.filter(
          (task: ITask) => !task.isCompleted
        );
      });
    });
    builder.addCase(setCompleted, (state, action) => {
      state.map((list: IBoardListProps) => {
        list.filteredList = list.todoList.filter(
          (task: ITask) => task.isCompleted
        );
      });
    });
  },
});

export const selectAllBoards = (state: RootState) => state.boards;

export const {
  addBoard,
  deleteBoard,
  editListName,
  setListName,
  addTask,
  editTask,
  deleteTask,
  completeTask,
  clearCompleted,
} = dayListReducer.actions;

export default dayListReducer.reducer;

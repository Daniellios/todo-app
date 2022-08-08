import { createSlice, PayloadAction, nanoid, current } from "@reduxjs/toolkit"
import tasksLeft from "../helpers/tasksLeft"
import { setAll, setActive, setCompleted } from "./fliterSlice"
import { RootState } from "./store"

const initialState: IListProps[] = [
  {
    listID: nanoid(),
    title: "",
    todoList: [],
    listCount: "Nothing to do :)",
    filteredList: [],
  },
]

export const dayListReducer = createSlice({
  name: "dayListReducer",
  initialState,
  reducers: {
    addList: {
      reducer(state, action: PayloadAction<IListProps>) {
        state.push(action.payload)
      },
      prepare() {
        return {
          payload: {
            listID: nanoid(),
            title: "",
            todoList: [],
            filteredList: [],
          },
        }
      },
    },
    deleteList: (state, action: PayloadAction<string>) => {
      return state.filter((list: IListProps) => action.payload !== list.listID)
    },
    setListName: (state, action: PayloadAction<IListProps>) => {
      return state.map((list: IListProps) => {
        if (action.payload.listID === list.listID) {
          return {
            ...list,
            ...action.payload,
          }
        }
        return list
      })
    },
    addTask: (state, action: PayloadAction<{ ID: string; task: string }>) => {
      state.map((list: IListProps) => {
        if (list.listID === action.payload.ID) {
          const newTask = {
            id: "T" + nanoid(6),
            isCompleted: false,
            taskName: action.payload.task,
          }
          list.filteredList.unshift(newTask)
          list.todoList.unshift(newTask)
          list.listCount = tasksLeft(list.filteredList.length)
        }
        return list
      })
    },
    deleteTask: (
      state,
      action: PayloadAction<{ ID: string; taskID: string }>
    ) => {
      // IMPROVE - pass whole todo list, no need to map into filter?
      state.map((list: IListProps) => {
        if (list.listID === action.payload.ID) {
          list.todoList = list.todoList.filter(
            (task: ITask) => task.id !== action.payload.taskID
          )
          list.filteredList = list.todoList
          list.listCount = tasksLeft(list.filteredList.length)
        }
      })
    },
    completeTask: (
      state,
      action: PayloadAction<{ ID: string; taskID: string }>
    ) => {
      state.map((list: IListProps) => {
        if (list.listID === action.payload.ID) {
          list.todoList.filter((task: ITask) => {
            if (task.id === action.payload.taskID) {
              task.isCompleted = !task.isCompleted
            }
          })
          list.filteredList = list.todoList
        }
      })
    },
    clearCompleted: (state) => {
      state.map((list: IListProps) => {
        list.todoList = list.todoList.filter((task: ITask) => !task.isCompleted)
        list.filteredList = list.todoList
        list.listCount = tasksLeft(list.filteredList.length)
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAll, (state, action) => {
      state.map((list: IListProps) => {
        list.filteredList = list.todoList
      })
    })
    builder.addCase(setActive, (state, action) => {
      state.map((list: IListProps) => {
        list.filteredList = list.todoList.filter(
          (task: ITask) => !task.isCompleted
        )
      })
    })
    builder.addCase(setCompleted, (state, action) => {
      state.map((list: IListProps) => {
        list.filteredList = list.todoList.filter(
          (task: ITask) => task.isCompleted
        )
      })
    })
  },
})

export const selectAllLists = (state: RootState) => state.list

// Action creators ares generated for each case reducer function
export const {
  addList,
  deleteList,
  setListName,
  addTask,
  deleteTask,
  completeTask,
  clearCompleted,
} = dayListReducer.actions

export default dayListReducer.reducer

// addTask: {
//   reducer(state, action: PayloadAction<{ ID: string; task: ITask }>) {
//     state.map((list: IListProps) => {
//       if (list.listID === action.payload.ID) {
//         list.todoList.unshift(action.payload.task)
//       }
//     })
//   },
//   prepare(task, ID) {
//     return {
//       payload: {
//         ...task,
//       },
//     }
//   },
// },

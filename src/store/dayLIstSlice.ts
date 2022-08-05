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

          list.todoList.unshift(newTask)
          list.listCount = tasksLeft(list.todoList.length)
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
          list.listCount = tasksLeft(list.todoList.length)
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
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAll, (state, action) => {
      const allList = { ...state }
      state = allList
    })
    builder.addCase(setActive, (state, action) => {
      state.filter((list: IListProps) => {
        list.todoList = list.todoList.filter((task: ITask) => !task.isCompleted)
      })
    })
    builder.addCase(setCompleted, (state, action) => {
      state.filter((list: IListProps) => {
        const filteredList = list.todoList.filter(
          (task: ITask) => task.isCompleted
        )
        list.todoList = filteredList
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

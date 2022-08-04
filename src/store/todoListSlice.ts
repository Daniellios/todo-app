import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"

const initialState: ITask[] = [
  {
    id: "T" + nanoid(5),
    isCompleted: false,
    taskName: "",
  },
]

export const todoListReducer = createSlice({
  name: "todoListReducer",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<ITask>) {
        state.unshift(action.payload)
      },
      prepare(taskName) {
        return {
          payload: {
            id: nanoid(),
            isCompleted: false,
            taskName,
          },
        }
      },
    },
    completeTask: (state, action: PayloadAction<number>) => {},
    deleteTask: (state, action: PayloadAction<ITaskProps[]>) => {},
  },
})

// Action creators are generated for each case reducer function
export const { addTask, completeTask, deleteTask } = todoListReducer.actions

export default todoListReducer.reducer

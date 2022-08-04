import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState: IListProps[] = [
  {
    listID: nanoid(),
    title: "",
    todoList: [],
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
      state = state.filter((list: IListProps) => action.payload !== list.listID)
    },
    setListName: (state, action: PayloadAction<IListProps>) => {
      state = state.map((list: IListProps) => {
        if (action.payload.listID === list.listID) {
          return {
            ...list,
            ...action.payload,
          }
        }
        return list
      })
    },
  },
})

export const selectAllLists = (state: RootState) => state.rootReducer.list

// Action creators ares generated for each case reducer function
export const { addList, deleteList, setListName } = dayListReducer.actions

export default dayListReducer.reducer

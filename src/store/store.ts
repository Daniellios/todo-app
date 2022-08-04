import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dayListReducer from "./dayLIstSlice"
import todoListReducer from "./todoListSlice"

const rootReducer = combineReducers({
  list: dayListReducer,
  todos: todoListReducer,
})

export const store = configureStore({
  reducer: {
    rootReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

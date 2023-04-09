import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dayListReducer from "./dayListSlice";
import filterReducer from "./fliterSlice";

// export const rootReducer = combineReducers({
//   list: dayListReducer,
//   todos: todoListReducer,
// })

export const store = configureStore({
  reducer: {
    list: dayListReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

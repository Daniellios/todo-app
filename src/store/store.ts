"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectsListReducer from "./boardsSlice";
import filterReducer from "./fliterSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    projects: projectsListReducer,
    filter: filterReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

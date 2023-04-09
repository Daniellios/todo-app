import { nanoid } from "@reduxjs/toolkit";

export const initialBoards: IBoardListProps[] = [
  {
    listID: nanoid(),
    title: "To-Do",
    todoList: [],
    listCount: 0,
    filteredList: [],
    color: "#2563eb",
  },
  {
    listID: nanoid(),
    title: "In Progress ",
    todoList: [],
    listCount: 0,
    filteredList: [],
    color: "#facc15e0",
  },

  {
    listID: nanoid(),
    title: "Done",
    todoList: [],
    listCount: 0,
    filteredList: [],
    color: "#00ADB5",
  },
];

import { nanoid } from "@reduxjs/toolkit";

export const initialProject: IProject = {
  id: "P" + nanoid(),
  projectName: "Project #1",
  projectBoards: [
    {
      listID: nanoid(),
      title: "To-Do",
      todoList: [],
      listCount: 0,
      filteredList: [],
      color: "#2563ebb3",
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
      color: "#16a34a",
    },
  ],
};

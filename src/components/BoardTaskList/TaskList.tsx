import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Task from "../Task/Task";

const BoardTaskList = ({ todos, listID }: ITaskListComponent) => {
  return (
    <motion.div className="w-full flex flex-col justify-center items-center gap-3 text-center">
      <AnimatePresence>
        {todos.map((task: ITask) => {
          return (
            <Task
              key={task.id}
              task={task.taskName}
              isCompleted={task.isCompleted}
              listID={listID}
              taskID={task.id}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default BoardTaskList;

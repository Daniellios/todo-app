import React, { useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { taskAnimation } from "../../animations/framerConfigs";
import { deleteTask, completeTask } from "../../store/dayListSlice";

const Task = ({ task, isCompleted, taskID, listID }: ITaskProps) => {
  const dispatch = useDispatch();

  const [isDone, setIsDone] = useState(isCompleted);

  const handleDone = (): void => {
    dispatch(completeTask({ ID: listID, taskID: taskID }));
    setIsDone(!isDone);
  };

  return (
    <motion.div
      variants={taskAnimation}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="w-full  border-b-[1px] border-gray-500/25 "
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2 h-full bg-paletteDarkGray rounded">
        <h2 className="text-lg text-paletteWhite  break-words text-start transition capitalize font-semibold">
          {task}
        </h2>

        <div className="flex gap-4 justify-start items-center">
          <AiFillEdit className="text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer transition"></AiFillEdit>

          <BsFillTrashFill
            onClick={() => dispatch(deleteTask({ ID: listID, taskID: taskID }))}
            className="text-paletteWhite flex ml-auto hover:text-paletteRed cursor-pointer transition"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Task;

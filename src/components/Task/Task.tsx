import React, { useRef, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { taskAnimation } from "../../animations/framerConfigs";
import { deleteTask, completeTask, editTask } from "../../store/dayListSlice";
import { IoMdAdd } from "react-icons/io";

const Task = ({ taskName, isCompleted, id, listID }: ITaskProps) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const todoInput = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<boolean>(false);

  const [isDone, setIsDone] = useState(isCompleted);

  const [currenTaskName, setCurrentTaskName] = useState<string>(taskName);

  const handleDone = (): void => {
    dispatch(completeTask({ ID: listID, taskID: id }));
    setIsDone(!isDone);
  };

  const toggleEdit = (): void => {
    setIsEditing(true);
  };

  const applyEditChanges = (): void => {
    dispatch(
      editTask({ ID: listID, taskID: id, updatedTaskName: currenTaskName })
    );
    setIsEditing(false);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setCurrentTaskName(e.currentTarget.value);
  };

  return (
    <motion.div
      variants={taskAnimation}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="w-full  border-b-[1px] border-gray-500/25 "
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2  h-full min-h-[64px] bg-paletteDarkGray rounded">
        <h2 className="text-lg text-paletteWhite break-words text-start transition capitalize font-semibold">
          {!isEditing && currenTaskName}
        </h2>

        {isEditing && (
          <input
            ref={todoInput}
            value={currenTaskName}
            onChange={handleChange}
            className={
              error
                ? "input-error"
                : "h-8 w-full px-4 border-[1px] rounded-t-md rounded-b-md rounded-r-[0] text-paletteWhite focus: border-none outline-none placeholder:text-paletteWhite/70 bg-paletteDark"
            }
          ></input>
        )}

        <div className="flex gap-4 justify-start items-center">
          {isEditing && (
            <IoMdAdd
              size={"1.3rem"}
              onClick={() => applyEditChanges()}
              className=" text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer transition"
            ></IoMdAdd>
          )}

          <AiFillEdit
            onClick={toggleEdit}
            className="text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer transition"
          ></AiFillEdit>

          <BsFillTrashFill
            onClick={() => dispatch(deleteTask({ ID: listID, taskID: id }))}
            className="text-paletteWhite flex ml-auto hover:text-paletteRed cursor-pointer transition"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Task;

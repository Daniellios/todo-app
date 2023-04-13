import React, { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { taskAnimation } from "../../animations/framerConfigs";
import { deleteTask, completeTask, editTask } from "../../store/boardsSlice";
import { IoMdAdd } from "react-icons/io";
import dayjs from "dayjs";

const Task = ({ taskName, isCompleted, id, listID, dates }: ITaskProps) => {
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
      className="w-full  border-gray-500/25"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2  h-full min-h-[64px] bg-paletteDarkGray rounded">
        <div className="text-sm text-paletteWhite break-words text-start transition  font-semibold">
          <h2 className="text-lg">{!isEditing && currenTaskName}</h2>

          {dates?.startDate ? (
            <h2>
              Complete until: {dayjs(dates?.startDate).format("DD/MM/YYYY")}
            </h2>
          ) : (
            <span>Date not set</span>
          )}
        </div>

        {isEditing && (
          <input
            ref={todoInput}
            value={currenTaskName}
            onChange={handleChange}
            placeholder="Task name"
            className={
              error
                ? "input-error"
                : "h-8 w-full px-4 focus:border-none outline-none  bg-paletteDark"
            }
          ></input>
        )}

        <div className="flex gap-2 justify-start items-center">
          {isEditing && (
            <IoMdAdd
              size={"1.5rem"}
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

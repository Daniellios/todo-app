import React, { useRef, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
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

  const handleTaskDone = (): void => {
    dispatch(completeTask({ ID: listID, taskID: id }));
    setIsDone(!isDone);
  };

  const handleTaskDelete = (): void => {
    dispatch(deleteTask({ ID: listID, taskID: id }));
  };

  const toggleEdit = (): void => {
    setIsEditing(!isEditing);
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
      exit="exit"
      className="w-full  border-gray-500/25"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2  h-full min-h-[64px] bg-paletteDarkGray rounded relative">
        <div className="text-sm text-paletteWhite break-words text-start transition  font-semibold ">
          <h2 className="text-lg">{!isEditing && currenTaskName}</h2>

          {dates?.startDate ? (
            <h2>
              Complete until: {dayjs(dates?.startDate).format("DD/MM/YYYY")}
            </h2>
          ) : (
            <span>No date</span>
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
                : "h-8 w-3/4 px-4 focus:border-none outline-none  bg-paletteDark "
            }
          ></input>
        )}

        <div className="flex flex-col  justify-start items-end mr-6 transition  gap-2 ">
          {isEditing && (
            <IoMdAdd
              onClick={() => applyEditChanges()}
              className=" text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer text-lg "
            ></IoMdAdd>
          )}

          <AiFillEdit
            onClick={toggleEdit}
            className="text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer  text-lg"
          ></AiFillEdit>
        </div>

        <div className="h-full flex flex-col absolute  justify-between rounded-r  right-0  transition">
          <button
            onClick={handleTaskDone}
            className=" text-paletteWhite text-base  hover:bg-paletteTeal  rounded-tr h-full px-2  transition"
          >
            <AiOutlineCheck></AiOutlineCheck>
          </button>

          <button className=" text-paletteWhite text-base  hover:bg-paletteRed  rounded-br  h-full px-2  transition">
            <BsFillTrashFill onClick={handleTaskDelete} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Task;

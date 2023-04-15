import React, { useRef, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { taskAnimation } from "../../animations/framerConfigs";
import { deleteTask, completeTask, editTask } from "../../store/boardsSlice";
import { IoMdAdd } from "react-icons/io";
import dayjs from "dayjs";
import { ImCross } from "react-icons/im";

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
    if (currenTaskName === "") {
      showError();
    } else {
      dispatch(
        editTask({ ID: listID, taskID: id, updatedTaskName: currenTaskName })
      );
      setIsEditing(false);
    }
  };

  const showError = (): void => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
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
      className="w-full  border-gray-500/25 relative"
    >
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%", transition: { ease: "linear" } }}
            exit={{ width: 0, transition: { ease: "linear", delay: 0.1 } }}
            className="w-full bg-green-600 h-full absolute opacity-90 z-10 rounded flex items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { ease: "linear", delay: 0.3 },
              }}
              exit={{ opacity: 0, transition: { ease: "linear" } }}
              className="text-paletteWhite font-bold text-3xl"
            >
              DONE 🥳
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

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
            className={` h-8 w-3/4 px-4 focus:border-none outline-none bg-paletteDark  ${
              error
                ? `border border-paletteRed  placeholder:text-paletteRed`
                : ""
            }`}
          ></input>
        )}

        <div className="flex flex-col  justify-start items-end mr-6 transition  gap-2 ">
          {isEditing && (
            <IoMdAdd
              onClick={applyEditChanges}
              className=" text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer text-lg "
            ></IoMdAdd>
          )}

          <AiFillEdit
            onClick={toggleEdit}
            className="text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer  text-lg"
          ></AiFillEdit>
        </div>

        <div className="h-full flex flex-col absolute  justify-between rounded-r  right-0  transition z-20 ">
          <button
            onClick={handleTaskDone}
            className={` text-paletteWhite text-base rounded-tr h-full px-2  transition ${
              isDone ? "hover:text-paletteRed" : " hover:bg-paletteTeal"
            }`}
          >
            {isDone ? <ImCross></ImCross> : <AiOutlineCheck></AiOutlineCheck>}
          </button>

          <button
            onClick={handleTaskDelete}
            className={` text-paletteWhite text-base  rounded-br h-full px-2 transition ${
              isDone ? "hover:text-paletteRed" : " hover:bg-paletteRed "
            }`}
          >
            <BsFillTrashFill />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Task;

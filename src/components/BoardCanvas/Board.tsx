"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import TaskForm from "../Forms/TaskForm";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import {
  titleInputAnimiation,
  listAnimation,
  titleTextAnimation,
} from "../../animations/framerConfigs";
import BoardTaskList from "../BoardTaskList/TaskList";
import { deleteBoard, editListName } from "../../store/boardsSlice";

const BoardTaskCard: React.FC<IListComponent> = ({ list }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const titleInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>("");

  const [boardTitleName, setBoardTitleName] = useState<string | undefined>(
    list.title
  );

  const toggleEdit = (): void => {
    setIsEditing(true);
  };

  const showError = (): void => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  const applyEditChanges = (): void => {
    if (!title) showError();
    else {
      dispatch(
        editListName({
          ...list,
          title,
        })
      );

      setBoardTitleName(title);
      setIsEditing(false);
    }
  };

  const onTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const handleDeleteTaskCard = () => {
    dispatch(deleteBoard(list.listID));
  };

  useEffect(() => {
    if (null !== titleInput.current) {
      titleInput.current.focus();
    }
  }, []);

  return (
    <motion.div
      key={"board_task_card"}
      variants={listAnimation}
      initial="hidden"
      animate="visible"
      layout
      exit={"exit"}
      className="flex flex-col w-full h-max  shadow-lg bg-transparent rounded p-1"
    >
      {/* Header */}
      <div
        className={`w-full flex justify-start tiny:justify-center  bg-paletteDarkGray  text-paletteWhite relative p-2 sm:p-4 rounded`}
      >
        <AnimatePresence>
          {!isEditing && (
            <motion.h2
              variants={titleTextAnimation}
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
              className="text-xl sm:text-3xl uppercase "
            >
              {list.title}
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isEditing && (
            <motion.div
              key={"ssss"}
              variants={titleInputAnimiation}
              initial="hidden"
              animate="visible"
              exit={"exit"}
              className="flex justify-start tiny:justify-center items-center space-x-4 "
            >
              <input
                ref={titleInput}
                onChange={onTitleChange}
                value={title}
                type="text "
                placeholder={error ? "Incorrect board name" : `Name your board`}
                className={
                  error
                    ? "border-[1px]  border-paletteRed outline-none placeholder:text-paletteRed w-1/2 sm:w-full"
                    : "capitalize border-none w-1/2 sm:w-full"
                }
              />

              <motion.div
                key={"input_confirm"}
                whileHover={{ scale: 1.2 }}
                whileTap={
                  boardTitleName ? { scale: 0.7, opacity: 0 } : { rotate: 10 }
                }
                exit={{ opacity: 0 }}
                className="flex items-center justify-start"
              >
                <AiOutlineCheck
                  onClick={applyEditChanges}
                  size={"1.5rem"}
                  className="text-paletteWhite cursor-pointer hover:text-paletteTeal "
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 absolute top-2 right-4">
          {!isEditing && (
            <AiFillEdit
              onClick={toggleEdit}
              className=" text-paletteWhite flex ml-auto text-lg hover:text-paletteTeal cursor-pointer transition"
            ></AiFillEdit>
          )}

          <ImCross
            onClick={handleDeleteTaskCard}
            className=" text-paletteWhite hover:text-paletteRed text-sm  hover:rotate-90 cursor-pointer transition"
          />
        </div>
      </div>

      {boardTitleName && (
        <div className="flex flex-col gap-4 transition-all">
          <TaskForm listID={list.listID} />

          <BoardTaskList todos={list.filteredList} listID={list.listID} />
        </div>
      )}
    </motion.div>
  );
};

export default BoardTaskCard;

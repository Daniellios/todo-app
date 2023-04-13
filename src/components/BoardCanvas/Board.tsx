import React from "react";
import { useEffect, useRef, useState } from "react";
import Form from "../Form/Form";
import TaskList from "../BoardTaskList/TaskList";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import {
  titleInputAnimiation,
  listAnimation,
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
    console.log("TITL - ", title);

    if (!title) showError();
    else {
      dispatch(
        dispatch(
          editListName({
            ...list,
            title,
          })
        )
      );

      setBoardTitleName(title);
      setIsEditing(false);
    }
  };

  // const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
  //   setBoardTitleName(e.currentTarget.value);
  // };

  const onTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  // const confirmTitle = (): void => {
  //   if (title) {
  //     dispatch(
  //       setListName({
  //         ...list,
  //         title,
  //       })
  //     );
  //     setBoardTitleName(list.title);
  //   }
  // };

  const handleDeleteTaskCard = () => {
    dispatch(deleteBoard(list.listID));
  };

  // Update Filtered TaskCard
  useEffect(() => {
    if (null !== titleInput.current) {
      titleInput.current.focus();
    }
  }, []);

  return (
    <motion.div
      variants={listAnimation}
      initial="hidden"
      animate="visible"
      layout
      exit={{ size: 0, opacity: 0 }}
      className="flex flex-col w-full h-max gap-6 shadow-lg bg-transparent rounded"
    >
      {/* Header */}
      <div
        className={`w-full flex items-center justify-center bg-paletteDarkGray  text-paletteWhite relative p-4 rounded`}
        // style={{ background: list.color }}
      >
        {!isEditing && <h2 className="text-3xl uppercase">{list.title}</h2>}

        {isEditing && (
          <AnimatePresence>
            <motion.div
              variants={titleInputAnimiation}
              initial="hidden"
              animate="visible"
              className="flex justify-center items-center space-x-4"
            >
              <input
                ref={titleInput}
                onChange={onTitleChange}
                value={title}
                type="text "
                placeholder={
                  error ? "Incorrect board name" : ` Give a name to your board`
                }
                className={
                  error
                    ? "border-[1px]  border-paletteRed outline-none placeholder:text-paletteRed"
                    : "capitalize border-none"
                }
              />

              <motion.div
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
          </AnimatePresence>
        )}

        <div className="flex items-center gap-2 absolute top-2 right-4">
          {!isEditing && (
            <AiFillEdit
              size={"1.2rem"}
              onClick={toggleEdit}
              className=" text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer transition"
            ></AiFillEdit>
          )}

          <ImCross
            onClick={handleDeleteTaskCard}
            className=" text-paletteWhite hover:text-paletteRed hover:rotate-90 cursor-pointer transition"
          />
        </div>
      </div>

      {boardTitleName && (
        <div className="p-4 flex flex-col gap-4">
          <Form listID={list.listID} />

          <BoardTaskList todos={list.filteredList} listID={list.listID} />
        </div>
      )}
    </motion.div>
  );
};

export default BoardTaskCard;

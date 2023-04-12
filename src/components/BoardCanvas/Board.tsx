import React from "react";
import { useEffect, useRef, useState } from "react";
import Form from "../Form/Form";
import TaskList from "../BoardTaskList/TaskList";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { deleteList, setListName } from "../../store/dayListSlice";

import { AiOutlineCheck } from "react-icons/ai";
import {
  titleInputAnimiation,
  listAnimation,
} from "../../animations/framerConfigs";
import BoardTaskList from "../BoardTaskList/TaskList";

const BoardTaskCard: React.FC<IListComponent> = ({ list }) => {
  const dispatch = useDispatch();

  const titleInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>("");

  const [boardTitleName, setBoardTitleName] = useState<string | undefined>(
    list.title
  );

  const onTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const confirmTitle = (): void => {
    if (title) {
      dispatch(
        setListName({
          ...list,
          title,
        })
      );
      setBoardTitleName(list.title);
    }
  };

  const handleDeleteTaskCard = () => {
    dispatch(deleteList(list.listID));
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
        {boardTitleName ? (
          <h2 className="text-3xl uppercase">{list.title}</h2>
        ) : (
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
                placeholder="Give a name to your board"
                className="h-8 text-paletteTeal font-semibold capitalize bg-paletteDark/50 rounded-sm  border-none placeholder:text-paletteWhite/70 px-4 focus:outline-none"
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
                  onClick={confirmTitle}
                  size={"2rem"}
                  className="text-paletteWhite cursor-pointer hover:text-paletteTeal "
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
        <ImCross
          onClick={handleDeleteTaskCard}
          className="absolute top-2 right-4 text-paletteWhite hover:text-paletteRed hover:rotate-90 cursor-pointer transition"
        />
      </div>

      {boardTitleName && (
        <div className="p-4 flex flex-col gap-4">
          <Form list={list} />

          <BoardTaskList todos={list.filteredList} listID={list.listID} />
        </div>
      )}
    </motion.div>
  );
};

export default BoardTaskCard;

import React, { useEffect } from "react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAllLists } from "../../store/dayListSlice";
import BoardTaskCard from "./Board";

const BoardsList = () => {
  const boards = useSelector(selectAllLists);

  useEffect(() => {}, []);

  return (
    <div className="w-full grid tiny: grid-cols-daysListTiny  xl:grid-cols-daysListXl gap-8 p-4">
      <AnimatePresence>
        {boards.map((list: IBoardListProps) => (
          <BoardTaskCard key={list.listID} list={list} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BoardsList;

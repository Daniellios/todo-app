"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAllBoards } from "../../store/boardsSlice";
import BoardTaskCard from "./Board";

const BoardsList = () => {
  const boards = useSelector(selectAllBoards);

  console.log(boards);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full   scrollbar grid tiny:grid-cols-daysListTiny  sm:grid-cols-daysListSm md:grid-cols-daysListMd xl:grid-cols-daysListXl p-2 gap-2 xl:gap-6 tiny:p-4">
      <AnimatePresence>
        {boards.map((list: IBoardListProps) => (
          <BoardTaskCard key={list.listID} list={list} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BoardsList;

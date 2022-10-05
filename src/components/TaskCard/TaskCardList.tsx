import React, { useEffect } from "react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAllLists } from "../../store/dayLIstSlice";
import TaskCard from "./TaskCard";

const TaskCardList = () => {
  const lists = useSelector(selectAllLists);

  useEffect(() => {}, []);

  return (
    <div className="w-full grid justify-items-center justify-center grid-cols-daysListTiny sm:grid-cols-daysListSm  md:grid-cols-daysListMd xl:grid-cols-daysListXl gap-4 px-4 my-4 auto-rows-auto max-w-[1440px]">
      <AnimatePresence>
        {lists.map((list: IListProps) => (
          <TaskCard key={list.listID} list={list} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskCardList;

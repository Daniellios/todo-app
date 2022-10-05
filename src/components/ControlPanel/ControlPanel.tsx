import { useRouter } from "next/router";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addList, clearCompleted } from "../../store/dayLIstSlice";
import {
  selectFilterStatus,
  setActive,
  setAll,
  setCompleted,
} from "../../store/fliterSlice";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const filterStatus = useSelector(selectFilterStatus);
  const router = useRouter();

  const hanldeAddNewList = () => {
    dispatch(addList());
  };

  const handleSetAllFilter = () => {
    dispatch(setAll());
  };

  const handleSetActiveFilter = () => {
    dispatch(setActive());
  };

  const handleSetCompletedFilter = () => {
    dispatch(setCompleted());
  };

  const handleClearCompletedTasks = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center p-4 h-24">
      <div className="flex w-full items-center justify-between max-w-[1980px]">
        <div className="flex items-center">
          <button onClick={hanldeAddNewList} className="regular-button">
            <IoMdAdd className=" text-paletteDark" size={"1.5rem"}></IoMdAdd>
            Add List
          </button>
        </div>

        {/* FILTERS */}
        <div className="w-full flex justify-center gap-4 items-center sm:flex-row">
          <div className="flex gap-1 md:gap-4 order-2  md:order-none">
            <button>ТЕСТИМ</button>

            <button
              onClick={handleSetAllFilter}
              className={
                filterStatus === "all"
                  ? "filter-button-active"
                  : "filter-button"
              }
            >
              All
            </button>
            <button
              onClick={handleSetActiveFilter}
              className={
                filterStatus === "active"
                  ? "filter-button-active"
                  : "filter-button"
              }
            >
              Active
            </button>
            <button
              onClick={handleSetCompletedFilter}
              className={
                filterStatus === "completed"
                  ? "filter-button-active"
                  : "filter-button"
              }
            >
              Completed
            </button>
          </div>
          <button
            onClick={handleClearCompletedTasks}
            className="filter-button order-3  md:order-none"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

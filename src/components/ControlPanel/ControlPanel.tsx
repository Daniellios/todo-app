import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, clearCompleted } from "../../store/dayListSlice";

const ControlPanel = () => {
  const dispatch = useDispatch();

  const hanldeAddNewList = () => {
    dispatch(addBoard());
  };

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center p-4 h-24">
      <div className="flex w-full items-center justify-between max-w-[1980px]">
        <h1 className="text-paletteDark text-3xl font-semibold uppercase">
          Project Name
        </h1>

        <button onClick={hanldeAddNewList} className="regular-button">
          <IoMdAdd className=" text-paletteDark" size={"1.5rem"}></IoMdAdd>
          Add board
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

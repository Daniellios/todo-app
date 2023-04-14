import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../store/uiSlice";

const ControlPanel = () => {
  const dispatch = useDispatch();

  const handleOpenBoardCreator = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center p-4 h-24">
      <div className="flex w-full items-center justify-between max-w-[1980px]">
        <h1 className="text-paletteDark text-lg sm:text-3xl font-semibold uppercase">
          Kanban board
        </h1>

        <button onClick={handleOpenBoardCreator} className="regular-button">
          <IoMdAdd className=" text-paletteDark" size={"1.5rem"}></IoMdAdd>
          New board
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

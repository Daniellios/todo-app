"use client";

import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../store/uiSlice";
import useTranslation from "next-translate/useTranslation";

const ControlPanel = () => {
  const { t, lang } = useTranslation("home");

  console.log(lang);

  const dispatch = useDispatch();

  const handleOpenBoardCreator = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center p-4 h-24 shadow-md">
      <div className="flex w-full items-center justify-between max-w-[1980px] ">
        <h1 className="text-paletteDark text-lg sm:text-3xl font-semibold uppercase">
          Kanban board
        </h1>

        {/* <input></input> */}

        <button onClick={handleOpenBoardCreator} className="regular-button">
          <IoMdAdd className=" text-paletteDark" size={"1.5rem"}></IoMdAdd>
          New Board
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

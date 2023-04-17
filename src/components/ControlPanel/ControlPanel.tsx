"use client";

import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/uiSlice";
import useTranslation from "next-translate/useTranslation";
import { selectProject } from "../../store/boardsSlice";
import EditTitleInput from "../Forms/EditTitleInput";

const ControlPanel = () => {
  const { t, lang } = useTranslation("home");
  const { projectName, id } = useSelector(selectProject);
  const dispatch = useDispatch();

  const handleOpenBoardCreator = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center p-4 h-24 shadow-md">
      <div className="flex w-full items-center justify-between max-w-[1980px] ">
        <EditTitleInput
          titleValue={projectName}
          doubleClickActivation={true}
          dispatchType="project"
          inputPlaceHolder="Enter new project name"
        ></EditTitleInput>

        <button onClick={handleOpenBoardCreator} className="regular-button">
          <IoMdAdd className=" text-paletteDark"></IoMdAdd>
          New Board
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

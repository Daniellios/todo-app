"use client";

import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/uiSlice";
import useTranslation from "next-translate/useTranslation";
import { editProjectName, selectProject } from "../../store/boardsSlice";
import { AiOutlineCheck } from "react-icons/ai";

const ControlPanel = () => {
  const { t, lang } = useTranslation("home");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { projectName, id } = useSelector(selectProject);

  const toggleEdit = (): void => {
    setIsEditing(!isEditing);
  };

  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(projectName);

  const onTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const handleOpenBoardCreator = () => {
    dispatch(toggleModal());
  };

  const applyEditChanges = (): void => {
    dispatch(editProjectName(title));
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center p-4 h-24 shadow-md">
      <div className="flex w-full items-center justify-between max-w-[1980px] ">
        <div className="flex items-center gap-2">
          {!isEditing && (
            <h1
              onDoubleClick={toggleEdit}
              className="text-paletteDark text-lg sm:text-3xl font-semibold uppercase cursor-pointer hover:text-paletteWhite/90 transition"
            >
              {title}
            </h1>
          )}

          {isEditing && (
            <input
              onDoubleClick={toggleEdit}
              onChange={onTitleChange}
              value={title}
              className="h-8 bg-paletteDark rounded"
              type="text"
              placeholder={"Project name"}
            ></input>
          )}

          {isEditing && (
            <AiOutlineCheck
              onClick={applyEditChanges}
              size={"1.5rem"}
              className="text-paletteDark cursor-pointer hover:text-paletteWhite "
            />
          )}
        </div>

        <button onClick={handleOpenBoardCreator} className="regular-button">
          <IoMdAdd className=" text-paletteDark"></IoMdAdd>
          New Board
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

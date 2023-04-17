import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import {
  titleInputAnimiation,
  titleTextAnimation,
} from "../../animations/framerConfigs";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import {
  editListName,
  editProjectName,
  editTask,
} from "../../store/boardsSlice";

interface IEditTitleInput {
  dispatchType: "project" | "board" | "task";
  doubleClickActivation: boolean;
  titleValue: string;
  inputPlaceHolder?: string;
  listID?: string;
  taskID?: string;
}

const EditTitleInput: React.FC<IEditTitleInput> = ({
  dispatchType,
  doubleClickActivation,
  titleValue,
  inputPlaceHolder,
  listID,
  taskID,
}) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(titleValue);
  const [error, setError] = useState<boolean>(false);

  const onTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const toggleEdit = (): void => {
    if (!title) showError();
    else {
      setIsEditing(!isEditing);
    }
  };

  const showError = (): void => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  const applyEditChanges = (): void => {
    if (!title) showError();
    else {
      switch (dispatchType) {
        case "project":
          dispatch(editProjectName(title));
          break;
        case "board":
          listID && dispatch(editListName({ listID, title }));
          break;
        case "task":
          taskID &&
            listID &&
            dispatch(
              editTask({ ID: listID, taskID: taskID, updatedTaskName: title })
            );
      }
      setTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isEditing && (
        <h1
          onDoubleClick={doubleClickActivation ? toggleEdit : () => {}}
          className="text-paletteDark text-lg sm:text-3xl font-semibold uppercase cursor-pointer hover:text-paletteWhite/90 transition"
        >
          {title}
        </h1>
      )}

      {isEditing && (
        <AnimatePresence>
          <motion.div
            variants={titleInputAnimiation}
            initial="hidden"
            animate="visible"
            exit={"exit"}
            className="flex items-center space-x-2 border-none"
          >
            <input
              onDoubleClick={toggleEdit}
              onChange={onTitleChange}
              placeholder={inputPlaceHolder || "Enter new name"}
              value={title}
              className={`h-8 bg-paletteDark rounded ${
                error
                  ? " border-[1px]  border-paletteRed outline-none placeholder:text-paletteRed"
                  : ""
              } `}
              type="text"
            ></input>

            <AiOutlineCheck
              onClick={applyEditChanges}
              size={"1.5rem"}
              className="text-paletteDark cursor-pointer hover:text-paletteWhite "
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default EditTitleInput;

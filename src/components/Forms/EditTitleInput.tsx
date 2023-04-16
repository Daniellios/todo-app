import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import {
  titleInputAnimiation,
  titleTextAnimation,
} from "../../animations/framerConfigs";

interface IEditTitleInput {
  isEditing: boolean;
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  titleValue: string;
  applyEditChange: () => void;
  doubleClickToggle?: () => void;
  inputPlaceHolder?: string;
}

const EditTitleInput: React.FC<IEditTitleInput> = ({
  isEditing,
  handleChange,
  titleValue,
  applyEditChange,
  doubleClickToggle,
  inputPlaceHolder,
}) => {
  // border-[1px]  border-paletteRed outline-none placeholder:text-paletteRed
  return (
    <motion.div
      variants={titleInputAnimiation}
      initial="hidden"
      animate="visible"
      exit={"exit"}
      className="flex items-center space-x-2"
    >
      <input
        onDoubleClick={doubleClickToggle}
        onChange={handleChange}
        placeholder={inputPlaceHolder || "Input new name"}
        value={titleValue}
        className="h-8 bg-paletteDark rounded"
        type="text"
      ></input>

      <AiOutlineCheck
        onClick={applyEditChange}
        size={"1.5rem"}
        className="text-paletteDark cursor-pointer hover:text-paletteWhite "
      />
    </motion.div>
  );
};

export default EditTitleInput;

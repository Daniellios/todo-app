import React, { useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../hooks/useClickOutside";
import { addBoard, setListName } from "../store/dayListSlice";
import { closeModal, selectModalStatus } from "../store/uiSlice";

const BoardModalCreator: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");

  const isOpen = useSelector(selectModalStatus);

  const [boardTitleName, setBoardTitleName] = useState<string | undefined>();

  const modalRef = useRef(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setBoardTitleName(e.currentTarget.value);
  };

  //   const confirmTitle = (): void => {
  //     if (title) {
  //       dispatch(
  //         setListName({
  //           ...list,
  //           title,
  //         })
  //       );
  //       setBoardTitleName(list.title);
  //     }
  //   };

  const handleCloseModal = (): void => {
    dispatch(closeModal());
  };

  const handleClickOutside = () => {
    dispatch(closeModal());
  };

  const handleAddBoard = () => {
    dispatch(addBoard());
  };

  useOnClickOutside(modalRef, handleClickOutside);

  return isOpen ? (
    <div
      ref={modalRef}
      onClick={handleClickOutside}
      className="flex justify-center p-2 w-60 h-80 bg-paletteDarkGray rounded absolute z-20 left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2"
    >
      <ImCross
        onClick={handleCloseModal}
        className=" text-paletteWhite hover:text-paletteRed hover:rotate-90 cursor-pointer transition"
      />
      BoardModalCreator
    </div>
  ) : null;
};

export default BoardModalCreator;

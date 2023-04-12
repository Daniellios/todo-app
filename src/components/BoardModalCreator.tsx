import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, setListName } from "../store/dayListSlice";
import { selectModalStatus } from "../store/uiSlice";

const BoardModalCreator: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");

  const isOpen = useSelector(selectModalStatus);

  const [boardTitleName, setBoardTitleName] = useState<string | undefined>();

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

  const handleaddBoard = () => {
    dispatch(addBoard());
  };

  return isOpen ? (
    <div className="flex justify-center p-2 w-60 h-80 bg-paletteDarkGray rounded absolute z-10 left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
      BoardModalCreator
    </div>
  ) : null;
};

export default BoardModalCreator;

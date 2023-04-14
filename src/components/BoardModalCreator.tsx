import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { basicOpacityAnimation } from "../animations/framerConfigs";
import useOnClickOutside from "../hooks/useClickOutside";
import { addBoard } from "../store/boardsSlice";
import { closeModal, selectModalStatus } from "../store/uiSlice";

type Inputs = {
  boardName: string;
};

const BoardModalCreator: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const modalRef = useRef(null);

  const dispatch = useDispatch();

  const isOpen = useSelector(selectModalStatus);

  useEffect(() => {
    let timeout = setTimeout(() => {
      clearErrors();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [errors, clearErrors]);

  const handleCloseModal = (): void => {
    dispatch(closeModal());
    reset();
  };

  const handleClickOutside = () => {
    handleCloseModal();
  };

  const handleAddBoard = () => {
    const formValues = getValues();
    dispatch(addBoard(formValues.boardName));
    handleCloseModal();
  };

  useOnClickOutside(modalRef, handleClickOutside);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={basicOpacityAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={modalRef}
          className="p-2 w-[320px] h-80 bg-paletteDarkGray rounded absolute z-20 left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2"
        >
          <div className="flex justify-start items-center flex-col  relative w-full h-full">
            <ImCross
              onClick={handleCloseModal}
              className=" text-paletteWhite hover:text-paletteRed hover:rotate-90 cursor-pointer transition absolute top-0 right-0"
            />

            <h1 className="text-paletteWhite text-2xl mb-4">Board creation</h1>

            <form
              onSubmit={handleSubmit(handleAddBoard)}
              className="flex flex-col items-start gap-2"
            >
              <input
                placeholder="Board name"
                className={`h-10 pl-2 ${
                  errors.boardName
                    ? " border-[1px] !border-paletteRed placeholder:text-paletteRed"
                    : ""
                } `}
                {...register("boardName", { required: true })}
              />

              {errors.boardName && (
                <span className="text-paletteRed text-sm">
                  This field is required
                </span>
              )}

              <button
                type="submit"
                className="bg-paletteTeal px-4 py-2 rounded text-white font-semibold hover:bg-paletteTeal/80 transition-all w-full"
              >
                Create
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoardModalCreator;

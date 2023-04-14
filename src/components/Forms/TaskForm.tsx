"use client";

import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/boardsSlice";
import Datepicker from "react-tailwindcss-datepicker";

import { RiArrowDropDownLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import {
  taskFormAnimation,
  taskFormFoldedContainer,
} from "../../animations/framerConfigs";
import { AiOutlineArrowRight } from "react-icons/ai";

type TaskFormFields = {
  taskName: string;
  dates: ITaskDates;
};

const TaskForm = ({ listID }: IFormProps) => {
  const [isFormFolded, setIsFormFolded] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    watch,
    clearErrors,
    resetField,
    formState: { errors },
  } = useForm<TaskFormFields>();

  const dispatch = useDispatch();

  useEffect(() => {
    let timeout = setTimeout(() => {
      clearErrors();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [errors, clearErrors]);

  const handleFormClear = (): void => {
    reset({ taskName: "", dates: { endDate: null, startDate: null } });
    clearErrors();
  };

  const handleTask = (): void => {
    const formValues = getValues();
    dispatch(addTask(listID, formValues.taskName, formValues.dates));
    handleFormClear();
  };

  const handleFormFold = (): void => {
    setIsFormFolded(!isFormFolded);
    handleFormClear();
  };

  return (
    <motion.div
      key={"taskWrap"}
      onClick={!isFormFolded ? () => {} : handleFormFold}
      className={`flex w-full gap-2 flex-col items-start  sm:flex-row md:items-end  p-2 bg-paletteDarkGray mt-2 rounded  relative  ${
        !isFormFolded
          ? ""
          : " hover:bg-paletteTeal cursor-pointer  transition-colors"
      }`}
      initial={{
        height: "100%",
      }}
      animate={{
        height: `${!isFormFolded ? "100%" : "40px"}`,
        transition: {
          ease: "linear",
          duration: 0.2,
        },
      }}
      exit={{ transition: { duration: 0.2, ease: "linear" } }}
    >
      <AnimatePresence>
        {isFormFolded && (
          <motion.div
            key={"folded_form"}
            initial="initial"
            variants={taskFormFoldedContainer}
            animate={{
              opacity: `${!isFormFolded ? 0 : 1}`,
              transition: { delay: 0.2, ease: "linear" },
            }}
            exit={"exit"}
            className="flex h-full m-auto text-paletteWhite items-center"
          >
            <h2 className=" font-semibold  ">Create new task </h2>
            <RiArrowDropDownLine
              size={"2rem"}
              className={!isFormFolded ? "rotate-0 " : "rotate-180 "}
            ></RiArrowDropDownLine>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isFormFolded && (
          <motion.form
            variants={taskFormAnimation}
            initial="hidden"
            key={"form"}
            animate={"visible"}
            exit={"exit"}
            onSubmit={handleSubmit(handleTask)}
            className="flex flex-col  w-full gap-4 bg-paletteDarkGray "
          >
            <input
              type="text"
              placeholder={errors.taskName ? "Cannot be empty" : "Task name"}
              className={
                errors.taskName
                  ? "input-error h-8 w-[180px] sm:w-[260px]"
                  : "h-8 px-4  w-[180px]  sm:w-[260px] border-[1px] rounded text-paletteTeal  border-none outline-none  bg-paletteDark"
              }
              {...register("taskName", { required: true })}
            />

            <Controller
              control={control}
              name="dates"
              render={({ field: { value, onChange } }) => (
                <Datepicker
                  primaryColor={"teal"}
                  i18n={"ru"}
                  placeholder="Due date"
                  toggleClassName="text-paletteWhite hover:text-paletteTeal"
                  asSingle={true}
                  useRange={false}
                  inputName="dates"
                  readOnly
                  onChange={onChange}
                  displayFormat={"DD/MM/YYYY"}
                  //@ts-ignore
                  value={value}
                  startWeekOn="mon"
                  inputClassName="bg-paletteDark rounded h-8 mr-2 w-[180px] sm:w-[260px] "
                />
              )}
            />
          </motion.form>
        )}
      </AnimatePresence>

      {!isFormFolded && (
        <button
          onClick={handleFormFold}
          className="text-paletteWhite justify-self-start absolute top-0 right-0 cursor-pointer hover:text-paletteTeal z-10 transition"
        >
          <RiArrowDropDownLine
            size={"2rem"}
            className={
              !isFormFolded ? "rotate-0 transition" : "rotate-180 transition"
            }
          ></RiArrowDropDownLine>
        </button>
      )}

      <div className="flex flex-col justify-end items-end sm:h-[80px] relative">
        <AnimatePresence>
          {!isFormFolded && (
            <motion.button
              key={"form_button"}
              variants={taskFormAnimation}
              initial="hidden"
              animate="visible"
              exit={"exit"}
              onClick={handleSubmit(handleTask)}
              type="submit"
              className="flex h-10 justify-center items-center text-paletteWhite font-semibold px-2 py-2 transition text-center text-sm w-24 hover:cursor-pointer hover:bg-paletteTeal/80 bg-paletteTeal rounded "
            >
              Add
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskForm;

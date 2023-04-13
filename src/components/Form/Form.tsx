import { nanoid } from "@reduxjs/toolkit";
import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/boardsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Datepicker from "react-tailwindcss-datepicker";

type TaskForm = {
  taskName: string;
  dates: ITaskDates;
};

const Form = ({ listID }: IFormProps) => {
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
  } = useForm<TaskForm>();

  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeout = setTimeout(() => {
      clearErrors();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [errors, clearErrors]);

  const todoInput = useRef<HTMLInputElement>(null);

  const handleTask = (): void => {
    const formValues = getValues();
    console.log(errors);

    dispatch(addTask(listID, formValues.taskName, formValues.dates));

    reset({ taskName: "", dates: { endDate: null, startDate: null } });
    clearErrors();
  };

  // Auto Focus
  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.focus();
    }
  }, []);

  // Empty Input Error
  const showError = (): void => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  return (
    <div className="flex w-full justify-start gap-2 flex-col  md:flex-row md:items-center  p-4 bg-paletteDarkGray mt-2 ">
      <form
        onSubmit={handleSubmit(handleTask)}
        className="flex flex-col  w-full gap-4 bg-paletteDarkGray "
      >
        <input
          type="text"
          placeholder={errors.taskName ? "Cannot be empty" : "Review project"}
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
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Datepicker
              primaryColor={"teal"}
              i18n={"ru"}
              placeholder="Due date"
              toggleClassName="text-paletteWhite"
              asSingle={true}
              useRange={false}
              readOnly
              inputName="dates"
              onChange={onChange}
              displayFormat={"DD/MM/YYYY"}
              //@ts-ignore
              value={value}
              startWeekOn="mon"
              inputClassName="bg-paletteDark rounded h-8 mr-2  w-[180px]  sm:w-[260px]"
            />
          )}
        />

        {/* <button
          data-testid="Add"
          type="submit"
          className="flex justify-center items-center text-paletteWhite font-semibold px-2 py-2 transition text-center text-sm w-32 hover:cursor-pointer hover:bg-paletteTeal/80 bg-paletteTeal rounded "
        >
          Add new task
        </button> */}
      </form>

      <button
        onClick={handleSubmit(handleTask)}
        data-testid="Add"
        type="submit"
        className="flex h-10 justify-center items-center text-paletteWhite font-semibold px-2 py-2 transition text-center text-sm w-24 hover:cursor-pointer hover:bg-paletteTeal/80 bg-paletteTeal rounded "
      >
        Add task
      </button>

      {errors.dates && <span>gsgsg</span>}
    </div>
  );
};

export default Form;

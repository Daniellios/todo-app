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

  const todoInput = useRef<HTMLInputElement>(null);

  const [task, setTask] = useState<string>("");

  // Task Text Setup
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTask(e.currentTarget.value);
  };

  const handleTask = (): void => {
    const formValues = getValues();

    dispatch(addTask(listID, formValues.taskName, formValues.dates));
    reset({ taskName: "", dates: { endDate: null, startDate: null } });
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
    <div className="flex w-full">
      <form
        onSubmit={handleSubmit(handleTask)}
        className="flex w-full flex-col gap-4 bg-paletteDarkGray p-4"
      >
        <input
          type="text"
          // ref={todoInput}
          placeholder={error ? "Cannot be empty" : "Review project"}
          className={
            error
              ? "input-error"
              : "h-8 px-4 w-[260px] border-[1px] rounded text-paletteTeal  border-none outline-none  bg-paletteDark"
          }
          // value={task}
          // onChange={handleChange}
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
              toggleClassName="text-paletteWhite"
              asSingle={true}
              useRange={false}
              inputName="dates"
              onChange={onChange}
              //@ts-ignore
              value={value}
              startWeekOn="mon"
              inputClassName="bg-paletteDark rounded h-8 mr-2 w-[260px]"
            />
          )}
        />

        <button
          data-testid="Add"
          type="submit"
          className="flex justify-center items-center text-paletteWhite font-semibold px-2 py-2 transition text-center text-sm w-32 hover:cursor-pointer hover:bg-paletteTeal/80 bg-paletteTeal rounded "
        >
          Add new task
        </button>
      </form>

      {errors.dates && <span>gsgsg</span>}

      {/* <button
        data-testid="Add"
        className="flex justify-center items-center text-paletteWhite font-semibold px-1 border-l-[1px] border-gray-500/25 transition text-center text-sm w-32 hover:cursor-pointer hover:bg-paletteTeal rounded-r-md"
        onClick={() => handleTask()}
      >
        Add new task
      </button> */}
    </div>
  );
};

export default Form;

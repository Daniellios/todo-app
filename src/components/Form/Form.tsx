import { nanoid } from "@reduxjs/toolkit";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/dayListSlice";

const Form = ({ list }: IFormProps) => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const todoInput = useRef<HTMLInputElement>(null);

  const [task, setTask] = useState<string>("");

  // Task Text Setup
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTask(e.currentTarget.value);
  };

  const handleTask = (): void => {
    if (task !== "") {
      dispatch(addTask({ ID: list.listID, task: task }));
      setTask("");
    } else {
      showError();
    }
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
    <div className="flex h-12 w-full border-[1px] border-gray-500/25 rounded ">
      <input
        type="text"
        ref={todoInput}
        placeholder={error ? "Cannot be empty" : "Review project"}
        className={
          error
            ? "input-error"
            : "h-full w-full px-4 border-[1px] rounded-t-md rounded-b-md rounded-r-[0] text-paletteWhite focus: border-none outline-none placeholder:text-paletteWhite/70 bg-paletteDark"
        }
        value={task}
        onChange={handleChange}
      />
      <button
        data-testid="Add"
        className="flex justify-center items-center text-paletteWhite font-semibold px-1 border-l-[1px] border-gray-500/25 transition text-center text-sm w-32 hover:cursor-pointer hover:bg-paletteTeal rounded-r-md"
        onClick={() => handleTask()}
      >
        Add new task
      </button>
    </div>
  );
};

export default Form;

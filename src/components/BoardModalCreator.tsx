import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import useOnClickOutside from "../hooks/useClickOutside";
import { addBoard, setListName } from "../store/dayListSlice";
import { closeModal, selectModalStatus } from "../store/uiSlice";

const BoardModalCreator: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
          {/* register your input into the hook by invoking the "register" function */}
          <input
            placeholder="Done"
            defaultValue={""}
            className="h-10"
            {...register("example")}
          />

          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <button
            type="submit"
            className="bg-paletteTeal px-4 py-2 rounded text-white font-semibold hover:bg-paletteTeal/80 transition-all"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default BoardModalCreator;

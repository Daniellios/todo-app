import React from "react"
import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { addList, clearCompleted } from "../../store/dayLIstSlice"
import {
  selectFilterStatus,
  setActive,
  setAll,
  setCompleted,
} from "../../store/fliterSlice"

const ControlPanel = () => {
  const dispatch = useDispatch()
  const filterStatus = useSelector(selectFilterStatus)

  return (
    <div className="w-full bg-paletteTeal flex justify-center items-center tiny:justify-between p-4 max-w-[1980px]">
      <div className="w-full tiny:gap-4  flex items-center  justify-start">
        <IoMdAdd
          onClick={() => dispatch(addList())}
          className="flex text-xs items-center justify-center text-paletteDark hover:cursor-pointer hover:text-paletteWhite hover:scale-[.9] transition"
          size={"2rem"}
        ></IoMdAdd>
        <h1 className=" text-lg md:text-[2rem] leading-normal text-paletteDark font-bold">
          Add List
        </h1>
      </div>

      {/* FILTERS */}
      <div className="w-full flex justify-end gap-4 items-center sm:flex-row">
        <div className="flex flex-col tiny:flex-row gap-1 md:gap-4 order-2 md:order-none">
          <button
            onClick={() => dispatch(setAll())}
            className={
              filterStatus === "all" ? "filter-button-active" : "filter-button"
            }
          >
            All
          </button>
          <button
            onClick={() => dispatch(setActive())}
            className={
              filterStatus === "active"
                ? "filter-button-active"
                : "filter-button"
            }
          >
            Active
          </button>
          <button
            onClick={() => dispatch(setCompleted())}
            className={
              filterStatus === "completed"
                ? "filter-button-active"
                : "filter-button"
            }
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => dispatch(clearCompleted())}
          className="filter-button order-3  md:order-none"
        >
          Clear Completed
        </button>
      </div>
    </div>
  )
}

export default ControlPanel

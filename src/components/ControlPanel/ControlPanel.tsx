import React from "react"
import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { addList, selectAllLists } from "../../store/dayLIstSlice"
import {
  selectFilterStatus,
  setActive,
  setAll,
  setCompleted,
} from "../../store/fliterSlice"

const ControlPanel = () => {
  const dispatch = useDispatch()
  const filterStatus = useSelector(selectFilterStatus)

  const filterAll = (): void => {
    dispatch(setAll())
  }

  const filterActive = (): void => {
    dispatch(setActive())
  }

  const filterCompleted = (): void => {
    dispatch(setCompleted())
  }

  const clearCompleted = (): void => {}

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-between p-4 max-w-[1980px]">
      <div className="w-full flex items-center gap-4">
        <IoMdAdd
          onClick={() => dispatch(addList())}
          className="flex text-xs items-center justify-center text-paletteDark hover:cursor-pointer hover:text-paletteWhite hover:scale-75  transition"
          size={"2rem"}
        ></IoMdAdd>
        <h1 className="text-lg md:text-[2rem] leading-normal text-paletteDark font-bold">
          Add New List
        </h1>
      </div>

      {/* FILTERS */}
      <div className="w-full flex justify-end gap-4 items-center sm:flex-row">
        <div className="flex gap-1 md:gap-4 order-2  md:order-none">
          <button
            onClick={filterAll}
            className={
              filterStatus === "all" ? "filter-button-active" : "filter-button"
            }
          >
            All
          </button>
          <button
            onClick={filterActive}
            className={
              filterStatus === "active"
                ? "filter-button-active"
                : "filter-button"
            }
          >
            Active
          </button>
          <button
            onClick={filterCompleted}
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
          onClick={clearCompleted}
          className="filter-button order-3  md:order-none"
        >
          Clear Completed
        </button>
      </div>
    </div>
  )
}

export default ControlPanel

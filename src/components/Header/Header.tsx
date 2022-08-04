import React from "react"
import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { addList, selectAllLists } from "../../store/dayLIstSlice"

const Header = () => {
  const dispatch = useDispatch()

  return (
    <div className="w-full bg-paletteTeal flex items-center justify-center ">
      <div className="w-full flex items-end p-4 gap-4 max-w-[1980px]">
        <IoMdAdd
          onClick={() => dispatch(addList())}
          className="flex items-center justify-center text-paletteDark hover:cursor-pointer hover:text-paletteWhite hover:scale-75  transition"
          size={"3rem"}
        ></IoMdAdd>
        <h1 className="text-4xl leading-normal text-paletteDark font-bold">
          Add New List
        </h1>
      </div>
    </div>
  )
}

export default Header

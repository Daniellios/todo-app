import React from "react"

import { IoMdAdd } from "react-icons/io"

const Header = () => {
  return (
    <div className="w-full bg-paletteTeal flex items-end  p-4  gap-4">
      <IoMdAdd
        className="flex items-center justify-center text-paletteDark hover:cursor-pointer hover:text-paletteWhite transition"
        size={"3rem"}
      ></IoMdAdd>
      <h1 className="text-4xl leading-normal text-paletteDark font-bold">
        Add New List
      </h1>
    </div>
  )
}

export default Header

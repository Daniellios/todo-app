import React from "react"

const DayTitle = ({ title }: IDayTitleProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <h2 className="text-paletteTeal text-3xl ">{title}</h2>
    </div>
  )
}

export default DayTitle

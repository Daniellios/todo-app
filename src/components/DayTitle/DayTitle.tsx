import React from "react"

const DayTitle = ({ day, month }: IDayTitleProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <h2 className="text-paletteTeal text-3xl ">
        {day} of {month}
      </h2>
    </div>
  )
}

export default DayTitle

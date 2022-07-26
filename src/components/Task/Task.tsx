import React from "react"
import { AiOutlineCheck } from "react-icons/ai"

const Task = ({ task, isCompleted, id, completeTask }: ITaskProps) => {
  return (
    <div className="w-full  border-b-[1px] border-gray-500/25 ">
      <div className="flex justify-start items-center gap-8 py-2">
        <button
          onClick={() => completeTask(id)}
          className="flex justify-center items-center w-8 h-8 rounded-full border-[1px] border-gray-400 hover:cursor-pointer hover:bg-slate-500/25"
        >
          {isCompleted ? (
            <AiOutlineCheck className="text-green-500" size={"1.5rem"} />
          ) : (
            ""
          )}
        </button>
        <h2
          className={
            isCompleted
              ? "text-xl text-gray-500/50 line-through"
              : "text-xl text-gray-500"
          }
        >
          {task.taskName}
        </h2>
      </div>
    </div>
  )
}

export default Task

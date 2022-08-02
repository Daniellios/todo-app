import React from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { motion } from "framer-motion"
import { listItem } from "../../animations/framerConfigs"

const Task = ({ task, isCompleted, id, completeTask }: ITaskProps) => {
  return (
    <motion.div
      initial={{ size: 0, opacity: 0 }}
      animate={{ size: 1, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      className="w-full  border-b-[1px] border-gray-500/25 "
    >
      <div className="flex justify-start items-center gap-8 py-2">
        <button
          onClick={() => completeTask(id)}
          className="flex justify-center items-center w-8 h-8 rounded-full border-[1px] border-gray-400 hover:cursor-pointer hover:bg-slate-500/25"
        >
          {isCompleted ? (
            <AiOutlineCheck className="text-paletteTeal" size={"1.5rem"} />
          ) : (
            ""
          )}
        </button>
        <h2
          className={
            isCompleted
              ? "text-xl text-paletteWhite/50 line-through"
              : "text-xl text-paletteWhite"
          }
        >
          {task.taskName}
        </h2>
      </div>
    </motion.div>
  )
}

export default Task

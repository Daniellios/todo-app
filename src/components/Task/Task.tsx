import React, { useState } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { AnimatePresence, motion } from "framer-motion"
import { BsFillTrashFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { taskAnimation } from "../../animations/framerConfigs"
import { deleteTask, completeTask } from "../../store/dayLIstSlice"

const Task = ({ task, isCompleted, taskID, listID }: ITaskProps) => {
  const dispatch = useDispatch()

  const [isDone, setIsDone] = useState(isCompleted)

  const handleDone = (): void => {
    dispatch(completeTask({ ID: listID, taskID: taskID }))
    setIsDone(!isDone)
  }

  return (
    <motion.div
      variants={taskAnimation}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="w-full  border-b-[1px] border-gray-500/25 "
    >
      <div className="flex items-center justify-start gap-4 py-2 pr-4">
        <motion.button
          onClick={handleDone}
          className="flex justify-center items-center w-8 h-8 rounded-full border-[1px] border-paletteWhite/70 hover:cursor-pointer hover:bg-slate-500/25"
        >
          {isDone ? (
            <AiOutlineCheck className="text-paletteTeal" size={"1.5rem"} />
          ) : (
            ""
          )}
        </motion.button>
        <h2 className={isDone ? "task-done" : "task-undone"}>{task}</h2>

        <BsFillTrashFill
          onClick={() => dispatch(deleteTask({ ID: listID, taskID: taskID }))}
          className="text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer transition "
        />
      </div>
    </motion.div>
  )
}

export default Task

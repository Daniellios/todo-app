import React from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { AnimatePresence, motion } from "framer-motion"
import { BsFillTrashFill } from "react-icons/bs"
import { ImCross } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"

const Task = ({ task, isCompleted, id }: ITaskProps) => {
  const dispatch = useDispatch()

  const todoListTest = useSelector(
    (state: RootState) => state.rootReducer.todos
  )

  return (
    <motion.div
      initial={{ size: 0, opacity: 0 }}
      animate={{ size: 1, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
      exit={{ opacity: 0 }}
      className="w-full  border-b-[1px] border-gray-500/25 "
    >
      <div className="flex items-center justify-start gap-4 py-2 pr-4">
        <motion.button
          onClick={() => {}}
          className="flex justify-center items-center w-8 h-8 rounded-full border-[1px] border-paletteWhite/70 hover:cursor-pointer hover:bg-slate-500/25"
        >
          {isCompleted ? (
            <AiOutlineCheck className="text-paletteTeal" size={"1.5rem"} />
          ) : (
            ""
          )}
        </motion.button>
        <h2
          className={
            isCompleted
              ? "text-lg text-paletteWhite/50 line-through break-words text-start"
              : "text-lg text-paletteWhite max-w-[80%] break-words text-start"
          }
        >
          {task.taskName}
        </h2>

        <BsFillTrashFill
          onClick={() => {}}
          className="text-paletteWhite flex ml-auto hover:text-paletteTeal cursor-pointer transition "
        />
      </div>
    </motion.div>
  )
}

export default Task

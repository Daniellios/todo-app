import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import Task from "../Task/Task"
import { basicOpacityAnimation } from "../../animations/framerConfigs"
import { useSelector } from "react-redux"
import { selectFilterStatus } from "../../store/fliterSlice"

const TaskList = ({ todos, listID }: ITaskListComponent) => {
  const filterStatus = useSelector(selectFilterStatus)
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 text-center">
      <AnimatePresence>
        {todos.length > 0 ? (
          todos.map((task: ITask) => {
            return (
              <Task
                key={task.id}
                task={task.taskName}
                isCompleted={task.isCompleted}
                listID={listID}
                taskID={task.id}
              />
            )
          })
        ) : (
          <motion.p
            variants={basicOpacityAnimation}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="text-lg tiny:text-2xl text-paletteWhite"
          >
            {filterStatus === "all"
              ? "Click there to add 👆"
              : filterStatus === "active"
              ? "No active"
              : filterStatus === "completed"
              ? "No completed"
              : ""}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskList

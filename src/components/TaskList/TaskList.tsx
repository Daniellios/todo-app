import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Task from "../Task/Task"
import { basicOpacityAnimation } from "../../animations/framerConfigs"

const TaskList = ({ todos, listID }: ITaskListComponent) => {
  return (
    <motion.div className="w-full flex flex-col justify-center items-center gap-3 text-center">
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
            className="text-2xl text-paletteWhite"
          >
            Add Something To Do 👆
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList

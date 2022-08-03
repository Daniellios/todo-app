import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import Task from "../Task/Task"
import { useEffect, useState } from "react"

const TaskList = ({
  filteredTodos,
  completeTask,
  deleteTask,
  originalTodos,
}: ITaskListProps) => {
  return (
    <motion.div className="w-full flex flex-col justify-center items-center gap-3 text-center">
      <AnimatePresence>
        {originalTodos.length > 0 ? (
          filteredTodos.map((task: ITask) => {
            return (
              <Task
                key={task.id}
                task={task}
                isCompleted={task.isCompleted}
                id={task.id}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            )
          })
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-paletteWhite"
          >
            Add Something To Do For Today 👆
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList

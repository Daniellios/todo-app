import React from "react"
import { motion } from "framer-motion"
import Task from "../Task/Task"
import { useEffect, useState } from "react"

const TaskList = ({ filteredTodos, completeTask }: ITaskListProps) => {
  return (
    <motion.div className="w-full flex flex-col justify-center items-center gap-3 text-center">
      {filteredTodos.length > 0 ? (
        filteredTodos.map((task: ITask) => {
          return (
            <Task
              key={task.id}
              task={task}
              isCompleted={task.isCompleted}
              id={task.id}
              completeTask={completeTask}
            />
          )
        })
      ) : (
        <p className="text-2xl text-paletteWhite">
          Add Something To Do For Today 👆
        </p>
      )}
    </motion.div>
  )
}

export default TaskList

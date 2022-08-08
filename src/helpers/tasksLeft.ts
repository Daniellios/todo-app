//Tasks Left Counter
const tasksLeft = (tasks: ITask[]): string => {
  let taskAmount = tasks.filter((task: ITask) => !task.isCompleted).length
  let msg = " "

  if (tasks) {
    if (taskAmount === 1) {
      msg = "1 todo left"
      return msg
    } else if (taskAmount > 1) {
      msg = `${taskAmount} todo's left`
      return msg
    } else {
      msg = "All done"
      return msg
    }
  }
  return msg
}

export default tasksLeft

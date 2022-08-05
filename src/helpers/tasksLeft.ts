//Tasks Left Counter
const tasksLeft = (taskAmount: number): string => {
  let msg = ""
  if (taskAmount) {
    if (taskAmount === 1) {
      msg = "1 item left"
      return msg
    } else if (taskAmount > 1) {
      msg = `${taskAmount} items left`
      return msg
    } else {
      msg = "Nothing to do :)"
      return msg
    }
  }
  return msg
}

export default tasksLeft

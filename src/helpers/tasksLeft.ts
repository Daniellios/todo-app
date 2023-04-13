//Tasks Left Counter
const tasksLeft = (taskAmount: number): string => {
  let msg = "";
  if (taskAmount) {
    if (taskAmount === 1) {
      msg = "1 todo left";
      return msg;
    } else if (taskAmount > 1) {
      msg = `${taskAmount} todo's left`;
      return msg;
    } else {
      msg = "Nothing to do :)";
      return msg;
    }
  }
  return msg;
};

export default tasksLeft;

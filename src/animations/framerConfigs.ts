export const titleInputAnimiation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "linear" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "linear" } },
};

export const titleTextAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.2, ease: "linear" },
  },
  exit: {
    opacity: 0,
    display: "none",
    transition: { duration: 0.2, ease: "linear" },
  },
};

export const listAnimation = {
  hidden: { x: -100, opacity: 0.4 },
  visible: { x: 0, opacity: 1 },
  exit: { size: 0, opacity: 0 },
};

export const taskAnimation = {
  hidden: { size: 0, opacity: 0 },
  visible: {
    size: 1,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

export const taskFormAnimation = {
  hidden: {
    opacity: 0,
    transition: {
      ease: "linear",
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      ease: "linear",
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    display: "none",
    transition: { ease: "linear" },
  },
};

export const taskFormFoldedContainer = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "linear" },
  },
};

export const basicOpacityAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { size: 0, opacity: 0, transition: { duration: 0.2 } },
};

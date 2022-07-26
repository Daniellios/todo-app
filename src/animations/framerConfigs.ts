// TITLE INPUT
export const titleInputAnimiation = {
  hidden: { opacity: 0, scaleX: 0, x: -100 },
  visible: { opacity: 1, scaleX: 1, x: 0, transition: { delay: 0.1 } },
  exit: { scaleX: 0 },
}

// LIST
export const listAnimation = {
  hidden: { x: -100, opacity: 0.4 },
  visible: { x: 0, opacity: 1 },
}

// TASK
export const taskAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
}

// BASIC OPACITY
export const basicOpacityAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

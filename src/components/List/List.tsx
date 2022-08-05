import React from "react"
import { useEffect, useRef, useState } from "react"
import Form from "../Form/Form"
import TaskList from "../TaskList/TaskList"
import { AnimatePresence, motion, Reorder } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { ImCross } from "react-icons/im"
import {
  deleteList,
  setListName,
  selectAllLists,
} from "../../store/dayLIstSlice"

import { AiOutlineCheck } from "react-icons/ai"
import {
  titleInputAnimiation,
  listAnimation,
} from "../../animations/framerConfigs"

const List = ({ list }: IListComponent) => {
  const dispatch = useDispatch()
  const titleInput = useRef<HTMLInputElement>(null)

  const [todoList, setTodoList] = useState<ITask[]>([])

  const [title, setTitle] = useState<string>("")
  const [isTitleName, setIsTitleName] = useState<boolean>(false)

  const onTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value)

  const confirmTitle = (): void => {
    if (title) {
      dispatch(
        setListName({
          ...list,
          title,
        })
      )
      setIsTitleName(true)
    }
  }

  // Local Storage Setup
  const saveToLocalStorage = (): void => {
    if (localStorage.getItem("todoList") === null) {
      localStorage.setItem("todoList", JSON.stringify(todoList))
    } else {
      const storageList = JSON.parse(localStorage.getItem("todoList") || "{}")
    }
  }

  // Update Filtered List
  useEffect(() => {
    if (null !== titleInput.current) {
      titleInput.current.focus()
    }
    // saveToLocalStorage()
  }, [todoList, selectAllLists])

  return (
    <motion.div
      variants={listAnimation}
      initial="hidden"
      animate="visible"
      exit={{ size: 0, opacity: 0 }}
      className="flex flex-col w-full h-max gap-6 shadow-lg p-4  bg-paletteDarkGray rounded"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-center relative">
        {isTitleName ? (
          <>
            <h2 className="text-paletteTeal text-3xl  uppercase">{title}</h2>
            <ImCross
              onClick={() => dispatch(deleteList(list.listID))}
              className="absolute top-0 right-0 text-paletteWhite hover:text-paletteTeal hover:rotate-90 cursor-pointer transition"
            />
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              variants={titleInputAnimiation}
              initial="hidden"
              animate="visible"
              className="flex justify-center items-center space-x-4"
            >
              <input
                ref={titleInput}
                onChange={onTitleChange}
                value={title}
                type="text "
                placeholder="Give a name to your list"
                className="h-8 text-paletteTeal font-semibold bg-paletteDark/50 rounded-md  border-none placeholder:text-paletteWhite/70 px-4 focus:outline-none"
              />
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={
                  isTitleName ? { scale: 0.7, opacity: 0 } : { rotate: 10 }
                }
                exit={{ opacity: 0 }}
                className="flex items-center justify-start"
              >
                <AiOutlineCheck
                  onClick={confirmTitle}
                  size={"2rem"}
                  className="text-paletteWhite cursor-pointer hover:text-paletteTeal "
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {isTitleName ? (
        <>
          <Form list={list} />
          <TaskList todos={list.todoList} listID={list.listID} />
          {/* FOOTER */}
          <div className="w-full flex justify-between gap-4 items-center sm:flex-row">
            <span
              data-testid="items-counter"
              className="order-1 text-center  md:order-none md:text-left  md:text-lg text-paletteWhite  md:w-[130px] "
            >
              {list.listCount}
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
    </motion.div>
  )
}

export default List

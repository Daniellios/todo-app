import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Home from "../src/pages"
import Task from "../src/components/Task/Task"
import Filter from "../src/components/Filter/Filter"

const addTodo = (list: ITask[], item: ITask) => [...list, item]

const startTodoList = [
  { taskName: "Тестовое задание", isCompleted: true, id: 1 },
  { taskName: "Прекрасный Код", isCompleted: true, id: 2 },
  { taskName: "Покрытие тестами", isCompleted: true, id: 3 },
]

it("renders homepage correctly", () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})

it("Adds new to do correctly", () => {
  const newTodo = { taskName: "Новое Задание", isCompleted: false, id: 4 }

  const expected = [
    { taskName: "Тестовое задание", isCompleted: true, id: 1 },
    { taskName: "Прекрасный Код", isCompleted: true, id: 2 },
    { taskName: "Покрытие тестами", isCompleted: true, id: 3 },
    { taskName: "Новое Задание", isCompleted: false, id: 4 },
  ]

  const result = addTodo(startTodoList, newTodo)
  expect(result).toEqual(expected)
})

it("updates items left count correctly", () => {
  render(
    <Filter
      todoList={startTodoList}
      setTodoList={() => {
        addTodo
      }}
      setStatus={() => {}}
      filteredTodos={startTodoList}
      currentStatus={"all"}
    />
  )

  const todosCount = screen.getByTestId("items-counter")
  expect(todosCount).toHaveTextContent("Nothing to do :)")
})

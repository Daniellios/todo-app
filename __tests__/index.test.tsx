import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Home from "../src/pages"
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

test("if handles onclick ", () => {
  const onClick = jest.fn()
  render(<Home />)
  const buttonElement = screen.getByTestId("Add")
  buttonElement.addEventListener("click", onClick)
  fireEvent.click(buttonElement)
  expect(onClick).toHaveBeenCalledTimes(1)
})

test("if error is shown on empty input", () => {
  const onClick = jest.fn()
  render(<Home />)
  const inputElement = screen.getByPlaceholderText("Type your to do")
  const addTodoBtn = screen.getByText("Add To Do")
  addTodoBtn.addEventListener("click", onClick)
  fireEvent.click(addTodoBtn)
  expect(inputElement).toHaveClass("input-error")
})

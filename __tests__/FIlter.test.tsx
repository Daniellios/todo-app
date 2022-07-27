import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Filter from "../src/components/Filter/Filter"

beforeEach(() => {
  const mockFN = jest.fn()
  render(
    <Filter
      todoList={[]}
      setTodoList={mockFN}
      setStatus={mockFN}
      filteredTodos={[]}
      currentStatus={"all"}
    />
  )
})

test("if all filter is active by default", () => {
  const buttonElement = screen.getByText("All")
  expect(buttonElement).toHaveClass("filter-button-active")
})

it("Counts items left correctly", () => {
  const todosCount = screen.getByTestId("items-counter")
  expect(todosCount).toHaveTextContent("Nothing to do :)")
})

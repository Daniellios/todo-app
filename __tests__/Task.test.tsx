import { render, screen } from "@testing-library/react"
import Task from "../src/components/Task/Task"
import "@testing-library/jest-dom"
import React from "react"

it("renders task correctly with the right props", () => {
  const { container } = render(
    <Task
      task={"Task"}
      isCompleted={true}
      id={1}
      completeTask={function () {}}
    />
  )
  expect(container).toMatchSnapshot()
})

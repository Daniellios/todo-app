import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Day from "../components/Day/Day"
import Header from "../components/Header/Header"
import { weekDays, months } from "../components/constants/days"

const Home: NextPage = () => {
  const placeHolder = [
    {
      day: new Date().getDay(),
      month: months[new Date().getMonth()],
    },
  ]

  const [days, setDays] = useState<IDayProps[]>(placeHolder)

  const addNewDay = (): void => {
    const today = {
      date: new Date().getDay(),
      month: months[new Date().getMonth()],
    }
    setDays([...days, today])
  }

  return (
    <>
      <Head>
        <title>Your To Do's</title>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden">
        <Header />
        <div className="w-full grid grid-cols-daysList gap-4 px-4 my-4 auto-rows-auto">
          {days.map((date: IDayProps, index: number) => {
            return <Day key={index} day={date.day} month={date.month} />
          })}
        </div>
      </main>
    </>
  )
}

export default Home

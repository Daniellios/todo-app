import type { NextPage } from "next"
import Head from "next/head"
import { AnimatePresence, motion, Reorder } from "framer-motion"
import List from "../components/List/List"
import Header from "../components/ControlPanel/ControlPanel"
import { useSelector } from "react-redux"
import { selectAllLists } from "../store/dayLIstSlice"

const Home: NextPage = () => {
  const lists = useSelector(selectAllLists)

  console.log(lists)

  return (
    <>
      <Head>
        <title>Your To Dos</title>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden scrollbar">
        <Header />
        <div className="w-full grid justify-items-center justify-center grid-cols-daysListTiny sm:grid-cols-daysListSm  md:grid-cols-daysListMd xl:grid-cols-daysListXl gap-4 px-4 my-4 auto-rows-auto max-w-[1440px]">
          <AnimatePresence>
            {lists.map((list: IListProps) => (
              <List key={list.listID} list={list} />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

export default Home

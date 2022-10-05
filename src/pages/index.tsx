import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/ControlPanel/ControlPanel";

import TaskCardList from "../components/TaskCard/TaskCardList";
import Script from "next/script";
// @ts-ignore
import { useTg } from "../utils/hooks/useTg";

const Home: NextPage = () => {
  const tg = useTg();

  console.log(tg);

  const onClose = () => {
    tg.close();
  };

  return (
    <>
      <Head>
        <title>To Do</title>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden scrollbar">
        <Header />

        <button className="bg-white p-1 font-bold rounded" onClick={onClose}>
          ТЕСТИРУЕМ
        </button>
        <Script></Script>

        <TaskCardList></TaskCardList>
      </main>
    </>
  );
};

export default Home;

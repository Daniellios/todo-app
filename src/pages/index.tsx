import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/ControlPanel/ControlPanel";

import BoardsList from "../components/BoardCanvas/BoardList";
import Script from "next/script";
import BoardModalCreator from "../components/BoardModalCreator";

export const metadata = {
  title: "Kanban",
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden scrollbar">
        <Header />

        <Script></Script>

        <BoardModalCreator></BoardModalCreator>

        <BoardsList></BoardsList>
      </main>
    </>
  );
};

export default Home;

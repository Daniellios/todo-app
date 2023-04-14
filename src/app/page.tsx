"use client";

import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/ControlPanel/ControlPanel";

import { useSelector } from "react-redux";
import { selectModalStatus } from "../store/uiSlice";
import BoardModalCreator from "../components/BoardModalCreator";
import BoardsList from "../components/BoardCanvas/BoardList";
import "../styles/globals.css";

const Home: NextPage = () => {
  const isOpen = useSelector(selectModalStatus);

  return (
    <>
      <Head>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isOpen && <div className="overlay"></div>}

      <main className="mx-auto flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden scrollbar">
        <Header />

        <BoardModalCreator></BoardModalCreator>

        <BoardsList></BoardsList>
      </main>
    </>
  );
};

export default Home;
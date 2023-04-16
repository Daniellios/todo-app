"use client";

import type { NextPage } from "next";
import Head from "next/head";
import ControlPanel from "../components/ControlPanel/ControlPanel";

import { useSelector } from "react-redux";
import { selectModalStatus } from "../store/uiSlice";
import BoardModalCreator from "../components/BoardModalCreator";
import BoardsList from "../components/BoardCanvas/BoardList";
import "../styles/globals.css";
import Footer from "../components/Footer/Footer";

const Home: NextPage = () => {
  const isOpen = useSelector(selectModalStatus);

  return (
    <>
      <Head>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isOpen && <div className="overlay"></div>}
      <ControlPanel />
      <main className="mx-auto flex flex-col items-center justify-start min-h-full  w-screen overflow-x-hidden ">
        <BoardModalCreator></BoardModalCreator>

        <BoardsList></BoardsList>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Home;

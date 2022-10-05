import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/ControlPanel/ControlPanel";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { useSession } from "../utils/hooks/useSession";
import TaskCardList from "../components/TaskCard/TaskCardList";
import Script from "next/script";
// @ts-ignore
import { useTg } from "../utils/hooks/useTg";

const Home: NextPage = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // if (typeof window !== "undefined") {
  //   const tg: any = window.Telegram.WebApp;

  const tg = useTg();

  // const testing = async () => {
  //   let { data: User, error } = await supabase.from("User").select("*");

  //   console.log(User);

  //   console.log(error);
  // };

  // useEffect(() => {
  //   console.log(window.Telegram);
  // }, []);
  // const tg = window.Telegram.WebApp;

  // testing();
  // const [session, setSession] = useState<Session | null>(null);
  // useEffect(() => {
  //   let mounted = true;

  //   async function getInitialSession() {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();

  //     // only update the react state if the component is still mounted
  //     if (mounted) {
  //       if (session) {
  //         setSession(session);
  //       }

  //       setIsLoading(false);
  //     }
  //   }

  //   getInitialSession();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  //   return () => {
  //     mounted = false;

  //     subscription?.unsubscribe();
  //   };
  // }, []);

  //useSESSION loading

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

import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/ControlPanel/ControlPanel";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useSession } from "../utils/hooks/useSession";
import TaskCardList from "../components/TaskCard/TaskCardList";

const Home: NextPage = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const { session, isLoading } = useSession();

  console.log(session);
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

  return (
    <>
      <Head>
        <title>Your To Dos</title>
        <meta name="description" content="Daniil Blinnikov" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex flex-col items-center justify-start h-screen w-screen overflow-x-hidden scrollbar">
        <Header />

        <TaskCardList></TaskCardList>
      </main>
    </>
  );
};

export default Home;

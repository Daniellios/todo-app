import type { NextPage } from "next";
import Head from "next/head";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import List from "../components/List/List";
import Header from "../components/ControlPanel/ControlPanel";
import { useSelector } from "react-redux";
import { selectAllLists } from "../store/dayLIstSlice";
import SignInForm from "../components/Authentification/SignInForm";
import ProfileForm from "../components/Authentification/ProfileForm";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useSession } from "../utils/hooks/useSession";

const Home: NextPage = () => {
  const lists = useSelector(selectAllLists);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const TEST = useSession();
  console.log(TEST);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

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

        {!session ? (
          <SignInForm />
        ) : (
          <ProfileForm key={session.user.id} session={session} />
        )}
      </main>
    </>
  );
};

export default Home;

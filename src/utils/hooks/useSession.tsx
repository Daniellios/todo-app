import { AuthSession, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    const sessionData = supabase.auth
      .getSession()
      .then((res) => {
        return res.data.session;
      })
      .catch((err) => console.log(err));
    // console.log(supabase.auth.session());

    setSession(null);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session;
};

import { AuthSession } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useSession = () => {
  const [session, setSession] = useState<AuthSession | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSessionData = async () => {
    await supabase.auth
      .getSession()
      .then((res) => {
        // console.log(res);
        setSession(res.data.session);
        setIsLoading(false);
        return res.data.session;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSessionData();
    setSession(null);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return { session, isLoading };
};

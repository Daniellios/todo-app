import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignInForm from "../components/Authentification/SignInForm";
import { useSession } from "../utils/hooks/useSession";

const Signin = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);

    if (session) {
      console.log("pushed");
      router.push("/");
    }
  }, [session]);

  if (session) return null;

  return <SignInForm></SignInForm>;
};

export default Signin;

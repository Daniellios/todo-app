import React from "react";

import ProfileForm from "../components/Authentification/ProfileForm";
import { useSession } from "../utils/hooks/useSession";

const Account = () => {
  const { session, isLoading } = useSession();
  if (!session) return null;

  return <ProfileForm session={session}></ProfileForm>;
};

export default Account;

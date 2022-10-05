import { AuthSession } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

interface IProfile {
  username: string;
  website: string;
  avatar_url: string;
}

type Account = {
  session?: AuthSession;
};

const ProfileForm = ({ session }: Account) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    // getProfile();
  }, [session]);

  const getCurrentUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user) {
      throw new Error("User not logged in");
    }

    return session.user;
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      let { data, error, status } = await supabase
        .from("users")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data?.username);
      }
    } catch (error) {
      alert("HERE" + error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ username }: IProfile) => {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleWebSiteChange = (e: React.FormEvent<HTMLInputElement>) => {
    setWebsite(e.currentTarget.value);
  };

  const handleUpdateProfileInfo = () => {
    updateProfile({ username, website, avatar_url });
  };

  const handleSignOut = () => {
    supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">User name</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={handleWebSiteChange}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={handleUpdateProfileInfo}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button className="button block" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;

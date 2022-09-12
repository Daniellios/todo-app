import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

interface IProfile {
  username: string;
  website: string;
  avatar_url: string;
}

type Account = {
  session: Session;
};

const ProfileForm = ({ session }: Account) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    getProfile();
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
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ username, website, avatar_url }: IProfile) => {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
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

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">SFASFASFASFSAF</label>
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
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url })}
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

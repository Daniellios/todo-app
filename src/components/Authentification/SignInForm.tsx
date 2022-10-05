import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const SignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      // const { error, data } = await supabase.auth.signInWithOtp({ email });

      const { error, data } = await supabase.auth.signInWithOtp({
        email: email,

        // password: "ssss512",
        // options: {
        //   data: {
        //     username: username,
        //   },
        // },
      });

      if (error) throw error;
      // const { data, error } = await supabase
      //   .from("User")
      //   .insert([{ some_column: "someValue", other_column: "otherValue" }]);

      alert("Check your email for the login link!");
    } catch (error) {
      if (error) {
        setIsInputError(true);
        setTimeout(() => {
          setIsInputError(false);
        }, 1500);
      }
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleSetUserName = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const handleSetWebsite = (e: React.FormEvent<HTMLInputElement>) => {
    setWebsite(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col w-[320px] mx-auto mt-10 gap-4 justify-center items-center bg-paletteDarkGray p-4 rounded">
      <h1 className="text-2xl text-white font-bold uppercase">Authorization</h1>
      <p className="text-paletteWhite text-lg text-center">
        Sign in via magic link with your email below
      </p>
      <div className="flex flex-col gap-4">
        <input
          className="p-2 h-8 text-paletteTeal font-semibold bg-paletteDark/50 rounded-md  border-none placeholder:text-paletteWhite/70 px-4 focus:outline-none"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={handleSetEmail}
        />
        <input
          className="p-2 h-8 text-paletteTeal font-semibold bg-paletteDark/50 rounded-md  border-none placeholder:text-paletteWhite/70 px-4 focus:outline-none"
          type="email"
          placeholder="Your username"
          value={username}
          onChange={handleSetUserName}
        />
        <input
          className="p-2 h-8 text-paletteTeal font-semibold bg-paletteDark/50 rounded-md  border-none placeholder:text-paletteWhite/70 px-4 focus:outline-none"
          type="email"
          placeholder="Your website"
          value={website}
          onChange={handleSetWebsite}
        />
      </div>
      <div>
        <button
          onClick={handleLogin}
          className={`w-full px-4 py-2 border-2 border-paletteTeal font-bold rounded text-white text-lg hover:bg-paletteWhite hover:text-paletteDark ${
            isInputError ? "border-red-500" : "border-paletteTeal "
          } `}
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Send magic link"}</span>
        </button>
      </div>
    </div>
  );
};

export default SignInForm;

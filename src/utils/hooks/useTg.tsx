import { useEffect, useState } from "react";

export const useTg = () => {
  const [webApp, setWebApp] = useState<any>();

  useEffect(() => {
    // @ts-ignore
    const tg = window.Telegram.WebApp;
    tg.ready();
    setWebApp(tg);
  }, []);

  return webApp;
};

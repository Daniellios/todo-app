import React from "react";

import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

const footerFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Footer = () => {
  return (
    <footer className="w-full bg-paletteTeal flex flex-col justify-center z-50 mt-auto  items-center text-center py-4">
      <div className="flex space-x-2 justify-center items-centers">
        <Link
          href={"https://t.me/DaBlinni"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-paletteDark hover:text-paletteWhite transition-colors"
        >
          <BsTelegram size={"2rem"}></BsTelegram>
        </Link>

        <Link
          href={"mailto:danielo49134@gmail.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-paletteDark hover:text-paletteWhite transition-colors"
        >
          <SiGmail size={"2rem"}></SiGmail>
        </Link>
      </div>

      <Link
        href={"https://my-portfolio-blue-pi.vercel.app"}
        className={` text-paletteDark font-normal text-lg  sm:text-2xl hover:text-paletteWhite transition ${footerFont.className} mt-2`}
      >
        Desinged {"&"} Built by Daniil Blinnikov
      </Link>
    </footer>
  );
};

export default Footer;

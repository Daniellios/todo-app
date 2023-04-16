import React from "react";

import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const footerFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Footer = () => {
  return (
    <footer className="w-full bg-paletteTeal flex justify-center h-16 z-50 mt-auto  items-center text-center ">
      <Link
        href={"https://my-portfolio-blue-pi.vercel.app"}
        className={` text-paletteDark font-semibold text-lg  sm:text-2xl hover:text-paletteWhite transition ${footerFont.className}`}
      >
        Desinged {"&"} Built by Daniil Blinnikov
      </Link>
    </footer>
  );
};

export default Footer;

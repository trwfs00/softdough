import Sidebar from "@components/admin-softdough/Sidebar";
import "@/styles/globals.css";
import React from "react";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const IBM = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Sidebar className={IBM.className}>
        <Component {...pageProps} />
      </Sidebar>
    </React.Fragment>
  );
}

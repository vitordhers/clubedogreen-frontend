import { GeneralProvider } from "@/contexts/GeneralContext";
import { TimerProvider } from "@/contexts/TimerContext";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TimerProvider>
      <GeneralProvider>
        <UserProvider>
          <div>
            <Head>
              {/* Add your meta tags here */}
              {/* <link rel="manifest" href="/manifest.json" /> */}
              <meta name="title" content="yes" />
              <title>Clube do green</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
              />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
              />
            </Head>
            <Component {...pageProps} />
          </div>
        </UserProvider>
      </GeneralProvider>
    </TimerProvider>
  );
}

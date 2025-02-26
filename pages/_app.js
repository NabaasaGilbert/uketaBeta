import "../styles/globals.css";
import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarEl from "../components/layout/NavbarEl";
import FooterEl from "../components/layout/FooterEl";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
// import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import { SWRConfig } from "swr";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const router = new useRouter();

  // async function nameHandler(enteredUserData) {
  //   const nameResponse = await fetch("/api/user/userDataSubmitHandler", {
  //     method: "POST",
  //     body: JSON.stringify(enteredUserData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((f) => f.json());
  //   router.reload();
  // }

  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Analytics />
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SSRProvider>
        <SessionProvider session={session}>
          <RecoilRoot>
            <SWRConfig
              value={{
                fetcher: fetchJson,
                onError: (err) => {
                  console.error(err);
                },
              }}
            >
              <NavbarEl />
              <Component {...pageProps} />
              <FooterEl />
            </SWRConfig>
          </RecoilRoot>
        </SessionProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;

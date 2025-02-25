import LoginForm from "../components/loginpage/LoginFormEl";
import useUser from "../lib/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const { user } = useUser();
  const router = new useRouter();
  const [responseMessage, setReponseMessage] = useState({});

  async function loginHandler(enteredUserData) {
    const loginResponse = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setReponseMessage(loginResponse);
    if (loginResponse.status === 200) {
      router.reload();
    }
  }

  useEffect(() => {
    if (user?.isLoggedIn === true) router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Login | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Login | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/login" />
        <meta name="robots" content="all" />
      </Head>
      <div>
        <LoginForm onSubmit={loginHandler} loginResponse={responseMessage} />        
      </div>
    </>
  );
}

import SignupForm from "../../../components/coaches/signuppage/SignupFormEl"
import useUser from "../../../lib/useUser"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignupPage() {
  const { user } = useUser();
  const router = new useRouter();
  const [responseMessage, setReponseMessage] = useState({});

  async function signUpHandler(enteredUserData) {
    const signupResponse = await fetch("/api/instructor/signup", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setReponseMessage(signupResponse);
    console.log({signupResponse});
    // if (signupResponse.status === 200) {
    //   router.reload();
    // }
  }

  useEffect(() => {
    if (user?.isLoggedIn === true) router.push("/coach/login");
  }, [user]);

  return (
    <>
      <Head>
        <title>Sign-up | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Sign-up | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/signup" />
        <meta name="robots" content="all" />
      </Head>
      <div>
        <SignupForm onSubmit={signUpHandler} signupResponse={responseMessage} />
      </div>
    </>
  );
}

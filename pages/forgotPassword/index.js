import ForgotPasswordForm from "../../components/forgotpassword/ForgotPasswordFormEl";
import useUser from "../../lib/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Spinner from "react-bootstrap/Spinner";

export default function LoginPage() {
  const { user } = useUser();
  const router = new useRouter();
  const [responseMessage, setReponseMessage] = useState({});
  const [loading, setLoading] = useState(false);


  async function loginHandler(enteredUserData) {
    // const loginResponse = await fetch("/api/coach/login", {
    //   method: "POST",
    //   body: JSON.stringify(enteredUserData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => res.json()).catch(err => {
    //   console.log(err);
    // })
    setLoading(true);
    console.log(enteredUserData)

    await fetch("/api/instructor/login", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log({ result: res });
        // res.json();
        setReponseMessage(res);
        setLoading(false);

        if (res.status === 200) {
          setReponseMessage({message: "Success. You loggedin successfully !!"})
          router.reload();
        } else if (res.status === 404) {
          // alert("An error occurred logging in. Please try again");
          setReponseMessage({message: "Endpoint not found. Please try again"})
        } else {
          // alert("You entered wrong Credentilas. Please try again");
          setReponseMessage({message: "You entered wrong credentials"})
        }
      })
      .catch((err) => {
        setLoading(false);
        setReponseMessage({message: "An error occurred logging in. Please try again"})
        console.log({ err });
      });

    // setReponseMessage(loginResponse);
    // if (loginResponse.status === 200) {
    //   router.reload();
    // }
  }

  useEffect(() => {
    if (user?.isLoggedIn === true) router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Forgot Password | Uketa Learning - Unlock, Understand, Uplift</title>
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
        <ForgotPasswordForm onSubmit={loginHandler} loginResponse={responseMessage} loading={loading} />
      </div>
    </>
  );
}

import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import classes from "./LoginForm.module.css";
// import Image from "next/image";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginForm(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const Response = props.loginResponse;
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const emailInputRef = useRef();
  const secretInputRef = useRef();

  const { ref,email } = router.query;

  console.log({ ref });

  const handleCredentialsSubmitLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccessMsg("");

    const enteredEmail = emailInputRef.current.value;
    const enteredSecret = secretInputRef.current.value;

    const checkUserData = {
      email: enteredEmail,
      secret: enteredSecret,
    };

    // props.onSubmit(checkUserData);
    setLoading(true);
    axios
      .post("/api/login", checkUserData)
      .then(async (response) => {
        setLoading(false);
        if (response.data.status === 200) {
          setSuccessMsg(response.data.message);
          if (response.data.user.userData.email === "admin@uketa.online") {
            console.log({
              email: response.data.user.userData.email,
            });
            router.push("/admin/dashboard");
            // setTimeout(() => {
            //   location.reload();
            //   router.push('/');
            // }, 200);
          } else {
            await setTimeout(() => {
              
              router.push(`/`);
              localStorage.setItem("referer",ref)
              localStorage.setItem("refererEmail",email)
              location.reload();              
            }, 200);
            // location.reload();
          }
        } else {
          return setError(response.data.message);
        }
      })
      .catch((error) => {
        setError("Something went wrong`! Please try again.");
        return setLoading(false);
      });
  };

  return (
    <div className={classes.LoginSection}>
      <img src="/logo/Uketa Logo.png" alt="" />
      <p className="sectionHeader">Student Login</p>

      <Form
        onSubmit={handleCredentialsSubmitLogin}
        className={classes.LoginForm}
      >
        <Form.Group className="mb-3">
          <Form.Control
            type="hidden"
            id="csrfToken"
            name="csrfToken"
            // defaultValue={csrfToken}
            // ref={crsfInputRef}
            // required
          />
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
            className="mb-1"
          />
          <Form.Control
            type="password"
            id="secret"
            name="secret"
            placeholder="Enter password"
            ref={secretInputRef}
            required
          />
        </Form.Group>

        <div className="w-100 text-right fw-italic">
          <i className="text-right">
            <a href="/forgotPassword" className="text-white">
              Forgot Password
            </a>
          </i>
        </div>

        <div className="d-flex mx-auto mb-3">
          {error && (
            <Badge bg="danger" className="p-3 text-center w-100" pill>
              {error}
            </Badge>
          )}
        </div>

        <div className="d-flex mx-auto mb-3">
          {successMsg && (
            <Badge bg="success" className="p-3 text-center w-100" pill>
              {successMsg}
            </Badge>
          )}
        </div>

        {/* <Form.Group className="mb-3">
          {Response.status === 200 ? (
            <Badge key={Response.status} bg="success" pill>
              {Response.message}
            </Badge>
          ) : (
            <Badge key={Response.status} bg="danger" pill>
              {Response.message}
            </Badge>
          )}
        </Form.Group> */}

        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" className="defaultButton mb-3">
            Submit
          </Button>
        )}
      </Form>

      <div className="pb-5 mb-5">
        Do not have an account?{" "}
        <a href="/signup" className="text-white">
          Create One Here
        </a>
      </div>

      {/* <p className={classes.separator}>OR</p>

      <Button onClick={() => signIn('google')} className="defaultButton my-5">
        <BsGoogle className={classes.GoogleIcon} /> <br />
        Login with Google
      </Button> */}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const Response = props.loginResponse;

  const emailInputRef = useRef();
  const secretInputRef = useRef();
  const router = new useRouter();

  const handleCredentialsSubmitLogin = async (event) => {
    try {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredSecret = secretInputRef.current.value;
      if (!enteredEmail || !enteredSecret)
        return setError("Please fill in all required fields");

      const checkUserData = {
        email: enteredEmail,
        secret: enteredSecret,
      };
      setError("");
      setSuccessMsg("");

      setLoading(true);
      axios
        .post("/api/instructor/login", checkUserData)
        .then(async (response) => {
          setLoading(false);
          if (response.data.status === 200) {
            setSuccessMsg(response.data.message);
            setTimeout(() => {
              location.reload();
              router.push("/");
            }, 1500);
          } else {
            return setError(response.data.message);
          }
        })
        .catch((error) => {
          setError("Something went wrong`! Please try again.");
          return setLoading(false);
        });
    } catch (error) {}
  };

  return (
    <div className={classes.LoginSection}>
      <img src="/logo/Uketa Logo.png" alt="" className="" />
      <p className="sectionHeader">Coach Login</p>

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
            <a href="/coach/forgotPassword" className="text-orange">
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

      {/* {console.log({ Response })} */}

      <div>
        Do not have account.{" "}
        <a href="/coach/signup" className="text-orange">
          Create One
        </a>
      </div>

      {/* <p className={classes.separator}>OR</p>

       <Button onClick={() => signIn("google")} className="defaultButton">
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

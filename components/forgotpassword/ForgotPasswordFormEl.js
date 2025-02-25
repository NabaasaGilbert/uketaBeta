import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import classes from "./ForgotPasswordForm.module.css";
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
      if (!enteredEmail)
        return setError("Please fill in all required fields");

      const checkUserData = {
        email: enteredEmail
      };
      setError("");
      setSuccessMsg("");

      setLoading(true);
      axios
        .post("/api/user/generateResetPasswordToken", checkUserData)
        .then(async (response) => {
          setLoading(false);
          console.log(response)
          if (response.data.status === 200) {
            setSuccessMsg(response.data.message);
            // setTimeout(() => {
            //   location.reload();
            //   router.push("/");
            // }, 1500);
          } else {
            return setError(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error)
          setError("Something went wrong`! Please try again.");
          return setLoading(false);
        });
    } catch (error) {}
  };

  return (
    <div className={classes.LoginSection}>
      <img src="/logo/Uketa Logo.png" alt="" className="" />
      <p className="sectionHeader">Student Forgot Password</p>

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
        </Form.Group>      

        <div className="d-flex mx-auto mb-3">
          {error && (
            <Badge bg="danger" className="p-3 text-center w-100 text-wrap" pill>
              {error}
            </Badge>
          )}
        </div>
        

        <div className="d-flex mx-auto mb-3">
          {successMsg && (
            <Badge bg="success" className="p-3 text-center w-100 text-wrap" pill>
              {successMsg}
            </Badge>
          )}
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" className="defaultButton mb-3">
            Get Reset Password Link
          </Button>
        )}
      </Form>

      {/* {console.log({ Response })} */}

      <div>
        Get out of here.{" "}
        <a href="/login" className="text-white">
          Back
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

import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import classes from "./ResetPassword.module.css";
// import Image from "next/image";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useRouter } from "next/router";

export default function ResetPassword(props) {
  const router = new useRouter();
  const { email, token } = router.query;

  console.log({ email, token });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const Response = props.loginResponse;

  const emailInputRef = useRef();
  const secretInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [passwordState, setPasswordState] = useState(false);

  const handleCredentialsSubmit = async (event) => {
    try {
      event.preventDefault();
      setError("");

      const enteredEmail = emailInputRef.current.value;
      const enteredSecret = passwordInputRef.current.value;
      const enteredConfirmSecret = confirmPasswordInputRef.current.value;
      if (!enteredEmail || !enteredSecret || !enteredConfirmSecret)
        return setError("Please fill in all required fields");

      console.log({ enteredSecret, enteredConfirmSecret });

      if (enteredSecret !== enteredConfirmSecret)
        return setError("Passwords do not match");

      const checkUserData = {
        email: enteredEmail,
        secret: enteredSecret,
        token,
        confirmSecret: enteredConfirmSecret,
      };

      setError("");
      setSuccessMsg("");

      setLoading(true);
      axios
        .post("/api/user/resetPassword", checkUserData)
        .then(async (response) => {
          setLoading(false);
          if (response.data.status === 200) {
            setSuccessMsg(response.data.message);
            setTimeout(() => {
              // location.reload();
              router.push('/login');
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
      <p className="sectionHeader">User Reset Password</p>

      <Form onSubmit={handleCredentialsSubmit} className={classes.LoginForm}>
        <Form.Group className="mb-3">
          <Form.Control type="hidden" id="csrfToken" name="csrfToken" />
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter email"
            ref={emailInputRef}
            disabled
            className="mb-2"
            required
          />
          <Form.Group className="mb-3" controlId="addUserFormPass">
            <Form.Label>
              <span>* </span>New Password:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={passwordInputRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="addUserFormConfPass">
            <Form.Label>
              <span>* </span>Confirm Password:{" "}
              {passwordState === false ? "" : "(Password Matches)"}
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-Enter Password"
              className={passwordState === false ? "" : classes.SuccessPassword}
              ref={confirmPasswordInputRef}
              onChange={(e) =>
                e.currentTarget.value === passwordInputRef.current.value
                  ? setPasswordState(true)
                  : setPasswordState(false)
              }
              required
            />
          </Form.Group>
        </Form.Group>

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

        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" className="defaultButton mb-3">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

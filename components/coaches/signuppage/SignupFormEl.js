import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import classes from "./SignupForm.module.css";
// import Image from "next/image";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/router";

export default function SignupForm(props) {
  const [loading, setLoading] = useState(false);
  const Response = props.signupResponse;
  const router = new useRouter();

  const [passwordState, setPasswordState] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function signinSubmitHandler(event) {
    event.preventDefault();
    setError("");
    setSuccessMsg("");
    const enteredName =
      nameInputRef.current?.value === null ? "" : nameInputRef.current?.value;
    const enteredEmail =
      emailInputRef.current?.value === null ? "" : emailInputRef.current?.value;
    const enteredPassword =
      passwordInputRef.current?.value === null
        ? ""
        : passwordInputRef.current?.value;
    const enteredConfirmPassword =
      confirmPasswordInputRef.current?.value === null
        ? ""
        : confirmPasswordInputRef.current?.value;

    if (
      !enteredName ||
      !enteredEmail ||
      !enteredPassword ||
      !enteredConfirmPassword
    ) {
      return setError("Please enter all required fields");
    }

    if(enteredPassword != enteredConfirmPassword){
      return setError("Passwwords do not match")
    }

    if (enteredEmail.toLowerCase() === "admin@uketa.online") {
      return setError("Email already in use");
    }

    const addUserData = {
      name: enteredName,
      email: enteredEmail,
      secret: enteredPassword,
      confirmSecret: enteredConfirmPassword,
    };

    // props.onSubmit(addUserData);

    setLoading(true);

    // Handling the request with axios
    axios
      .post("/api/instructor/signup", addUserData)
      .then(async (response) => {
        setLoading(false);
        console.log(response.data);

        if (response.data.status === 200) {
          setSuccessMsg(response.data.message);
          setTimeout(() => {
            router.push("/coach/login");
          }, 1500);
        } else {
          return setError(response.data.message);
        }
      })
      .catch((error) => {
        console.log({ error });
        setError("Something went wrong`! Please try again.");
        return setLoading(false);
      });

    // Handling the request with fetch APi
    // await fetch("/api/instructor/signup", {
    //   method: "POST",
    //   body: JSON.stringify(addUserData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res)
    //     router.push("/coach/login");
    //   }).catch((err) => {
    //     console.log(err)
    //   });
  }

  return (
    <div className={classes.LoginSection}>
      <img src="/logo/Uketa Logo.png" alt="" className={classes.SignupLogo} />
      <p className="sectionHeader">Coach Sign-up</p>
      {/* <div className="alert alert-danger">Alert</div> */}
      <Form
        onSubmit={signinSubmitHandler}
        className={classes.SignupForm + " text-center"}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            ref={nameInputRef}
            type="text"
            placeholder="Angel Agaba"
            autoFocus
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="addUserFormPass">
          <Form.Label>
            <span>* </span>Password:
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            // disabled={!UserData ? false : true}
            // required={UserData != null ? false : true}/
            ref={passwordInputRef}
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
            // required={UserData != null ? false : true}
            // disabled={!UserData ? false : true}
            // variant={passwordState === false ? null : "success"}
            ref={confirmPasswordInputRef}
            onChange={(e) =>
              e.currentTarget.value === passwordInputRef.current.value
                ? setPasswordState(true)
                : setPasswordState(false)
            }
          />
          {/* <BiLogOut className={classes.icon} /> */}
        </Form.Group>

        <Form.Group
          // variant="bordered-success"
          className="mb-3"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={emailInputRef}
            type="email"
            // value={!session ? null : session.user.email}
            // disabled
          />
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

        {/* <Form.Group className="mb-3">
          {Response.status === 200 ? (
            <Badge key={Response.status} className="p-3" bg="success" pill>
              {Response.message}
            </Badge>
          ) : (
            <Badge key={Response.status} className="p-3" bg="danger" pill>
              {Response.message}
            </Badge>
          )}
        </Form.Group> */}

        {loading ? (
          <Spinner />
        ) : (
          <Button className="defaultButton" type="submit">
            Submit
          </Button>
        )}
      </Form>

      <div>
        Already have an account.{" "}
        <a href="/coach/login" className="text-orange">
          Login Here
        </a>
      </div>

      {/* <Form onSubmit={handleEmailSubmitLogin} className={classes.LoginForm}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>

        <Button type="submit" className="defaultButton mb-3">
          Submit
        </Button>
      </Form> */}
      {/* <p className={classes.separator}>OR</p> */}

      {/* <Button onClick={() => signIn("google")} className="defaultButton">
        <BsGoogle className={classes.GoogleIcon} /> <br />
        Sign up with Google
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

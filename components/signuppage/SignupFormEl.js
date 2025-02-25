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
import PhoneInput, {
  formatPhoneNumberIntl,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function SignupForm(props) {
  const [loading, setLoading] = useState(false);
  const Response = props.signupResponse;
  const router = new useRouter();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [passwordState, setPasswordState] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [phone, setPhone] = useState("");
  // const secretInputRef = useRef();

  // const handleEmailSubmitLogin = (event) => {
  //   event.preventDefault();

  //   setLoading(true);

  //   const enterEmailInput = emailInputRef.current.value;
  //   signIn("email", { email: enterEmailInput });
  // };

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

    if (!phone) return setError("Please enter phone number");
    if (!isValidPhoneNumber(phone)) {
      return setError("Invalid Phone Number");
    }
    setError("");

    const addUserData = {
      name: enteredName,
      phone: phone,
      email: enteredEmail,
      secret: enteredPassword,
      confirmSecret: enteredConfirmPassword,
    };

    // props.onSubmit(addUserData);
    // handleClose();

    setLoading(true);

    // Handling the request with axios
    axios
      .post("/api/signup", addUserData)
      .then(async (response) => {
        setLoading(false);
        console.log(response.data);

        if (response.data.status === 200) {
          setSuccessMsg(response.data.message);
          setTimeout(() => {
            router.push("/login");
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
  }

  return (
    <div className={classes.LoginSection}>
      <img src="/logo/Uketa Logo.png" alt="" className={classes.SignupLogo} />
      <p className="sectionHeader">Student SignUp</p>
      <Form
        onSubmit={signinSubmitHandler}
        className={classes.SignupForm + " text-center"}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            Fullname<span className="">* </span>{" "}
          </Form.Label>
          <Form.Control
            ref={nameInputRef}
            type="text"
            placeholder="Angel Agaba"
            autoFocus
            required
          />
        </Form.Group>

        <Form.Group
          // variant="bordered-success"
          className="mb-3 signupPhoneWrap"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label>
            Phone Number<span className="">* </span>{" "}
          </Form.Label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            withCountryCallingCode={true}
            onChange={(e) => {
              setPhone(e);
            }}
            international
            defaultCountry="UG"
            className="form-control"
            smartCaret={true}
            countryCallingCodeEditable={true}
          />
        </Form.Group>

        <Form.Group
          // variant="bordered-success"
          className="mb-3"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label>
            Email<span className="">* </span>{" "}
          </Form.Label>
          <Form.Control
            ref={emailInputRef}
            type="email"
            placeholder="angel@gmail.com"
            // value={!session ? null : session.user.email}
            // disabled
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="addUserFormPass">
          <Form.Label>
            Password:<span className="">* </span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            // disabled={!UserData ? false : true}
            // required={UserData != null ? false : true}/
            ref={passwordInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="addUserFormConfPass">
          <Form.Label>
            Confirm Password:<span className="">* </span> <br />
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
            required
          />
          {/* <BiLogOut className={classes.icon} /> */}
        </Form.Group>

        <Form.Group className="mb-3">
          {Response.status === 200 ? (
            <Badge key={Response.status} bg="success" pill>
              {Response.message}
            </Badge>
          ) : (
            <Badge key={Response.status} bg="danger" pill>
              {Response.message}
            </Badge>
          )}
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
          <Button className="defaultButton" type="submit">
            Submit
          </Button>
        )}
      </Form>
      <div className="py-3 pb-5 mb-5">
        Already have an account.{" "}
        <a href="/login" className="text-white">
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
      {/* <p className={classes.separator}>OR</p>

      <Button onClick={() => signIn('google')} className="defaultButton my-5">
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

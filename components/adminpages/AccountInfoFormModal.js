// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { BiShow } from "react-icons/bi";
// import { useRecoilValue } from "recoil";

export default function EditUserInfoForm(props) {
  const nameInputRef = useRef();
  const userIDInputRef = useRef();
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const re_newPasswordInputRef = useRef();
  const userData = props.currentUser;
  const [passwordVisible, setPasswordVisible] = useState(false);
  //   const currentCourseData = props.courseData;

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  function courseSubmitHandler(event) {
    event.preventDefault();

    const enteredUserID =
      userIDInputRef.current?.value === "" ? "" : userIDInputRef.current?.value;
    const enteredUsername =
      nameInputRef.current?.value === "" ? "" : nameInputRef.current?.value;
    const enteredOldPassword =
      oldPasswordInputRef.current?.value === ""
        ? ""
        : oldPasswordInputRef.current?.value;
    const enteredNewPassword =
      newPasswordInputRef.current?.value === ""
        ? ""
        : newPasswordInputRef.current?.value;
    const enteredRe_newPassword =
      re_newPasswordInputRef.current?.value === ""
        ? ""
        : re_newPasswordInputRef.current?.value;

    const editUserData = {
      userId: enteredUserID,
      name: enteredUsername,
      oldSecret: enteredOldPassword,
      newSecret: enteredNewPassword,
      re_newSecret: enteredRe_newPassword,
    };

    props.onEditUserInfo(editUserData);

    // handleClose();
  }

  return (
    <Modal
      {...props}
      size="md"
      centered
      aria-labelledby="EdtiUserInfoFormModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Personal Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={courseSubmitHandler}>
          <Form.Group>
            <Form.Control
              ref={userIDInputRef}
              type="text"
              hidden
              defaultValue={userData?.id}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              ref={nameInputRef}
              defaultValue={userData?.name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Email: (Your email address cannnot be changed)
            </Form.Label>
            <Form.Control
              type="email"
              //   ref={emailInputRef}
              defaultValue={userData?.email}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter Old Password:</Form.Label>
            <Form.Control
              type={passwordVisible === true ? "text" : "password"}
              ref={oldPasswordInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enter New Password:</Form.Label>
            <Form.Control
              type={passwordVisible === true ? "text" : "password"}
              ref={newPasswordInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Re-enter New Password:</Form.Label>
            <Form.Control
              type={passwordVisible === true ? "text" : "password"}
              ref={re_newPasswordInputRef}
            />
          </Form.Group>

          <Button className="defaultButton" onClick={togglePassword}>
            <BiShow /> Make passwords visible
          </Button>
          <br />
          <br />
          <Button className="defaultButton" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

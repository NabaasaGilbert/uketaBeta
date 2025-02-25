// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
// import { useRecoilValue } from "recoil";

export default function AddLectureForm(props) {
  const moduleTitleInputRef = useRef();
  const moduleDescInputRef = useRef();
  const moduleVideoURLInputRef = useRef();
  const moduleIDInputRef = useRef();
  const currentModuleData = props.lectureData;
  const currentCourseData = props.courseData;

  function courseSubmitHandler(event) {
    event.preventDefault();

    const enteredModuleID =
      moduleIDInputRef.current?.value === ""
        ? ""
        : moduleIDInputRef.current?.value;
    const enteredModuleTitle =
      moduleTitleInputRef.current?.value === ""
        ? ""
        : moduleTitleInputRef.current?.value;
    const enteredModuleDescription =
      moduleDescInputRef.current?.value === ""
        ? ""
        : moduleDescInputRef.current?.value;
    const enteredVideoURL =
      moduleVideoURLInputRef.current?.value === ""
        ? ""
        : moduleVideoURLInputRef.current?.value;

    const addLectureData = {
      id: props.edit === true ? enteredModuleID : "",
      title: enteredModuleTitle,
      activity: currentCourseData?.name,
      description: enteredModuleDescription,
      videoUrl: enteredVideoURL,
      courseId: currentCourseData?.id,
    };

    if (props.edit === true) {
      props.onEditLecture(addLectureData);
    } else {
      props.onAddLecture(addLectureData);
    }
    // handleClose();
  }

  return (
    <Modal {...props} size="lg" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>
          {props.edit === true ? "Edit Lecture" : "Add New Lecture"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={courseSubmitHandler}>
          <Form.Group controlId="">
            <Form.Control
              ref={moduleIDInputRef}
              type="text"
              hidden
              defaultValue={currentModuleData?.id}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Module Title:</Form.Label>
            <Form.Control
              ref={moduleTitleInputRef}
              type="text"
              autoFocus
              required
              defaultValue={currentModuleData?.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              ref={moduleDescInputRef}
              defaultValue={currentModuleData?.description}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Video URL:</Form.Label>
            <Form.Control
              type="text"
              ref={moduleVideoURLInputRef}
              defaultValue={currentModuleData?.videoUrl}
            />
          </Form.Group>

          <Button className="defaultButton" type="submit">
            {props.edit === true ? "Update" : "Submit"}
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

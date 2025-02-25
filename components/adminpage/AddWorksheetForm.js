// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
// import { useRecoilValue } from "recoil";

export default function AddWorksheetForm(props) {
  const lectureWorksheetURLInputRef = useRef();
  const lectureIDInputRef = useRef();
  const currentLectureData = props.currentItem;
  //   const currentCourseData = props.courseData;

  function courseSubmitHandler(event) {
    event.preventDefault();

    const enteredLectureID =
      lectureIDInputRef.current?.value === ""
        ? ""
        : lectureIDInputRef.current?.value;
    const enteredWorksheetURL =
      lectureWorksheetURLInputRef.current?.value === ""
        ? ""
        : lectureWorksheetURLInputRef.current?.value;

    const addWorksheetData = {
      lectureId: enteredLectureID,
      file: enteredWorksheetURL,
    };

    if (props.edit === true) {
      props.onEditWorksheet(addWorksheetData);
    } else {
      props.onAddWorksheet(addWorksheetData);
    }
    // handleClose();
  }

  return (
    <Modal {...props} size="lg" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>
          {props.edit === true ? "Edit Worksheet" : "Add New Worksheet"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={courseSubmitHandler}>
          <Form.Group controlId="">
            <Form.Control
              ref={lectureIDInputRef}
              type="text"
              hidden
              defaultValue={currentLectureData?.lectureId}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Worksheet URL:</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              ref={lectureWorksheetURLInputRef}
              //   defaultValue={currentModuleData?.videoUrl}
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

// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { useRecoilValue } from "recoil";
// import { instructorDataState } from "../../atoms/atoms";

export default function DeleteConfirmationModal(props) {
  const DeletionName = props.currentItem.name;
  const DeletionType = props.currentItem.type;

  return (
    <Modal {...props} size="lg" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure you want to delete {DeletionType}: {DeletionName}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Form onSubmit={coachSubmitHandler}> */}
        <Button
          //   className="defaultButton"
          variant="danger"
          onClick={props.onConfirmDelete}
          type="submit"
        >
          Confirm Delete
        </Button>
        {/* </Form> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
// import { useRecoilValue } from "recoil";

export default function AddDiscountForm(props) {
  const discountCodeInputRef = useRef();
  const discountValueInputRef = useRef();
  //   const currentLectureData = props.currentItem;
  //   const currentCourseData = props.courseData;
  
  const { onAddDiscount, onHide } = props;

  function discountSubmitHandler(event) {
    event.preventDefault();

    const enteredDiscountCode =
      discountCodeInputRef.current?.value === ''
        ? ''
        : discountCodeInputRef.current?.value;
    const enteredDiscountValue =
      discountValueInputRef.current?.value === ''
        ? ''
        : discountValueInputRef.current?.value;

    const addDiscountCodeData = {
      code: enteredDiscountCode,
      percent: enteredDiscountValue,
    };

    // onAddDiscount(addDiscountCodeData);
    props.adddiscountcode(addDiscountCodeData)
    // handleClose();
  }

  return (
    <Modal {...props} size="lg" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>Add Discount Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={discountSubmitHandler}>
          <Form.Group controlId="">
            <Form.Label>Discount Code:</Form.Label>
            <Form.Control
              ref={discountCodeInputRef}
              type="text"
              autoFocus
              //   defaultValue={currentLectureData?.lectureId}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Discount Value:</Form.Label>
            <Form.Control
              type="number"
              ref={discountValueInputRef}
              //   defaultValue={currentModuleData?.videoUrl}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide}>
          Close
        </Button>
        <Button className="defaultButton" type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

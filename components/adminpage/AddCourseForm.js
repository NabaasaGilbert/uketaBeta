// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { instructorDataState } from "../../atoms/atoms";

export default function AddCourseForm(props) {
  const courseNameInputRef = useRef();
  const courseImageInputRef = useRef();
  const shortDescInputRef = useRef();
  const longDescInputRef = useRef();
  const ratingInputRef = useRef();
  const ratingCountInputRef = useRef();
  const studentCountInputRef = useRef();
  const introductionInputRef = useRef();
  const moduleCountInputRef = useRef();
  const priceUGXInputRef = useRef();
  const priceUSDInputRef = useRef();
  const instructorInputRef = useRef();
  const creationDateInputRef = useRef();
  const courseIDInputRef = useRef();
  const currentCourseData = props.courseData;

  const InstructorData = useRecoilValue(instructorDataState);

  function courseSubmitHandler(event) {
    event.preventDefault();

    // if (props.edit === true) {
    const enteredCourseID =
      courseIDInputRef.current?.value === ""
        ? ""
        : courseIDInputRef.current?.value;
    //   return enteredCourseID;
    // }

    const enteredCourseName =
      courseNameInputRef.current?.value === ""
        ? ""
        : courseNameInputRef.current?.value;
    const enteredImage =
      courseImageInputRef.current?.value === ""
        ? ""
        : courseImageInputRef.current?.value;
    const enteredShortDesc =
      shortDescInputRef.current?.value === ""
        ? ""
        : shortDescInputRef.current?.value;
    const enteredLongDesc =
      longDescInputRef.current?.value === ""
        ? ""
        : longDescInputRef.current?.value;
    const enteredRating =
      ratingInputRef.current?.value === ""
        ? "0"
        : ratingInputRef.current?.value;
    const enteredRatingCount =
      ratingCountInputRef.current?.value === ""
        ? "0"
        : ratingCountInputRef.current?.value;
    const enteredStudentCount =
      studentCountInputRef.current?.value === ""
        ? "0"
        : studentCountInputRef.current?.value;
    const enteredIntroduction =
      introductionInputRef.current?.value === ""
        ? ""
        : introductionInputRef.current?.value;
    const enteredModuleCount =
      moduleCountInputRef.current?.value === ""
        ? ""
        : moduleCountInputRef.current?.value;
    const enteredPriceUGX =
      priceUGXInputRef.current?.value === ""
        ? 0
        : parseInt(priceUGXInputRef.current?.value);
    const enteredPriceUSD =
      priceUSDInputRef.current?.value === ""
        ? 0
        : parseInt(priceUSDInputRef.current?.value);
    const enteredInstructor =
      instructorInputRef.current?.value === ""
        ? ""
        : instructorInputRef.current?.value;
    const enteredUpdateDate =
      creationDateInputRef.current?.value === ""
        ? ""
        : creationDateInputRef.current?.value;

    const addCourseData = {
      id: props.edit === true ? enteredCourseID : "",
      name: enteredCourseName,
      image: enteredImage,
      shortDesc: enteredShortDesc,
      longDesc: enteredLongDesc,
      rating: enteredRating,
      ratingCount: enteredRatingCount,
      studentCount: enteredStudentCount,
      updateDate: enteredUpdateDate,
      introduction: enteredIntroduction,
      moduleCount: enteredModuleCount,
      priceUGX: enteredPriceUGX,
      priceUSD: enteredPriceUSD,
      tutor: enteredInstructor,
    };

    if (props.edit === true) {
      props.onEditCourse(addCourseData);
    } else {
      props.onAddCourse(addCourseData);
    }
    // handleClose();
  }

  return (
    <Modal {...props} size="lg" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>
          {props.edit === true ? "Edit Course" : "Add New Course"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={courseSubmitHandler}>
          <Form.Group controlId="">
            <Form.Control
              ref={courseIDInputRef}
              type="text"
              hidden
              defaultValue={currentCourseData?.id}
            />
          </Form.Group>
          {/* {props.edit === true ? (
          ) : ( */}
          <Form.Group className="mb-3" controlId="">
            <Form.Label>
              <span>* </span>Course Name:
            </Form.Label>
            <Form.Control
              ref={courseNameInputRef}
              type="text"
              autoFocus
              required
              defaultValue={currentCourseData?.name}
            />
          </Form.Group>
          {/* )} */}

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="text"
              ref={courseImageInputRef}
              defaultValue={currentCourseData?.image}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Short Description:</Form.Label>
            <Form.Control
              as="textarea"
              ref={shortDescInputRef}
              defaultValue={currentCourseData?.shortDesc}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Long Description:</Form.Label>
            <Form.Control
              as="textarea"
              ref={longDescInputRef}
              defaultValue={currentCourseData?.longDesc}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Introduction:</Form.Label>
            <Form.Control
              as="textarea"
              ref={introductionInputRef}
              defaultValue={currentCourseData?.introduction}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Creation Date:</Form.Label>
            <Form.Control
              type="text"
              ref={creationDateInputRef}
              defaultValue={currentCourseData?.updateDate}
            />
          </Form.Group>

          <Row>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                  ref={ratingInputRef}
                  type="text"
                  defaultValue={currentCourseData?.rating}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Rating Count:</Form.Label>
                <Form.Control
                  ref={ratingCountInputRef}
                  type="text"
                  defaultValue={currentCourseData?.ratingCount}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Student Count:</Form.Label>
                <Form.Control
                  ref={studentCountInputRef}
                  type="text"
                  defaultValue={currentCourseData?.studentCount}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Module Count:</Form.Label>
                <Form.Control
                  ref={moduleCountInputRef}
                  type="text"
                  defaultValue={currentCourseData?.moduleCount}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Price UGX:</Form.Label>
                <Form.Control
                  ref={priceUGXInputRef}
                  type="text"
                  defaultValue={currentCourseData?.priceUGX}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Price USD:</Form.Label>
                <Form.Control
                  ref={priceUSDInputRef}
                  type="text"
                  defaultValue={currentCourseData?.priceUSD}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Instructor:</Form.Label>
            <Form.Select
              ref={instructorInputRef}
              aria-label="Default select example"
              required
              //   defaultValue={currentCourseData?.instructor}
            >
              <option>Open this select menu</option>
              {InstructorData &&
                Object.values(InstructorData).map((instructor) => (
                  <option
                    key={instructor.id}
                    value={instructor.id}
                    selected={
                      currentCourseData?.tutor === instructor.id ? true : false
                    }
                  >
                    {instructor.instructor}
                  </option>
                ))}
            </Form.Select>
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

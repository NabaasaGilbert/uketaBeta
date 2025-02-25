// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
// import { useRecoilValue } from "recoil";
// import { instructorDataState } from "../../atoms/atoms";

export default function AddCoachForm(props) {
  const coachNameInputRef = useRef();
  const coachImageInputRef = useRef();
  const shortDescInputRef = useRef();
  const longDescInputRef = useRef();
  const ratingInputRef = useRef();
  const reviewsInputRef = useRef();
  const studentsInputRef = useRef();
  const coursesInputRef = useRef();
  const websiteInputRef = useRef();
  const youtubeInputRef = useRef();
  const linkedinInputRef = useRef();
  const coachIDInputRef = useRef();
  const currentCoachData = props.coachData;

  //   const InstructorData = useRecoilValue(instructorDataState);

  function coachSubmitHandler(event) {
    event.preventDefault();

    // if (props.edit === true) {
    const enteredCoachID =
      coachIDInputRef.current?.value === ""
        ? ""
        : coachIDInputRef.current?.value;
    //   return enteredCourseID;
    // }

    const enteredCoachName =
      coachNameInputRef.current?.value === ""
        ? ""
        : coachNameInputRef.current?.value;
    const enteredImage =
      coachImageInputRef.current?.value === ""
        ? ""
        : coachImageInputRef.current?.value;
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
    const enteredReviews =
      reviewsInputRef.current?.value === ""
        ? "0"
        : reviewsInputRef.current?.value;
    const enteredStudents =
      studentsInputRef.current?.value === ""
        ? "0"
        : studentsInputRef.current?.value;
    const enteredCourses =
      coursesInputRef.current?.value === ""
        ? "0"
        : coursesInputRef.current?.value;
    const enteredWebsite =
      websiteInputRef.current?.value === ""
        ? ""
        : websiteInputRef.current?.value;
    const enteredYoutube =
      youtubeInputRef.current?.value === ""
        ? ""
        : youtubeInputRef.current?.value;
    const enteredLinkedin =
      linkedinInputRef.current?.value === ""
        ? ""
        : linkedinInputRef.current?.value;

    const addCoachData = {
      id: props.edit === true ? enteredCoachID : "",
      instructor: enteredCoachName,
      image: enteredImage,
      shortDesc: enteredShortDesc,
      longDesc: enteredLongDesc,
      rating: enteredRating,
      reviews: enteredReviews,
      students: enteredStudents,
      courses: enteredCourses,
      website: enteredWebsite,
      youtube: enteredYoutube,
      linkedin: enteredLinkedin,
    };

    if (props.edit === true) {
      props.onEditCoach(addCoachData);
    } else {
      props.onAddCoach(addCoachData);
    }
    // handleClose();
  }

  return (
    <Modal {...props} size="lg" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>
          {props.edit === true ? "Edit Coach" : "Add New Coach"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={coachSubmitHandler}>
          <Form.Group controlId="">
            <Form.Control
              ref={coachIDInputRef}
              type="text"
              hidden
              defaultValue={currentCoachData?.id}
            />
          </Form.Group>
          {/* {props.edit === true ? (
          ) : ( */}
          <Form.Group className="mb-3" controlId="">
            <Form.Label>
              <span>* </span>Coach Name:
            </Form.Label>
            <Form.Control
              ref={coachNameInputRef}
              type="text"
              autoFocus
              required
              defaultValue={currentCoachData?.instructor}
            />
          </Form.Group>
          {/* )} */}

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="text"
              ref={coachImageInputRef}
              defaultValue={currentCoachData?.image}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Short Description:</Form.Label>
            <Form.Control
              as="textarea"
              ref={shortDescInputRef}
              defaultValue={currentCoachData?.shortDesc}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Long Description:</Form.Label>
            <Form.Control
              as="textarea"
              ref={longDescInputRef}
              defaultValue={currentCoachData?.desc}
            />
          </Form.Group>

          <Row>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                  ref={ratingInputRef}
                  type="text"
                  defaultValue={currentCoachData?.rating}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Reviews:</Form.Label>
                <Form.Control
                  ref={reviewsInputRef}
                  type="text"
                  defaultValue={currentCoachData?.reviews}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Students:</Form.Label>
                <Form.Control
                  ref={studentsInputRef}
                  type="text"
                  defaultValue={currentCoachData?.students}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Courses:</Form.Label>
                <Form.Control
                  ref={coursesInputRef}
                  type="text"
                  defaultValue={currentCoachData?.courses}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Website:</Form.Label>
                <Form.Control
                  ref={websiteInputRef}
                  type="text"
                  defaultValue={currentCoachData?.website}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Youtube:</Form.Label>
                <Form.Control
                  ref={youtubeInputRef}
                  type="text"
                  defaultValue={currentCoachData?.youtube}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>LinkedIn:</Form.Label>
                <Form.Control
                  ref={linkedinInputRef}
                  type="text"
                  defaultValue={currentCoachData?.linkedin}
                />
              </Form.Group>
            </Col>
          </Row>

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

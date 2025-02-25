import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./ContactPage.module.css";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

export default function CoachInfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      //   className={classes.LetterModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          A letter from the founder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="johndoe@example.com" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" placeholder="" />
          </Form.Group>

          <a className="defaultButton" type="submit">
            Submit
          </a>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="defaultButton" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

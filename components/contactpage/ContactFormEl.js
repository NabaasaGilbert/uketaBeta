import classes from "./ContactPage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { BsPinMap, BsEnvelope, BsTelephone } from "react-icons/bs";
import { useRef } from "react";

export default function ContactFormEl(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const messageInputRef = useRef();

  async function contactFormSubmitHandler(event) {
    event.preventDefault();
    const enteredName =
      nameInputRef.current?.value === null ? "" : nameInputRef.current?.value;
    const enteredEmail =
      emailInputRef.current?.value === null ? "" : emailInputRef.current?.value;
    const enteredSubject =
      subjectInputRef.current?.value === null
        ? ""
        : subjectInputRef.current?.value;
    const enteredMessage =
      messageInputRef.current?.value === null
        ? ""
        : messageInputRef.current?.value;

    const contactFormData = {
      name: enteredName,
      email: enteredEmail,
      subject: enteredSubject,
      message: enteredMessage,
    };

    props.onSubmit(contactFormData);
  }

  return (
    <Row>
      <Col sm={8}>
        <Form onSubmit={contactFormSubmitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                ref={nameInputRef}
                type="text"
                placeholder="Angel Agaba"
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={emailInputRef}
                type="email"
                placeholder="angela@example.com"
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              ref={subjectInputRef}
              type="text"
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              ref={messageInputRef}
              as="textarea"
              placeholder=""
              required
            />
          </Form.Group>

          <Button className="defaultButton" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col sm={4} className={classes.ContactSubsectionForm}>
        <div>
          <BsPinMap className={classes.ContactSubsectionFormIcon} />
          <p>
            Protea Hotel By Marriot Kampala Skyz
            <br />
            <span>Plot 1 Water Lane, Naguru, Kampala</span>
          </p>
        </div>
        <div>
          <BsEnvelope className={classes.ContactSubsectionFormIcon} />
          <p>
            Email
            <br />
            <span>
              <a href="mailto:info@uketalearning.com">info@uketalearning.com</a>
            </span>
          </p>
        </div>
        <div>
          <BsTelephone className={classes.ContactSubsectionFormIcon} />
          <p>
            Phone
            <br />
            <span>
              <a href="tel:+256709734294">+256709734294 </a>
            </span>
          </p>
        </div>
      </Col>
    </Row>
  );
}

}

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./Homepage.module.css";

export default function LetterModalEl(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      className={classes.LetterModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          A letter from the founder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Dear Friend,</h5>
        <p>
          As you embark on your journey of personal and professional growth, I
          want to extend a warm welcome to you to join Uketa. I am Dr. Nataliey
          Bitature, a seasoned educator and coach with a passion for learning
          and empowering others to reach their full potential. I have personally
          recruited other experts who are ready to share their knowledge with
          you.
        </p>
        <p>
          I understand that taking the first step towards achieving your goals
          can be daunting, but I assure you that you are not alone. Uketa is
          designed to provide you with the guidance and support you need to
          navigate the challenges and uncertainties of life. Together, we will
          work towards creating a better future for yourself and those around
          you.
        </p>
        <p>
          As a leader in my field, I have dedicated my career to empowering
          individuals and organizations to reach their full potential. I have a
          wealth of experience and expertise to share, and I am committed to
          helping you achieve your goals. Whether you are seeking to develop
          your skills and advance in your career, or you are looking for a sense
          of purpose and fulfillment, we am here to help.
        </p>
        <p>
          I have been recognized as a business leader and innovator by Forbes 30
          Under 30, The World Bank, The Bill & Melinda Gates Foundation, and the
          World Economic Forum. Uketa is built on the principles of inclusivity,
          innovation, and impact, and I am excited to share this journey with
          you.
        </p>
        <p>
          So, take the first step and join Uketa today. Together, we will create
          a brighter future for ourselves and those around us.
        </p>
        <p>
          <strong>Warmly, Dr. Nataliey Bitature</strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="defaultButton" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import { Col, Row, Button } from "react-bootstrap";
// import CoachInfoModal from "./CoachInfoModal";
import ContactFormEl from "./ContactFormEl";
import classes from "./ContactPage.module.css";

export default function ContactPageEl() {
  async function formSubmitHandler(enteredFormData) {
    const submitResponse = await fetch("/api/contactFormSubmitHandler", {
      method: "POST",
      body: JSON.stringify(enteredFormData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    console.log(submitResponse);
    // router.reload();
  }

  // const [modalShow, setModalShow] = useState(false);
  return (
    <div className={classes.ContactSection}>
      <p className="sectionHeader text-center mt-3">Collaborate</p>
      {/* <p className="sectionSubheader text-center mt-3">Create A Course</p> */}
      <Row>
        <Col sm={6} className={classes.ContactSubsectionCol}>
          <img
            src="https://res.cloudinary.com/daecbszah/image/upload/v1677774447/collaborate/start-teaching_syuyxx.jpg"
            className={classes.ContactImage}
            alt=""
          />
        </Col>
        <Col sm={6} className={classes.ContactSubsectionCol}>
          <p className="sectionSubheader">Start teaching with us.</p>
          <p>Become an instructor and create change one module at a time.</p>
          <a
            className="defaultButton"
            href="https://docs.google.com/forms/d/e/1FAIpQLSco9lObwqID6hxgMgHSc704CZ0x2txsXNDDf-zcx9MUnrjpLw/viewform"
            target="_blank"
            rel="noreferrer"
            // onClick={() => setModalShow(true)}
          >
            Get Started
          </a>
        </Col>
      </Row>

      <Row className="mt-5 bgSection">
        {/* <p className="sectionSubheader text-center mt-3">
          Why to teach on Uketa
        </p> */}
        <Col sm={4} className={classes.ContactSubsectionColCenter}>
          <img
            className={classes.ContactImageSmall}
            alt=""
            src="/hero_slider/study.png"
          />
          <p className="sectionSubheader">Teach your way</p>
          <p>
            Publish the course you want, in the way you want, and always have
            control of your own content.
          </p>
        </Col>
        <Col sm={4} className={classes.ContactSubsectionColCenter}>
          <img
            className={classes.ContactImageSmall}
            alt=""
            src="/collaborate/learning.png"
          />
          <p className="sectionSubheader">Inspire students</p>
          <p>
            Teach what you know and help learners explore their interests, gain
            new skills, and advance their careers.
          </p>
        </Col>
        <Col sm={4} className={classes.ContactSubsectionColCenter}>
          <img
            className={classes.ContactImageSmall}
            alt=""
            src="/collaborate/diagram.png"
          />
          <p className="sectionSubheader">Get rewarded</p>
          <p>
            Expand your professional network, build your expertise, and earn
            money on each paid enrollment.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col sm={6} className={classes.ContactSubsectionCol}>
          <p className="sectionSubheader">How to get started</p>
          <p>
            Are you an expert in any field, seeking resources to structure your
            knowledge into a course?{" "}
          </p>

          <p className="sectionSubheader">1. Plan your curriculum</p>
          <p className="sectionSubheader">2. Record your content</p>
          <p className="sectionSubheader">3. Launch your course</p>

          <p>
            Get in touch with us today so that we can create your course
            together and host it on Uketa with this revenue sharing option!
          </p>
          <a
            className="defaultButton"
            href="https://docs.google.com/forms/d/e/1FAIpQLSco9lObwqID6hxgMgHSc704CZ0x2txsXNDDf-zcx9MUnrjpLw/viewform"
            target="_blank"
            rel="noreferrer"
            // onClick={() => setModalShow(true)}
          >
            Get Started
          </a>
        </Col>
        <Col sm={6} className={classes.ContactSubsectionCol}>
          <img
            className={classes.ContactImage}
            alt=""
            src="https://res.cloudinary.com/daecbszah/image/upload/v1677774447/collaborate/create-course_sxs3vp.jpg"
          />
        </Col>
      </Row>

      <div className={classes.ContactFormSection + " " + "bgSection"}>
        <p className="sectionSubheader text-center">Get In Touch</p>
        <p className="text-center">
          Have a question or just want to say hi? We&apos;d love to hear from
          you.
        </p>
        <ContactFormEl onSubmit={formSubmitHandler} />
        {/* <CoachInfoModal show={modalShow} onHide={() => setModalShow(false)} /> */}
      </div>
    </div>
  );
}

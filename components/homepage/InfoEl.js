import classes from "./Homepage.module.css";
import { Col, Button } from "react-bootstrap";
import TestimonialEl from "./TestimonialEl";
import Link from "next/link";
import LetterModalEl from "./LetterModalEl";
import { useState } from "react";

export default function InfoEl() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className={classes.founderSection}>
        <Col xl={6} lg={6} sm={12} xs={12}>
          <img
            src="https://res.cloudinary.com/daecbszah/image/upload/v1677774378/coaches/nataliey_snfevf.jpg"
            alt=""
          />
        </Col>
        <Col xl={6} lg={6} sm={12} xs={12}>
          <p className="sectionHeader">Meet The Founder</p>
          <p>
            Hi, I wrote you a letter If you have scrolled this far down on
            Uketa, then I am certain you and I have good reason to build a
            connection. I am Dr Nataliey Bitature, the founder Uketa. I am happy
            to welcome you to e-learning, the Uketa way. Check out my special
            letter with the link below.
          </p>
          <Button className="defaultButton" onClick={() => setModalShow(true)}>
            View Letter
          </Button>
        </Col>
      </div>
      <div className={classes.instructorSection}>
        <Col sm={6}>
          <p className="sectionHeader">Teach On Uketa</p>
          <p>
            Do you have an already existing course that could fit Uketa? Get in
            touch and start teaching today.
          </p>
          <Link href="/collaborate" passHref legacyBehavior>
            <a className="defaultButton">Become A Coach</a>
          </Link>
        </Col>
        <Col sm={6}>
          <img src="/start-teaching.jpg" alt="" />
        </Col>
      </div>
      {/* <TestimonialEl /> */}
      {/* <div className={classes.partnerSection}>
        <p className="sectionHeader">Partners</p>
        <p>
          We are happy to work with like minded individuals, communities and
          organisations to share the dream of making knowledge available and
          affordable. Here are some of our trusted partners.
        </p>
      </div> */}
      <LetterModalEl show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

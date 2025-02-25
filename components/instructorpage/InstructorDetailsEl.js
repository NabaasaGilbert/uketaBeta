import { Col, Row, Button } from "react-bootstrap";
import classes from "./InstructorPage.module.css";
import SidebarEl from "../homepage/SidebarEl";
import {
  BsLinkedin,
  BsLink,
  BsYoutube,
  BsFillPeopleFill,
  BsFillChatQuoteFill,
  BsFillStarFill,
} from "react-icons/bs";
import Link from "next/link";
// import InstructorData from "../data/instructorData.json";
import parser from "html-react-parser";

export default function InstructorDetailsEl(props) {
  const Instructor = props.instructorData;
  var Description = Instructor?.desc;
  var descArray = Description?.split("<br/>");

  return (
    <>
      <div className={classes.InstructorDetails}>
        <div className="breadcrumb">
          <Link href="/about" passHref>
            <p>About</p>
          </Link>
          {/* <p>/</p> */}
          {/* <Link href="/courses" passHref> */}
          <p>/ Instructors / {Instructor.instructor}</p>
          {/* </Link> */}
          {/* <p>/ {CourseInfo.name}</p> */}
        </div>
        <Row>
          <Col sm={8}>
            <Row className={classes.InstructorRow}>
              <Col sm={3}>
                <img
                  className={classes.InstructorImage}
                  src={Instructor.image}
                  alt=""
                />
              </Col>
              <Col sm={9}>
                <Row>
                  <p className="sectionHeader">{Instructor.instructor}</p>
                  <Col className="d-flex flex-column align-items-center">
                    <BsFillPeopleFill className={classes.InstructorIcon} />
                    <p>Students</p>
                    <p className="sectionSubheader">{Instructor.students}</p>
                  </Col>
                  <Col className="d-flex flex-column align-items-center">
                    <BsFillChatQuoteFill className={classes.InstructorIcon} />
                    <p>Reviews</p>
                    <p className="sectionSubheader">{Instructor.reviews}</p>
                  </Col>
                  <Col className="d-flex flex-column align-items-center">
                    <BsFillStarFill className={classes.InstructorIcon} />
                    <p>Rating</p>
                    <p className="sectionSubheader">{Instructor.rating}</p>
                  </Col>
                </Row>
                <Row className="mb-3">
                  {Instructor.website === "" ? null : (
                    <Col>
                      <a
                        className={classes.InstructorButton}
                        href={Instructor.website}
                        target="_blank"
                      >
                        <BsLink className={classes.InstructorButtonIcon} />
                        Website
                      </a>
                    </Col>
                  )}
                  {Instructor.youtube === "" ? null : (
                    <Col>
                      <a
                        className={classes.InstructorButton}
                        href={Instructor.youtube}
                        target="_blank"
                      >
                        <BsYoutube className={classes.InstructorButtonIcon} />
                        Youtube
                      </a>
                    </Col>
                  )}
                  {Instructor.linkedin === "" ? null : (
                    <Col>
                      <a
                        className={classes.InstructorButton}
                        href={Instructor.linkedin}
                        target="_blank"
                      >
                        <BsLinkedin className={classes.InstructorButtonIcon} />
                        LinkedIn
                      </a>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
            {/* <p className="sectionSubheader">Founder of the Uketa online learning platform</p> */}
            <p className="sectionSubheader mt-2">About me</p>
            <p>{Instructor.shortDesc}</p>
            <p>{Instructor.desc && parser(Instructor.desc)}</p>
          </Col>
          <Col sm={3}>
            <SidebarEl instructor={Instructor} />
          </Col>
        </Row>
      </div>
    </>
  );
}

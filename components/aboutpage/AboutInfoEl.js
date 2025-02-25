import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import CategoriesEl from "../homepage/CategoriesEl";
import TestimonialEl from "../homepage/TestimonialEl";
import classes from "./AboutInfoEl.module.css";
// import instructors from "../data/instructorData.json";
import { instructorDataState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import axios from "axios";
import InfoEl from "../homepage/InfoEl";

export default function AboutInfoEl() {
  // const InstructorData = instructors.instructordata;
  const InstructorData = useRecoilValue(instructorDataState);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {   
    const getActiveInstructors = async () => {
      try {
        setLoading(true);
        axios.get(`/api/instructor/getActivatedInstructors`).then((res) => {         
          setLoading(false);
          setInstructors(res.data.data);
        });
      } catch (error) {
        setLoading(false);
      }
    };
    getActiveInstructors();
  }, []);

  return (
    <div className={classes.AboutSection}>
      <p className="sectionHeader text-center mt-3 pt-4">About Us</p>
      <div className={classes.AboutHero}></div>
      <div>
        <Row className="defaultPadding align-items-center">
          <Col sm={6}>
            <img src="/about/data.png" alt="" className={classes.AboutImage} />
          </Col>
          <Col sm={6}>
            <p>
              UKETA is an online learning platform specialising in practical
              education that is suitable for present day professionals. We aim
              to provide the knowledge and skills necessary for our users to
              grow in their businesses, careers and personal lives. Here, you
              can be sure to find your most desirable course and learn it at
              your own convenience, at very affordable rates. Scan our courses
              today and pick one to upgrade your skills for the 21st century.
            </p>
          </Col>
        </Row>
      </div>
      <InfoEl/>
      <div className="bgSection">
        <Row className="defaultPadding text-center align-items-center">
          <Col sm={6}>
            <img
              src="/about/mission.png"
              alt=""
              className={classes.GoalsImage}
            />
            <p className="sectionSubheader mt-3">Mission</p>
            <p>
              We provide access to relatable, affordable, convenient knowledge
              and skills to the African workforce.
            </p>
          </Col>
          <Col sm={6}>
            <img
              src="/about/vision.png"
              alt=""
              className={classes.GoalsImage}
            />
            <p className="sectionSubheader mt-3">Vision</p>
            <p>
              We empower young Africans through access to information and
              expertise to unlock their great potential.
            </p>
          </Col>
        </Row>
      </div>
      <CategoriesEl />
      <div className="bgSection">
        <Row className="defaultPadding text-center">
          <p className="sectionHeader mt-3">Coaches</p>
          {loading && (
            <div className="d-flex">
              <Spinner className="mx-auto text-white" />
            </div>
          )}
          {!loading &&
            instructors &&
            instructors.map((instructor) => {
              return (
                <Col
                  key={instructor.id}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  className={classes.TrainerSubsection}
                >
                  <img src={instructor.image} alt="" />
                  <p className="sectionSubheader">{instructor.instructor}</p>
                  <Link href={"/instructor/" + instructor.id} passHref>
                    <Button className="defaultButton">Learn More</Button>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </div>
      <div className={classes.AboutFooter}></div>
      <TestimonialEl />
    </div>
  );
}

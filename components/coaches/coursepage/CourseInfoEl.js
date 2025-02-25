import { Col, Row, Button } from "react-bootstrap";
import classes from "./CoursesPage.module.css";
import Link from "next/link";
import {
  BsFillStarFill,
  BsFillBookmarkStarFill,
  BsFillPeopleFill,
  BsFillPlayCircleFill,
  BsPatchExclamation,
  BsGlobe2,
  BsFillCaretRightFill,
} from "react-icons/bs";
// import { useEffect, useState } from "react";
import SidebarEl from "../../homepage/SidebarEl";
// import { useSession } from "next-auth/react";
import CommentsEl from "./CommentsEl";
import { useRecoilValue } from "recoil";
import {
  currentCourseState,
  currentInstructorState,
  currentModuleState,
} from "../../../atoms/atoms";
import { useState } from "react";
// import { useRouter } from "next/router";
// import useUser from "../../lib/useUser";
import Spinner from "react-bootstrap/Spinner";
import parser from "html-react-parser";

export default function CourseInfoEl({ course, instructor }) {
  // const { user } = useUser();
  // const router = new useRouter();
  const CourseInfo = useRecoilValue(currentCourseState);
  const ModuleInfo = useRecoilValue(currentModuleState);
  const InstructorInfo = useRecoilValue(currentInstructorState);

  return (
    <>
      <Row className={classes.CourseContent}>
        <>
          <Col sm={12}>
            <CommentsEl />
            <p className={classes.CourseDetailsName}>{course?.name}</p>
            <p>{course?.shortDesc}</p>
            <div className={classes.DetailRow}>
              <BsFillStarFill className={classes.StarIcon} />
              {course?.rating +
                " (" +
                course?.ratingCount +
                " ratings) " +
                course?.studentCount +
                " Students"}
            </div>
            <Link
              href={"/instructor/" + instructor?.id}
              className={classes.tutorLink}
              passHref
            >
              <div key={instructor?.id} className={classes.DetailRow}>
                <img
                  src={instructor?.image}
                  // className={classes.tutorImage}
                  alt=""
                />
                <p>{instructor?.instructor}</p>
              </div>
            </Link>
            {/* <div className={classes.DetailRow}> */}
            {/* <img src={InstructorInfo?.image} alt="" /> */}
            {/* <p className="pt-3">{InstructorInfo?.instructor}</p> */}
            {/* </div> */}
            <p className="mt-2">
              <BsPatchExclamation /> Last updated: {course?.updateDate}
            </p>
            <p>
              <BsGlobe2 /> English
            </p>
            <div>
              <p className={classes.DescriptionSubheader}>Description</p>
              <p>{course?.longDesc}</p>
            </div>
            <div className={classes.DescriptionSection}>
              <p className={classes.DescriptionSubheader}>Introduction</p>
              <p>{course?.introduction}</p>
            </div>
            <div className={classes.DescriptionSection}>
              <p className={classes.DescriptionSubheader}>Requirements</p>
              <p>
                1. A working internet connection.
                <br />
                2. A book/pad to take notes.
                <br />
                3. A desktop/laptop or mobile device to watch video lessons.
                <br />
              </p>
            </div>
            <div className={classes.DescriptionSection}>
              <p className={classes.DescriptionSubheader}>Modules</p>
              {ModuleInfo &&
                Object.values(ModuleInfo).map((info) => {
                  return (
                    <div key={info.id}>
                      <p className={classes.subHeader}>
                        <BsFillCaretRightFill />
                        {info.title}
                      </p>
                      <p>{info.description}</p>
                    </div>
                  );
                })}
            </div>
            {/* <div className={classes.DescriptionSection}>
            <p className={classes.DescriptionSubheader}>Reviews</p>
            {Object.entries(Reviews).map((reviewObject) => {
              Object.values(reviewObject).map((review) => {
                return <p key={review.id}>{review.reviews}</p>;
              });
            })}
          </div> */}
            <div className={classes.DescriptionSection}>
              <p className={classes.DescriptionSubheader}>Coach</p>
              {/* {Object.values(Instructors).map((instructor) => {
              return CourseInfo?.tutor === instructor.instructor ? ( */}
              <Row>
                <Col sm={3}>
                  <img
                    src={instructor?.image}
                    className={classes.InstructorImage}
                    alt=""
                  />
                </Col>
                <Col sm={9}>
                  <p className={classes.subHeader}>{instructor?.tutor}</p>
                  <p>{InstructorInfo?.shortDesc}</p>
                  <p>
                    <BsFillStarFill /> {instructor?.rating} Instructor Rating
                  </p>
                  <p>
                    <BsFillBookmarkStarFill /> {instructor?.reviews} Reviews
                  </p>
                  <p>
                    <BsFillPeopleFill /> {instructor?.students} Students
                  </p>
                  <p>
                    <BsFillPlayCircleFill /> {instructor?.courses} Courses
                  </p>
                  <Link href={"/instructor/" + instructor?.id} passHref>
                    <Button className="defaultButton">Learn More</Button>
                  </Link>
                </Col>
                <p>
                  <br />
                  {instructor.desc && parser(instructor?.desc)}
                </p>
              </Row>
              {/* ) : null;
            })} */}
            </div>
          </Col>
        </>
      </Row>
    </>
  );
}

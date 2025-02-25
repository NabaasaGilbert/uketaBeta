import classes from "./UserCourses.module.css";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import { BsFillStarFill, BsFillCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useRecoilValue } from "recoil";
import {
  courseDataState,
  instructorDataState,
  userCourseDataState,
} from "../../atoms/atoms";

import { useEffect } from "react";

export default function UserCoursesEl() {
  const router = new useRouter();
  const url = router.pathname;
  const CourseData = useRecoilValue(courseDataState);
  const InstructorData = useRecoilValue(instructorDataState);
  const UserCourses = useRecoilValue(userCourseDataState);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // useEffect(() => {
  //       console.log(userCourse.courseId)
  //     );
  // }, [UserCourses]);

  return (
    <>
      <p className="sectionHeader text-center mt-5">My Courses</p>
      <Row className={classes.CoursesRow}>
        {CourseData &&
          Object.values(CourseData).map(
            (course) =>
              UserCourses &&
              Object.values(UserCourses).map((userCourse) =>
                userCourse.courseId === course.id ? (
                  <Col key={course.id} sm={4}>
                    <div className={classes.CourseItem}>
                      <img src={course.image} alt="" />
                      <div className={classes.CourseInfoRow}>
                        <p>{course.moduleCount}</p>
                        <p>
                          <BsFillStarFill className={classes.StarIcon} />{" "}
                          {course.rating} ({course.ratingCount})
                        </p>
                      </div>
                      <p className={classes.CourseName}>{course.name}</p>
                      <ProgressBar
                        // className={classes.ProgressBar}
                        variant="success"
                        now={60}
                        //   label={"100%"}
                      />
                      {InstructorData &&
                        Object.values(InstructorData).map((instructor) =>
                          instructor.id === course.tutor ? (
                            <Link
                              href={"/instructor/" + instructor.id}
                              className={classes.tutorLink}
                              passHref
                              key={instructor.id}
                            >
                              <div className={classes.CourseInfoRow}>
                                <img
                                  src={instructor.image}
                                  className={classes.tutorImage}
                                  alt=""
                                />
                                <p>{instructor.instructor}</p>
                              </div>
                            </Link>
                          ) : null
                        )}
                      <div className={classes.CourseInfoRow}>
                        <p>
                          <BsFillCartCheckFill /> Purchased
                        </p>
                        <Link href={"/lectures/" + course.id} passHref>
                          <Button className={classes.EnrollButton}>
                            View Course
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                ) : null
              )
          )}
      </Row>
    </>
  );
}

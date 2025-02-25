import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./CoursesPage.module.css";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import { BsFillStarFill, BsFillCartCheckFill } from "react-icons/bs";
// import { useRouter } from "next/router";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useRecoilValue } from "recoil";
import parser from "html-react-parser";
// import Badge from "react-bootstrap/Badge";
import {
  courseDataState,
  instructorDataState,
  // userCourseDataState,
} from "../../atoms/atoms";
import useUser from "../../lib/useUser";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import limitStringLength from "../../pages/utils/limitStringLength";

export default function CoursesEl() {
  const { user } = useUser();
  // const { data: session } = useSession();
  // const router = new useRouter();
  // const url = router.pathname;
  const CourseData = useRecoilValue(courseDataState);
  const InstructorData = useRecoilValue(instructorDataState);
  // const UserCourseInfo = useRecoilValue(userCourseDataState);

  const [courseData, setCourseData] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    console.log({ user });
    if (CourseData && CourseData.length > 0) {
      const filteredArray = CourseData.filter(
        (item) => item.isPublished === true
      );

      setCourseData(filteredArray);
    }
    if (user && user.isLoggedIn === true) {
      const payload = { userEmail: user.user.email };
      axios
        .post(`/api/user/getCompletedCourses`, payload)
        .then((res) => {
          // console.log(res.data.data);
          let arr = [];
          if (res.data.data.length > 0) {
            res.data.data.map((elem) => {
              arr.push(elem.Course.id);
            });
          }
          setCompletedCourses(arr);
          // return setLoading(false);
        })
        .catch((err) => {
          // setLoading(false);
        });
    } else {
      // setLoading(false);
    }
  }, [CourseData]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // useEffect(() => {
  //   console.log(UserCourseInfo);
  //   // Object.values(UserCourseInfo).map((instructor) => console.log(instructor));
  // }, [UserCourseInfo]);

  return (
    <>
      {/* <p className="sectionHeader text-center">My Courses</p> */}
      <Row className={classes.CoursesRow}>
        {!courseData ? <Spinner animation="border" variant="warning" /> : null}
        {courseData &&
          Object.values(courseData).map((course) => (
            <Col key={course.id} xl={4} lg={4} md={6} sm={6} xs={12}>
              {/* {course.name === "Business Bootcamp" ||
              course.name === "Digital Content Creation" ||
              course.name === "Financial Literacy" ? (
                <Badge className={classes.badge} bg="warning" pill>
                  Coming Soon
                </Badge>
              ) : null} */}
              <div className={classes.CourseItem}>
                <Link
                  href={"/courses/" + course.id}
                  passHref
                  className="position-relative"
                >
                  <img src={course.image} alt="" />
                  <div className="position-absolute w-100 top-0 d-flex justify-content-right p-2">
                    {completedCourses.includes(course.id) && (
                      <div className="btn btn-success rounded-pill">
                        Completed
                      </div>
                    )}
                  </div>
                </Link>
                <div className={classes.CourseInfoRow}>
                  <p>{course.moduleCount} Modules</p>
                  <p>
                    <BsFillStarFill className={classes.StarIcon} />{" "}
                    {course.rating} ({course.ratingCount})
                  </p>
                </div>
                <p className={classes.CourseName + " " + "px-0"}>
                  {course.name}
                </p>
                <p className="text-muted">
                  {parser(limitStringLength(course.shortDesc, 0, 60))}
                </p>
                <ProgressBar
                  // className={classes.ProgressBar}
                  variant="success"
                  now={60}
                  //   label={"100%"}
                />
                {!InstructorData ? (
                  <Spinner animation="border" variant="warning" />
                ) : null}
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
                {/* {!session && UserCourseInfo.length > 0
                  ? UserCourseInfo?.map((userCourse) => {
                      return userCourse.courseId === course.id ? (
                        <div key={course.id} className={classes.CourseInfoRow}>
                          <p className={classes.CoursePrice}>
                            <BsFillCartCheckFill />
                            Purchased
                          </p>
                          <Link href={"/lectures/" + course.id} passHref>
                            <Button className={classes.EnrollButton}>
                              View Course
                            </Button>
                          </Link>
                        </div>
                      ) : ( */}
                <div key={course.id} className={classes.CourseInfoRow}>
                  <div>
                    <p>{course.priceUSD} USD</p>
                    <p className={classes.CoursePrice}>
                      {numberWithCommas(course.priceUGX)} UGX
                    </p>
                  </div>
                  <Link href={"/courses/" + course.id} passHref>
                    <Button className={classes.EnrollButton}>
                      View Details
                    </Button>
                  </Link>
                </div>
                {/* );
                    })
                  : null} */}
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
}

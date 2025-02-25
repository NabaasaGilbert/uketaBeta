import classes from "./CoursesPage.module.css";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
import { BsFillStarFill, BsFillCartCheckFill } from "react-icons/bs";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useRecoilValue } from "recoil";
// import Badge from "react-bootstrap/Badge";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import useUser from "../../lib/useUser";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  courseDataState,
  instructorDataState,
  userCourseDataState,
} from "../../atoms/atoms";
// import useUser from "../../lib/useUser";
// import { useSession } from "next-auth/react";
import Spinner from "react-bootstrap/Spinner";

export default function CoursesPaidEl() {
  // const { user } = useUser();
  const { user } = useUser();
  // const { data: session } = useSession();
  // const router = new useRouter();
  // const url = router.pathname;
  const { data: session } = useSession();
  const CourseData = useRecoilValue(courseDataState);
  const InstructorData = useRecoilValue(instructorDataState);
  // const UserCourseInfo = useRecoilValue(userCourseDataState);
  const UserCourseInfo = useRecoilValue(userCourseDataState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  let id = "";

  useEffect(() => {
    async function fetchData() {
      if (user && user.isLoggedIn === true) {
        axios
          .get(`/api/courses/userPaidCourses?userId=${user.user.id}`)
          .then(async (res) => {
            let arr = [];
            res.data.data.map((elem) => {
              arr.push(elem.Course);
            });
            await setCourses(arr);
            await setLoading(false);
          });
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
            return setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  return (
    <>
      {/* <p className="sectionHeader text-center">My Courses</p> */}
      <Row className={classes.CoursesRow}>
        {loading ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <>
            {!loading && courses.length === 0 ? (
              <div className="alert alert-danger text-center">
                You current have not paid for any course yet
              </div>
            ) : (
              <>
                {courses.map((course) => {
                  return (
                    <Col key={course.id} sm={4}>
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
                        <p className={classes.CourseName}>{course.name}</p>
                        <ProgressBar variant="success" now={60} />
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
                      </div>
                    </Col>
                  );
                })}
              </>
            )}
          </>
        )}
      </Row>
    </>
  );
}

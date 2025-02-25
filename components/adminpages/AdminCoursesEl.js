import classes from "./UserCourses.module.css";
import Link from "next/link";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { BsFillStarFill, BsFillCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useRecoilValue } from "recoil";
import {
  courseDataState,
  instructorDataState,
  userCourseDataState,
  // courseDataState
} from "../../atoms/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import parser from "html-react-parser";
import limitStringLength from "../../pages/utils/limitStringLength";

export default function AdminCoursesEl({ courses }) {
  const router = new useRouter();
  const url = router.pathname;
  const InstructorData = useRecoilValue(instructorDataState);
  const [loading, setLoading] = useState(true);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePublishCourse = async (courseId) => {
    try {
      setLoading(true);
      const payload = { courseId };
      axios.put(`/api/admin/publishCourse`, payload).then((res) => {
        if (res.data.status === 200) {
          setLoading(false);
          alert("Course has been Published");
          window.location.reload();
        } else {
          setLoading(false);
          alert("Course has Publishing failed");
          window.location.reload();
        }
      });
    } catch (error) {
      return
    }
  };

  const handleUnPublishCourse = async (courseId) => {
    try {
      setLoading(true);
      const payload = { courseId };
      axios.put(`/api/admin/unPublishCourse`, payload).then((res) => {        
        if (res.data.status === 200) {
          setLoading(false);
          alert("Course has been UnPublished");
          window.location.reload();
        } else {
          setLoading(false);
          alert("Course has UnPublishing failed");
          window.location.reload();
        }
      });
    } catch (error) {
      return
    }
  };

  return (
    <>
      <p className="sectionHeader mt-5">All Courses</p>
      <Row>
        {courses &&
          Object.values(courses).map((course) => (
            <Col
              key={course.id}
              xl={4}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              className="p-1"
            >
              <div className={classes.CourseItem}>
                <img src={course.image} alt="" />
                <div className={classes.CourseInfoRow}>
                  <p>{course.moduleCount} Modules</p>
                  <p>
                    <BsFillStarFill className={classes.StarIcon} />{" "}
                    {course.rating} ({course.ratingCount})
                  </p>
                </div>
                <p className={classes.CourseName}>{course.name}</p>
                <p className="text-muted">
                  {parser(limitStringLength(course.shortDesc, 0, 50))}
                </p>
                <ProgressBar variant="success" now={60} />
                {InstructorData &&
                  Object.values(InstructorData).map((instructor) =>
                    instructor.id === course.tutor ? (
                      <Link
                        href={"/admin/instructor/" + instructor.id}
                        className={classes.tutorLink}
                        passHref
                        key={instructor.id}
                      >
                        <div className={classes.CourseInfoRow}>
                          {instructor.image ? (
                            <img
                              src={instructor.image}
                              className={classes.tutorImage}
                              alt=""
                            />
                          ) : (
                            <img
                              src="/defaults/default-profile-image.png"
                              className={classes.tutorImage}
                              alt=""
                            />
                          )}

                          <div>
                            <p>{instructor.instructor}</p>{" "}
                            <div>
                              Course Status:{" "}
                              {course.isPublished ? (
                                <span className="text-success">Published</span>
                              ) : (
                                <span className="text-danger">Unpublished</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : null
                  )}

                {loading ? (
                  <div className="d-flex w-100">
                    <Spinner className="text-orange mx-auto" />
                  </div>
                ) : (
                  <div className={classes.CourseInfoRow}>
                    {course.isPublished ? (
                      <Button
                        className="btn btn-danger rounded-pill"
                        onClick={() => handleUnPublishCourse(course.id)}
                      >
                        Unpublish Course
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-success rounded-pill"
                        onClick={() => handlePublishCourse(course.id)}
                      >
                        Publish Course
                      </Button>
                    )}

                    <Link href={"/admin/lectures/" + course.id} passHref>
                      <Button className={classes.EnrollButton}>
                        View Course
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
}

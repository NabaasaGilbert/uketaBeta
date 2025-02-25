import classes from './InstructorCourses.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Col, Row } from 'react-bootstrap';
import {
  BsFillStarFill,
  BsFillCartCheckFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
} from 'react-icons/bs';
import { useRouter } from 'next/router';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useRecoilValue } from 'recoil';
import {
  courseDataState,
  instructorDataState,
  userCourseDataState,
  // courseDataState
} from '../../../atoms/atoms';
import { useEffect } from 'react';
import useUser from '../../../lib/useUser';
import axios from 'axios';
import fetchJson from '../../../lib/fetchJson';
import Spinner from 'react-bootstrap/Spinner';

export default function InstructorCourses() {
  const router = new useRouter();
  const url = router.pathname;
  const CourseData = useRecoilValue(courseDataState);
  const InstructorData = useRecoilValue(instructorDataState);
  const UserCourses = useRecoilValue(courseDataState);
  const { user, mutateUser } = useUser();
  const { index } = router.query;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    if (index) {
      console.log(user);
      axios
        .get(`/api/instructor/getMyCourses?${index}`)
        .then((res) => {
          setLoading(false);
          return setCourses(res.data.data);
        })
        .catch((err) => {
          setError('Error getting my courses');
          return setLoading(false);
        });
    }
  }, [index]);

  return (
    <>
      <p className="sectionHeader mt-5"> My Courses</p>
      <Row>
        {error && (
          <div className="w-100 text-center">Error Loading Courses</div>
        )}
        <>
          {loading ? (
            <div className="d-flex p-5 w-100">
              <Spinner className="mx-auto text-orange" />
            </div>
          ) : (
            <>
              {courses.length > 0 ? (
                <>
                  {courses.map((course) => (
                    <Col key={course.id} sm={4} className="p-1">
                      <div className={classes.CourseItem}>
                        <img src={course.image} alt="" />
                        <div className={classes.CourseInfoRow}>
                          <p>{course.moduleCount}</p>
                          <p>
                            <BsFillStarFill className={classes.StarIcon} />{' '}
                            {course.rating} ({course.ratingCount})
                          </p>
                        </div>
                        <p className={classes.CourseName}>{course.name}</p>
                        <ProgressBar variant="success" now={60} />
                        {InstructorData &&
                          Object.values(InstructorData).map((instructor) =>
                            instructor.id === course.tutor ? (
                              <Link
                                href={'/instructor/' + instructor.id}
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
                          <div>
                            {course.isPublished ? (
                              <div className="text-success">
                                {' '}
                                <BsPatchCheckFill /> Published{' '}
                              </div>
                            ) : (
                              <div className="text-danger">
                                {' '}
                                <BsPatchCheckFill /> Not Published
                              </div>
                            )}
                          </div>
                          <Link href={'/coach/course/' + course.id} passHref>
                            <Button className={classes.EnrollButton}>
                              View Course Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Col>
                  ))}
                </>
              ) : (
                <div className="w-100 text-center alert alert-danger">
                  No Courses Found
                </div>
              )}
            </>
          )}
        </>
      </Row>
    </>
  );
}

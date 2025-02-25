import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { Col, Row, Button, Form, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import CommentsListEl from "../../../components/adminpage/CommentsListEl";
import DoughnutChartEl from "../../../components/adminpage/DoughnutChartEl";
import ReactStars from "react-rating-stars-component";

import useSWR from "swr";
import axios from "axios";
import moment from "moment";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");

    axios
      .post(`/api/admin/getCoursesProgressData`)
      .then((res) => {
        setCourses(res.data.data);
        return setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [session, user]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        {/* {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null} */}

        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">
            Uketa Admin Dashboard
          </h1>
          <p className="sectionSubheader">Uketa Admin Dashboard</p>
          {/* <CommentsListEl /> */}
          <Row>
            <Col sm={6}>
              <p className="sectionSubheader">Students Per Course</p>
              <DoughnutChartEl countData={data} />
            </Col>
            <Col sm={6}>
              <p className="sectionSubheader">Income Per Course</p>
              <DoughnutChartEl countData={data} income />
            </Col>
          </Row>
          <div className="p-5 my-5">
            <h3>Course Progress</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Student Full Names</th>
                  <th>Student Email</th>
                  <th>Student Phone</th>
                  <th>Student Gender</th>
                  <th>Company</th>
                  <th>Course Instructor</th>
                  <th>Modules Covered</th>
                  <th>Total Modules</th>
                  <th>Date Started</th>
                  <th>Date Last Updated</th>
                  <th>Review</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr className="text-center">
                    <td colSpan={12}>
                      <Spinner className="text-orange" />
                    </td>
                  </tr>
                )}
                {!loading && courses.length < 1 ? (
                  <tr className="text-center">
                    <td colSpan={6}>No Data found</td>
                  </tr>
                ) : (
                  <>
                    {courses.map((course) => {
                      return (
                        <tr key={course.id}>
                          <td>{course?.Course?.name}</td>
                          <td>{course?.User?.name}</td>
                          <td>{course?.User?.email}</td>
                          <td>{course?.User?.phone}</td>
                          <td>{course?.User?.gender}</td>
                          <td>{course?.User?.company?.name}</td>
                          <td>{course?.Course?.Instructor?.instructor}</td>
                          <td>{course?.progress} modules</td>
                          <td>{course?.duration} modules</td>
                          <td>{moment(course.createdAt).format("LLLL")}</td>
                          <td>{moment(course?.updatedAt).format("LLLL")}</td>
                          <td>
                            {course.Course?.Review?.map((elem) => (
                              <div key={elem.id}>
                                {elem.userId === course.User.id && (
                                  <>
                                    <ReactStars
                                      count={elem.rating}
                                      value={elem.rating}
                                      size={25}
                                      activeColor="#ffbf36"
                                    />
                                    <div key={elem.id}>{elem.review}</div>
                                  </>
                                )}
                              </div>
                            ))}
                          </td>
                          <td>
                            {course.Course?.Feedback?.map((elem) => (
                              <div key={elem.id}>
                                {elem.studentId === course.User.id && (
                                  <a
                                    className="btn defaultButton_ btn-default py-1"
                                    target="_blank"
                                    href={`/admin/feedback/details?feedbackId=${elem.id}`}
                                  >
                                    <small> View Feedback</small>
                                  </a>
                                )}
                              </div>
                              // assuming 'comments' is a field you want to display
                            ))}
                          </td>
                          <td>
                            {course?.progress === course?.duration && (
                              <a
                                className="btn defaultButton"
                                target="_blank"
                                href={`/certificate/${course.id}`}
                              >
                                View Certificate
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

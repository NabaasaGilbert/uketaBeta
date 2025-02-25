import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { Col, Row, Button, Form, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import CommentsListEl from "../../../components/adminpage/CommentsListEl";
import DoughnutChartEl from "../../../components/adminpage/DoughnutChartEl";
import axios from "axios";
import moment from "moment";

import useSWR from "swr";

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
    console.log({ user });
    const instructorId = user?.user?.id;
    if (instructorId) {
      axios
        .post(`/api/instructor/getCoursesProgressData`, { instructorId })
        .then((res) => {
          setCourses(res.data.data);
          return setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
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

        <div className="p-5 mt-5 container">
          <h1 className="text-3xl font-bold text-gray-900">
            Uketa Instructor Dashboard
          </h1>
          <p className="sectionSubheader">Uketa Instructor Dashboard</p>
          {/* <CommentsListEl /> */}
          {/* <Row>
          <Col sm={6}>
            <p className="sectionSubheader">Students Per Course</p>
            <DoughnutChartEl countData={data} />
          </Col>
          <Col sm={6}>
            <p className="sectionSubheader">Income Per Course</p>
            <DoughnutChartEl countData={data} income />
          </Col>        
          </Row> */}
          <div className="p-5 my-5">
            <h3>Course Progress</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Student</th>
                  <th>Instructor</th>
                  <th>Modules Covered</th>
                  <th>Total Modules</th>
                  <th>Date Started</th>
                  <th>Date Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr className="text-center">
                    <td colSpan={8}>
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
                          <td>{course?.Course?.Instructor?.instructor}</td>
                          <td>{course?.progress} modules</td>
                          <td>{course?.duration} modules</td>
                          <td>{moment(course.createdAt).format("LLLL")}</td>
                          <td>{moment(course?.updatedAt).format("LLLL")}</td>
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

import { useEffect, useState } from "react";
import { Col, Row, Button, Form, Table, Spinner } from "react-bootstrap";
import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import StudentListEl from "../../../components/adminpage/StudentListEl";
import PaymentsListEl from "../../../components/adminpage/PaymentsListEl";
import AddCourseToStudentForm from "../../../components/adminpage/AddCourseToStudentForm";
import AddCoachForm from "../../../components/adminpage/AddCoachForm";
import { courseDataState, instructorDataState } from "../../../atoms/atoms";
import moment from "moment";
import axios from "axios";
// import { courseDataState, instructorDataState } from "../../atoms/atoms";
// PaymentsListEl
import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const [addCourseToStudentFormResponse, setAddCourseToStudentFormResponse] =
    useState({});
  const [newCoachModalShow, setNewCoachModalShow] = useState(false);
  const { data: session } = useSession();
  const { user } = useUser();
  // const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);
  const InstructorData = useRecoilValue(instructorDataState);
  const [editCoachModalShow, setEditCoachModalShow] = useState(false);
  const [currentCoachData, setCurrentCoachData] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addCoachHandler(enteredCoachData) {
    const newCoachResponse = await fetch("/api/admin/addNewCoach", {
      method: "POST",
      body: JSON.stringify(enteredCoachData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setNewCoachModalShow(false);
    setFormResponse(newCoachResponse);
  }

  async function addCourseToUserHandler(passedData) {
    const apiResponse = await fetch("/api/admin/addCourseToUser", {
      method: "POST",
      body: JSON.stringify(passedData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    if (apiResponse.status === 501) {
      setAddCourseToStudentFormResponse(apiResponse);
    } else {
      setAddCourseToStudentFormResponse(apiResponse);
      router.reload();
    }
  }

  async function handleCoachEdit(passedData) {
    try {
      console.log(passedData);
      await setCurrentCoachData(passedData);
      return setEditCoachModalShow(true);
    } catch (e) {}
  }

  async function editCoachHandler(enteredCoachData) {
    const editCoachResponse = await fetch("/api/admin/editCoachData", {
      method: "POST",
      body: JSON.stringify(enteredCoachData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setEditCoachModalShow(false);
    // setFormResponse(editCoachResponse);
  }

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    // console.log(session, user);
  }, [session, user]);

  const handleActivateCoach = async (id) => {
    try {
      setLoading(true);
      axios.post(`/api/instructor/activateInstructor`, { id }).then((res) => {
        setLoading(false);
        router.reload();
      });
    } catch (error) {}
  };

  const handleDeactivateCoach = async (id) => {
    try {
      setLoading(true);
      axios.post(`/api/instructor/deActivateInstructor`, { id }).then((res) => {
        setLoading(false);
        router.reload();
      });
    } catch (error) {}
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        {/* {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null} */}

        <div className="py-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Coaches</h1>

          <div className="">
            <Row className="mb-5">
              <Col sm={6}>
                <p className="sectionSubheader m-0">Manage Coaches</p>
                {/* <h6 className="mt-3">Add Coach</h6>
                <Button
                  className="defaultButton m-2"
                  onClick={() => setNewCoachModalShow(true)}
                >
                  Add New Coach
                </Button> */}
                <br />
              </Col>
              {/* <Col sm={6}>
                <p className="sectionSubheader">Unenroll User</p>
                <AddCourseToStudentForm
                  onSubmit={removeCourseFromUserHandler}
                  response={removeCourseFromStudentFormResponse}
                />
              </Col> */}
            </Row>
            <Row className="mb-5">
              <Col sm={12}>
                <p className="sectionSubheader">All Coaches</p>
                {/* <StudentListEl studentData={data?.userData} /> */}
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Coaches</th>
                      <th>Email</th>
                      <th>Courses</th>
                      <th>Students</th>
                      <th>Description</th>
                      <th>Signature</th>
                      <th>Reviews</th>
                      <th>Rating</th>
                      <th>Date Created</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // InstructorData &&
                      // InstructorData !== undefined &&
                      // InstructorData !== null &&
                      InstructorData
                        ? Object.values(InstructorData).map((item, index) => {
                            return (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={item.image}
                                    width={100}
                                    height={100}
                                    className="rounded-circle"
                                  />
                                </td>
                                <td>
                                  <p className="fw-bold m-0">
                                    {item.instructor}
                                  </p>
                                </td>
                                <td>
                                  <p className="m-0">{item.email}</p>
                                </td>
                                <td className="text-center">
                                  <p className="m-0">{item.courses}</p>
                                </td>
                                <td className="text-center">
                                  <p className="m-0">{item.students}</p>
                                </td>
                                <td>
                                  <p className="m-0">{item.shortDesc}</p>
                                </td>
                                <td>
                                  <img
                                    src={item?.signature}
                                    width={150}
                                    className="img-fluid"
                                  />
                                </td>
                                <td className="text-center">
                                  <p className="m-0">{item.reviews}</p>
                                </td>
                                <td className="text-center">
                                  <p className="m-0">{item.rating}</p>
                                </td>
                                <td>
                                  <p className="m-0">
                                    {moment(item.createdAt).format("LLLL")}
                                  </p>
                                </td>
                                <td className="py-5">
                                  <a
                                    href={"/admin/coach/" + item.id}
                                    className="defaultButton my-4"
                                  >
                                    {" "}
                                    Edit
                                  </a>
                                </td>
                                <td className="text-center">
                                  {item.isActivated ? (
                                    <>
                                      Activated{" "}
                                      {/* <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                          handleDeactivateCoach(item.id)
                                        }
                                      >
                                        Deactivate Coach
                                      </button> */}
                                      {loading ? (
                                        <div className="d-flex">
                                          <Spinner className="text-orange mx-auto" />
                                        </div>
                                      ) : (
                                        <button
                                          className="btn btn-danger"
                                          onClick={() =>
                                            handleDeactivateCoach(item.id)
                                          }
                                        >
                                          Deactivate Coach
                                        </button>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      Deactivated{" "}
                                      {loading ? (
                                        <div className="d-flex">
                                          <Spinner className="text-orange mx-auto" />
                                        </div>
                                      ) : (
                                        <button
                                          className="btn btn-success"
                                          onClick={() =>
                                            handleActivateCoach(item.id)
                                          }
                                        >
                                          Activate Coach
                                        </button>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        : null
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
        <AddCoachForm
          show={newCoachModalShow}
          onHide={() => setNewCoachModalShow(false)}
          onAddCoach={addCoachHandler}
        />
        {/* <AddCoachForm
        show={newCoachModalShow}
        onHide={() => setNewCoachModalShow(false)}
        onAddCoach={addCoachHandler}
      /> */}
        <AddCoachForm
          edit
          coachData={currentCoachData}
          show={editCoachModalShow}
          onHide={() => setEditCoachModalShow(false)}
          onEditCoach={editCoachHandler}
        />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import useSWR from "swr";
import AddCourseForm from "./AddCourseForm";
import AddCourseToStudentForm from "./AddCourseToStudentForm";
import DoughnutChartEl from "./DoughnutChartEl";
import PaymentsListEl from "./PaymentsListEl";
import StudentListEl from "./StudentListEl";
import Badge from "react-bootstrap/Badge";
import { courseDataState, instructorDataState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
// import classes from "./AdminPage.module.css";
import AddLectureForm from "./AddLectureForm";
import CommentsListEl from "./CommentsListEl";
import AddCoachForm from "./AddCoachForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AddWorksheetForm from "./AddWorksheetForm";
import { useRouter } from "next/router";
import AddDiscountForm from "./AddDiscountForm";
import DiscountListModal from "./DiscountCodesListModal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AdminDashboardEl() {
  const router = new useRouter();
  const [addCourseToStudentFormResponse, setAddCourseToStudentFormResponse] =
    useState({});
  const [deleteConfirmationModalShow, setDeleteConfirmationModalShow] =
    useState({ status: false, name: "", type: "" });
  const [
    removeCourseFromStudentFormResponse,
    setRemoveCourseFromStudentFormResponse,
  ] = useState({});
  const [addWorksheetModalShow, setAddWorksheetModalShow] = useState({
    status: false,
    lectureId: "",
  });
  const [formResponse, setFormResponse] = useState({});
  const [newCourseModalShow, setNewCourseModalShow] = useState(false);
  const [newCoachModalShow, setNewCoachModalShow] = useState(false);
  const [editCoachModalShow, setEditCoachModalShow] = useState(false);
  const [editCourseModalShow, setEditCourseModalShow] = useState(false);
  const [newLectureModalShow, setNewLectureModalShow] = useState(false);
  const [editLectureModalShow, setEditLectureModalShow] = useState(false);
  const CourseData = useRecoilValue(courseDataState);
  const InstructorData = useRecoilValue(instructorDataState);
  const [currentInstructor, setCurrentInstructor] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [currentLecture, setCurrentLecture] = useState("");
  const [currentCoachData, setCurrentCoachData] = useState(null);
  const [currentCourseData, setCurrentCourseData] = useState(null);
  const [currentLectureData, setCurrentLectureData] = useState(null);
  const [newDiscountModalShow, setNewDiscountModalShow] = useState(false);
  const [viewDiscountModalShow, setViewDiscountModalShow] = useState(false);

  useEffect(() => {
    CourseData &&
      Object.values(CourseData).map((course) =>
        course.id === currentCourse ? setCurrentCourseData(course) : null
      );
  }, [currentCourse]);

  useEffect(() => {
    lectureData &&
      Object.values(lectureData).map((lecture) =>
        lecture.id === currentLecture ? setCurrentLectureData(lecture) : null
      );
  }, [currentLecture]);

  useEffect(() => {
    InstructorData &&
      Object.values(InstructorData).map((instructor) =>
        instructor.id === currentInstructor
          ? setCurrentCoachData(instructor)
          : null
      );
  }, [currentInstructor]);

  // useEffect(() => {
  //   testGCSConnection();
  // }, []);
  // useEffect(() => {  
  // }, [currentCourseData]);
  // const handleClose = () => setShow(false);

  const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);
  const { data: lectureData } = useSWR("/api/admin/fetchAllLectures", fetcher);

  // async function testGCSConnection() {
  //   const apiResponse = await fetch("/api/admin/testGCSConnection", {
  //     method: "POST",
  //     // body: JSON.stringify(),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-goog-project-id": "direct-mission-385017",
  //       // "Authorization": "Bearer $(gcloud auth print-access-token)"
  //     },
  //   }).then((f) => f.json());
  // }

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

  async function addWorksheetHandler(passedData) {
    const apiResponse = await fetch("/api/admin/addWorksheet", {
      method: "POST",
      body: JSON.stringify(passedData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setAddWorksheetModalShow({ status: false });
    setFormResponse(apiResponse);
    // router.reload();
  }

  async function addDiscountHandler(passedData) {
    const apiResponse = await fetch("/api/admin/addDiscountCode", {
      method: "POST",
      body: JSON.stringify(passedData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setNewDiscountModalShow(false);
    setFormResponse(apiResponse);
    // router.reload();
  }

  async function deleteDiscountHandler(passedData) {
    const apiResponse = await fetch("/api/admin/deleteDiscountCode", {
      method: "POST",
      body: JSON.stringify(passedData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setViewDiscountModalShow(false);
    setFormResponse(apiResponse);
    // router.reload();
  }

  async function removeCourseFromUserHandler(passedData) {
    const apiResponse = await fetch("/api/admin/removeCourseFromUser", {
      method: "POST",
      body: JSON.stringify(passedData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setRemoveCourseFromStudentFormResponse(apiResponse);
    router.reload();
  }

  async function deleteItemHandler() {
    if (deleteConfirmationModalShow.type === "course") {
      const apiResponse = await fetch("/api/admin/deleteCourse", {
        method: "POST",
        body: JSON.stringify(currentCourse),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((f) => f.json());
      setCurrentCourse("");
      setDeleteConfirmationModalShow({ status: false });
      setFormResponse(apiResponse);
    }
    if (deleteConfirmationModalShow.type === "lecture") {
      const apiResponse = await fetch("/api/admin/deleteLecture", {
        method: "POST",
        body: JSON.stringify(currentLecture),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((f) => f.json());
      setCurrentLecture("");
      setDeleteConfirmationModalShow({ status: false });
      setFormResponse(apiResponse);
    }
  }

  async function addCourseHandler(enteredCourseData) {
    const newCourseResponse = await fetch("/api/admin/addNewCourse", {
      method: "POST",
      body: JSON.stringify(enteredCourseData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    
    //   if (apiResponse.status === 200)
    setNewCourseModalShow(false);
    setFormResponse(newCourseResponse);
    // router.reload();
  }

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

  async function addLectureHandler(enteredLectureData) {
    const newLectureResponse = await fetch("/api/admin/addNewLecture", {
      method: "POST",
      body: JSON.stringify(enteredLectureData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
   
    //   if (apiResponse.status === 200)
    setNewLectureModalShow(false);
    setFormResponse(newLectureResponse);
    // router.reload();
  }

  async function editCourseHandler(enteredCourseData) {
    const editCourseResponse = await fetch("/api/admin/editCourseData", {
      method: "POST",
      body: JSON.stringify(enteredCourseData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    
    //   if (apiResponse.status === 200)
    setEditCourseModalShow(false);
    setFormResponse(editCourseResponse);
    // router.reload();
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
    setFormResponse(editCoachResponse);
  }

  async function editLectureHandler(enteredLectureData) {
    const editLectureResponse = await fetch("/api/admin/editLectureData", {
      method: "POST",
      body: JSON.stringify(enteredLectureData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setEditLectureModalShow(false);
    setFormResponse(editLectureResponse);
    // router.reload();
  }
  
  return (
    <>
      <div className="mt-5 mb-2">.</div>
      <p className="sectionHeader text-center">Uketa Admin Dashboard</p>
      <div className="ps-5 pe-5">
        <Row className="mb-5">
          <Col sm={4}>
            <p className="sectionSubheader m-0">Manage Courses</p>
            {formResponse.status === 200 ? (
              <Badge
                key={formResponse.status}
                className="mb-3"
                bg="success"
                pill
              >
                {formResponse.response}
              </Badge>
            ) : (
              <Badge
                key={formResponse.status}
                className="mb-3"
                bg="danger"
                pill
              >
                {formResponse.response}
              </Badge>
            )}
            <br />
            <h6>Add Course</h6>
            <Button
              className="defaultButton m-2"
              onClick={() => setNewCourseModalShow(true)}
            >
              Add New Course
            </Button>
            <br />
            <h6 className="mt-2">Edit Course</h6>
            <Form>
              <Form.Group className="mb-3 " controlId="">
                <Form.Label>Select Course:</Form.Label>
                <Form.Select
                  //   ref={instructorInputRef}
                  aria-label="Default select example"
                  required
                  onChange={(event) => setCurrentCourse(event.target.value)}
                >
                  <option value="">Open this select menu</option>
                  {CourseData &&
                    Object.values(CourseData).map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Form>
            {currentCourse === "" ? null : (
              <>
                <Button
                  className="defaultButton ms-2"
                  onClick={() => setEditCourseModalShow(true)}
                >
                  Edit Course
                </Button>
                <Button
                  className="defaultButton m-2"
                  onClick={() =>
                    setDeleteConfirmationModalShow({
                      status: true,
                      name:
                        CourseData &&
                        Object.values(CourseData).map((course) => {
                          if (course.id === currentCourse) return course.name;
                        }),
                      type: "course",
                    })
                  }
                >
                  Delete Course
                </Button>
                <Button
                  className="defaultButton m-2"
                  onClick={() => setNewLectureModalShow(true)}
                >
                  Add New Lecture
                </Button>
                <h6 className="mt-2">Edit Lecture</h6>
                <Form>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Select Lecture:</Form.Label>
                    <Form.Select
                      //   ref={instructorInputRef}
                      aria-label="Default select example"
                      required
                      onChange={(event) =>
                        setCurrentLecture(event.target.value)
                      }
                    >
                      <option value="">Please select lecture</option>
                      {lectureData &&
                        Object.values(lectureData).map((lecture) =>
                          lecture.courseId === currentCourse ? (
                            <option key={lecture.id} value={lecture.id}>
                              {lecture.title}
                            </option>
                          ) : null
                        )}
                    </Form.Select>
                  </Form.Group>
                </Form>
                {currentLecture === "" ? null : (
                  <>
                    <Button
                      className="defaultButton m-2"
                      onClick={() => setEditLectureModalShow(true)}
                    >
                      Edit Lecture
                    </Button>
                    <Button
                      className="defaultButton m-2"
                      onClick={() =>
                        setAddWorksheetModalShow({
                          status: true,
                          lectureId: currentLecture,
                        })
                      }
                    >
                      Add Worksheet
                    </Button>
                    {/* <Button
                      className="defaultButton m-2"
                      onClick={() =>
                        setAddWorksheetModalShow({
                          status: true,
                          lectureId: currentLecture,
                        })
                      }
                    >
                      Edit Worksheet
                    </Button> */}
                    <Button
                      className="defaultButton m-2"
                      onClick={() =>
                        setDeleteConfirmationModalShow({
                          status: true,
                          name:
                            lectureData &&
                            Object.values(lectureData).map((lecture) => {
                              if (lecture.id === currentLecture)
                                return lecture.title;
                            }),
                          type: "lecture",
                        })
                      }
                    >
                      Delete Lecture
                    </Button>
                  </>
                )}
              </>
            )}
            <p className="sectionSubheader m-0">Manage Coaches</p>
            <h6 className="mt-3">Add Coach</h6>
            <Button
              className="defaultButton m-2"
              onClick={() => setNewCoachModalShow(true)}
            >
              Add New Coach
            </Button>
            <br />
            <h6 className="mt-2">Edit Coach</h6>
            <Form>
              <Form.Group className="mb-3 " controlId="">
                <Form.Label>Select Coach:</Form.Label>
                <Form.Select
                  //   ref={instructorInputRef}
                  aria-label="Default select example"
                  required
                  onChange={(event) => setCurrentInstructor(event.target.value)}
                >
                  <option value="">Open this select menu</option>
                  {InstructorData &&
                    Object.values(InstructorData).map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.instructor}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Form>
            {currentInstructor === "" ? null : (
              <>
                <Button
                  className="defaultButton ms-2"
                  onClick={() => setEditCoachModalShow(true)}
                >
                  Edit Coach
                </Button>
              </>
            )}
            <p className="sectionSubheader m-0">Manage Discounts</p>
            <br />
            <Button
              className="defaultButton m-2"
              onClick={() => setNewDiscountModalShow(true)}
            >
              Add New Discount
            </Button>
            <Button
              className="defaultButton m-2"
              onClick={() => setViewDiscountModalShow(true)}
            >
              View Discounts
            </Button>
            {/* <DoughnutChartEl countData={data} /> */}
          </Col>
          <Col sm={4}>
            <p className="sectionSubheader">Students Per Course</p>
            <DoughnutChartEl countData={data} />
          </Col>
          <Col sm={4}>
            <p className="sectionSubheader">Income Per Course</p>
            <DoughnutChartEl countData={data} income />
          </Col>
        </Row>
      </div>
      <div className="ps-5 pe-5">
        <Row className="mb-5">
          <Col sm={4}>
            <p className="sectionSubheader">All Users</p>
            <StudentListEl studentData={data?.userData} />
          </Col>
          <Col sm={4}>
            <p className="sectionSubheader">Successful Payments</p>
            <PaymentsListEl paymentData={data?.paymentData} />
          </Col>
          <Col sm={4}>
            <p className="sectionSubheader">Enroll User</p>
            <AddCourseToStudentForm
              onSubmit={addCourseToUserHandler}
              response={addCourseToStudentFormResponse}
            />
            <p className="sectionSubheader mt-5">Unenroll User</p>
            <AddCourseToStudentForm
              onSubmit={removeCourseFromUserHandler}
              response={removeCourseFromStudentFormResponse}
            />
          </Col>
        </Row>
      </div>
      <div className="ps-5 pe-5">
        {/* <Row className="mb-5">
          <Col sm={6}> */}
        <p className="sectionSubheader">Manage Comments</p>
        <CommentsListEl />
        {/* </Col>
        </Row> */}
      </div>
      <AddDiscountForm
        show={newDiscountModalShow}
        onHide={() => setNewDiscountModalShow(false)}
        onAddDiscount={addDiscountHandler}
      />
      <DiscountListModal
        show={viewDiscountModalShow}
        onHide={() => setViewDiscountModalShow(false)}
        discountData={data?.discountCodes}
        onDelete={deleteDiscountHandler}
      />
      <AddCourseForm
        show={newCourseModalShow}
        onHide={() => setNewCourseModalShow(false)}
        onAddCourse={addCourseHandler}
      />
      <DeleteConfirmationModal
        currentItem={deleteConfirmationModalShow}
        show={deleteConfirmationModalShow.status}
        onHide={() => setDeleteConfirmationModalShow({ status: false })}
        onConfirmDelete={deleteItemHandler}
      />
      <AddCoachForm
        show={newCoachModalShow}
        onHide={() => setNewCoachModalShow(false)}
        onAddCoach={addCoachHandler}
      />
      <AddCoachForm
        edit
        coachData={currentCoachData}
        show={editCoachModalShow}
        onHide={() => setEditCoachModalShow(false)}
        onEditCoach={editCoachHandler}
      />
      <AddCourseForm
        edit
        courseData={currentCourseData}
        show={editCourseModalShow}
        onHide={() => setEditCourseModalShow(false)}
        onEditCourse={editCourseHandler}
      />
      <AddLectureForm
        show={newLectureModalShow}
        onHide={() => setNewLectureModalShow(false)}
        onAddLecture={addLectureHandler}
        courseData={currentCourseData}
      />
      <AddWorksheetForm
        show={addWorksheetModalShow.status}
        onHide={() => setAddWorksheetModalShow({ status: false })}
        currentItem={addWorksheetModalShow}
        onAddWorksheet={addWorksheetHandler}
        // courseData={currentCourseData}
      />
      <AddLectureForm
        edit
        lectureData={currentLectureData}
        show={editLectureModalShow}
        onHide={() => setEditLectureModalShow(false)}
        onEditLecture={editLectureHandler}
      />
    </>
  );
}

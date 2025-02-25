import classes from "./UserCourses.module.css";
import { useRecoilValue } from "recoil";
import { courseDataState, userCourseDataState } from "../../atoms/atoms";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import useUser from "../../lib/useUser";
import { useSession } from "next-auth/react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BiUser } from "react-icons/bi";
import Spinner from "react-bootstrap/Spinner";
import EditUserInfoForm from "./AccountInfoFormModal";
import Badge from "react-bootstrap/Badge";

export default function UserDashboard() {
  const CourseData = useRecoilValue(courseDataState);
  const UserCourses = useRecoilValue(userCourseDataState);
  const { user } = useUser();
  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState("");
  const [userProgressData, setUserProgressData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editUserInfoModalShow, setEditUserInfoModalShow] = useState({
    status: false,
  });
  const [userDataEditResponse, setUserDataEditResponse] = useState("");

  useEffect(() => {
    // UserCourses &&
    //   Object.values(UserCourses).map((course) =>
    userEmail != "" ? fetchProgressHandler(userEmail) : null;
    // );
  }, [userEmail]);

  useEffect(() => {
    if (user.isLoggedIn === true) {
      setUserEmail(user?.user.email);
      setUserData(user?.user);
    }
    if (session) {
      setUserEmail(session?.user.email);
      setUserData(session?.user);
    }
  }, [session, user]);

  useEffect(() => {
    console.log(userData);
    // sortData();
  }, [userData]);

  async function fetchProgressHandler(id) {
    const progressHandlerResponse = await fetch("/api/user/fetchProgressData", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setUserProgressData(progressHandlerResponse.data);
    // lectureHandlerResponse.data.map((item) => {
    //   lectureArray.push(item);
    // });
  }

  async function editUserInfoHandler(passedData) {
    const userDataHandlerResponse = await fetch("/api/user/editUserData", {
      method: "POST",
      body: JSON.stringify(passedData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setEditUserInfoModalShow({ status: false });
    setUserDataEditResponse(userDataHandlerResponse);
  }

  // function sortData() {
  //   lectureArray.map((item) => console.log(item));
  // console.log(lectureArray);
  // return lectureArray?.map((element) => {
  //   console.log(element);
  // });
  // let numberSelected = 0;
  // for (let i = 0; i < lectureArray.length; i++) {
  //   if (lectureArray[i] < lectureArray.length) {
  // console.log(array[0]);
  //   }
  // }

  // return (
  // );
  // }

  return (
    <>
      <p className="sectionHeader text-center">Dashboard</p>
      <Row className={classes.Dashboard}>
        <Col>
          <p className="sectionSubheader text-center">User Info</p>
          {userDataEditResponse.status === 200 ? (
            <Badge
              key={userDataEditResponse.status}
              className="mb-3"
              bg="success"
              pill
            >
              {userDataEditResponse.response}
            </Badge>
          ) : (
            <Badge   
              key={userDataEditResponse.status}
              className="mb-3"
              bg="danger"
              pill
            >
              {userDataEditResponse.response}
            </Badge>
          )}
          <div className={classes.UserBanner}>
            {/* <img src="" alt="" className={classes.UserImage}></img> */}
            <Row>
              <Col sm={3}>
                <BiUser className={classes.Icon} />
              </Col>
              <Col sm={9}>
                <p className={classes.Username}>{userData?.name}</p>
                <p className="fw-bold">{userData?.email}</p>
                <p>
                  {UserCourses && Object.values(UserCourses).length > 0
                    ? Object.values(UserCourses).length + " "
                    : "No "}
                  Courses Purchased
                </p>
                <Button
                  className="defaultButton"
                  onClick={() =>
                    setEditUserInfoModalShow({
                      status: true,
                      userId: "",
                    })
                  }
                >
                  Manage Account Info
                </Button>
              </Col>
            </Row>
            <Row className="p-2 m-0">
              {userDataEditResponse.status === 200 ? (
                <p className="mt-2 text-success text-bg-light rounded-2 p-1">
                  Please login again for changes to take effect.
                </p>
              ) : null}
            </Row>
            {/* <Button className="defaultButton">Manage Account Info</Button> */}
          </div>
        </Col>
        <Col sm={9}>
          <p className="sectionSubheader text-center">Course Progress</p>
          <div className={classes.Progress}>
            {!userProgressData ? (
              <Spinner animation="border" variant="warning" />
            ) : null}
            <Row>
              {CourseData &&
                Object.values(CourseData).map(
                  (course) =>
                    userProgressData &&
                    Object.values(userProgressData).map((item) =>
                      item.courseId === course.id ? (
                        <Col sm={4} key={item.courseId}>
                          <div key={course.id} className={classes.ProgressPill}>
                            <Row>
                              <Col sm={5} className="text-center">
                                <img
                                  src={course.image}
                                  alt=""
                                  className={classes.ProgressImage}
                                ></img>
                              </Col>
                              <Col sm={7}>
                                <p className={classes.CourseName}>
                                  {course.name}
                                </p>
                                <p className="m-0">Lectures Completed</p>
                                <p className={classes.ProgressValue}>
                                  {item.progress + " of " + item.duration}
                                </p>
                              </Col>
                            </Row>
                            <Row className="m-1 mt-2 mb-3 p-0">
                              <ProgressBar
                                variant="success"
                                now={item.progress}
                                max={item.duration}
                                className="p-0"
                                // label={item.progress + "/" + item.duration}
                              />
                            </Row>
                            <Row className={classes.ProgressMessage}>
                              <Col sm={3} className="text-center">
                                {item.progress < item.duration / 2 ? (
                                  <p className={classes.Emoji}>🫡</p>
                                ) : null}
                                {item.progress >= item.duration / 2 &&
                                item.progress < item.duration ? (
                                  <p className={classes.Emoji}>😃</p>
                                ) : null}
                                {item.progress === item.duration ? (
                                  <p className={classes.Emoji}>🥳</p>
                                ) : null}
                              </Col>
                              <Col
                                sm={9}
                                className={classes.ProgressMessageText}
                              >
                                {item.progress < item.duration / 2 ? (
                                  <p className="fw-bold">
                                    Good luck on your journey!
                                  </p>
                                ) : null}
                                {item.progress >= item.duration / 2 &&
                                item.progress < item.duration ? (
                                  <p className="fw-bold">
                                    Great work, you&apos;re half way there!
                                  </p>
                                ) : null}
                                {item.progress === item.duration ? (
                                  <p className="fw-bold">
                                    Well done! Congratulations.
                                  </p>
                                ) : null}
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      ) : null
                    )
                )}
            </Row>
          </div>
        </Col>
      </Row>
      <EditUserInfoForm
        show={editUserInfoModalShow.status}
        onHide={() => setEditUserInfoModalShow({ status: false })}
        currentUser={userData}
        onEditUserInfo={editUserInfoHandler}
      />
    </>
  );
}

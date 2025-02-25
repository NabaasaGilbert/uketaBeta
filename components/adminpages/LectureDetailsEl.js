import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import classes from "./LecturePage.module.css";
import { useEffect, useState, useRef } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { currentModuleState, currentCourseState } from "../../atoms/atoms";
import Link from "next/link";
import dynamic from "next/dynamic";
import CourseInfoEl from "./CourseInfoEl";
import useUser from "../../lib/useUser";
import { useSession } from "next-auth/react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import parse from "html-react-parser";

var Editor = dynamic(() => import("../../components/editor"), {
  ssr: false,
});

export default function LectureDetailsEl(props) {
  // const router = new useRouter();
  // const queryId = router.query.courseId;
  // const CourseName = props.courseName;

  const { modules, instructor, course } = props;
  const { user } = useUser();
  const { data: session } = useSession();
  const CourseInfo = useRecoilValue(currentCourseState);
  const ModuleInfo = useRecoilValue(currentModuleState);
  // const DurationData = durations.lectureduration;
  const [currentLecture, setCurrentLecture] = useState({});
  const [currentQuiz, setCurrentQuiz] = useState("");
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentModuleId, setCurrentModuleId] = useState("");
  const [currentModuleTitle, setCurrentModuleTitle] = useState("");
  const [currentModuleDescription, setCurrentModuleDescription] = useState("");
  const [currentModuleVideoURL, setCurrentModuleVideoURL] = useState("");
  const [currentModuleData, setCurrentModuleData] = useState("");
  const [lecturesPayload, setLecturesPayload] = useState([]);
  const [moduleDescription, setModuleDescription] = useState("");

  // Module fields
  const moduleTitleInputRef = useRef();
  const moduleDescriptionInputRef = useRef();
  const [moduleVideoURL, setModuleVideoURL] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  // const [show, setShow] = useState(false);
  // const [currentDuration, setCurrentDuration] = useState(0);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  // useEffect(() => {
  //   // Object.values(LectureData).map((lecture) => {
  //   //   if (queryId === lecture.id) {
  //   //     setCurrentCourse(lecture.lectures);
  //   //   }
  //   // });
  //   Object.values(DurationData).map((duration) => {
  //     if (queryId === duration.id) {
  //       setCurrentDurations(duration.lectures);
  //     }
  //   });
  //   generateRandomIntegerInRange(30, 100);
  // }, []);

  const handleModuleDescriptionDataInput = (data) => {
    setModuleDescription(data);
  };

  useEffect(() => {
    ModuleInfo &&
      Object.values(ModuleInfo).map((lecture, index) => {
        if (index === 0) {
          setCurrentLecture(lecture);
        }
      });

    axios.get(`/api/cloudinary`).then((res) => {
      setCloudinaryName(res.data.cloudinaryName);
      setCloudinaryPreset(res.data.cloudinaryPreset);
      return setLoading(false);
    });
    let arrLectures = [];
    course.Lecture.map((elem) => {
      arrLectures.push(elem);
    });
    setLecturesPayload(arrLectures);

    setCurrentModuleData(arrLectures[0]);
  }, [ModuleInfo]);

  useEffect(() => {
    if (Object.entries(currentLecture).length > 1) {
      fetchLectureQuiz(currentLecture.id);
    }
  }, [currentLecture]);

  useEffect(() => {
    if (user.isLoggedIn === true) {
      setUserEmail(user?.user.email);
    }
    if (session) {
      setUserEmail(session?.user.email);
    }
  }, [session, user]);

  // useEffect(() => {
  //   console.log(currentLecture);
  // }, []);

  async function fetchLectureQuiz(id) {
    const quizResponse = await fetch("/api/courses/getQuiz", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    // if (quizResponse.status != 200) console.log(quizResponse.error);
    if (quizResponse.status != 200) setCurrentQuiz("");
    if (quizResponse.status === 200) setCurrentQuiz(quizResponse.data);

    // if (quizResponse.file === undefined) setCurrentQuiz("");
    // router.reload();
  }

  async function lectureProgressHandler(data) {
    const progressHandlerResponse = await fetch("/api/user/progressUpload", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
  }

  // async function fetchProgressData(data) {
  //   const progressRetreiveResponse = await fetch(
  //     "/api/user/fetchProgressData",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   ).then((f) => f.json());
  //   return progressRetreiveResponse.data;
  // }

  // function generateRandomIntegerInRange(min, max) {
  //   let value = Math.floor(Math.random() * (max - min + 1)) + min;
  //   setCurrentDuration(value);
  // }

  // const [duration, setDuration] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);

  // const handleDurationChange = (e) => {
  //   setDuration(e.target.duration);
  // };

  // const handlePlay = () => {
  //   setIsPlaying(true);
  // };

  const handlePause = ({ event, lectureId }) => {
    const progressData = {
      lectureId: lectureId,
      userEmail: userEmail,
      progress: Math.round(event.target.currentTime),
      duration: Math.round(event.target.duration),
    };

    if (event.target.currentTime === event.target.duration) return;
    lectureProgressHandler(progressData);
  };

  const handleEnd = ({ event, lectureId }) => {
    const progressData = {
      lectureId: lectureId,
      userEmail: userEmail,
      progress: "Completed",
      duration: Math.round(event.target.duration),
    };
    setShowQuiz(true);
    lectureProgressHandler(progressData);
  };
  // const handleProgress = (e) => {
  //   if (isNaN(e.target.duration))
  //     // duration is NotaNumber at Beginning.
  //     return;
  //   setProgress(e.target.currentTime);
  // };

  const openVideoWidget = () => {
    // create the widget
    setLoading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryName,
        uploadPreset: cloudinaryPreset,
        resourceType: "video", // either 'image' or 'video'
      },
      (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "video"
        ) {
          setLoading(false);
          setModuleVideoURL(result.info.secure_url);
        } else {
          console.log({ error });
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const handleCreateModule = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setSuccessMsg("");
      setError("");
      // handle Crete Module here
      const enteredTitle =
        moduleTitleInputRef.current?.value === ""
          ? ""
          : moduleTitleInputRef.current?.value;
      const enteredDescription =
        moduleDescriptionInputRef.current?.value === ""
          ? ""
          : moduleDescriptionInputRef.current?.value;
      if (!enteredTitle || !moduleDescription) {
        return setError("Please enter all fields");
      }

      const payload = {
        title: enteredTitle,
        activity: course.name,
        // description: enteredDescription,
        description: moduleDescription,
        videoUrl: moduleVideoURL,
        courseId: course.id,
      };

      axios.post("/api/admin/addNewLecture", payload).then((res) => {
        if (res.data.status === 200) {
          setSuccessMsg("Module Added Successfully");
          setLoading(false);
          setModuleVideoURL("");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setLoading(false);
          return setError("Error creating Module");
        }
      });
    } catch (error) {
      return;
    }
  };

  const handleSetCurrentLecture = async (lecture) => {
    // setCurrentLecture(lecture);
    // fetchLectureQuiz(lecture.id);
    // const progressData = {

    setCurrentModuleData(lecture);
    setCurrentLecture(lecture);
  };

  return (
    <>
      <div className={classes.LectureDetails}>
        <div className="breadcrumb">
          <Link href="/" passHref>
            <p>Home</p>
          </Link>
          <p>/ {CourseInfo?.name} / Lectures</p>
          <Link
            href={"/admin/editCourse/" + course.id}
            passHref
            className="px-5 text-danger"
          >
            <p>
              <BiEdit className="h5" />
              Edit this Course
            </p>
          </Link>
        </div>
        <Row>
          <Col sm={10}>
            {currentLecture.videoUrl === undefined ? null : (
              <div id="video_component">
                <video
                  className={classes.VideoPlayer}
                  controls={true}
                  controlsList="nodownload"
                  src={currentLecture.videoUrl}
                  // onDurationChange={handleDurationChange}
                  // onPlay={handlePlay}
                  onPause={(e) =>
                    handlePause({ lectureId: currentLecture.id, event: e })
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  // onProgress={handleProgress}
                  onEnded={(e) =>
                    handleEnd({ lectureId: currentLecture.id, event: e })
                  }
                />
                {/* <p>Duration: {progress}</p> */}
                {/* <p>{isPlaying ? "Playing" : "Paused"}</p> */}
              </div>

              // <div>
              //   <iframe
              //     className={classes.VideoPlayer}
              //     src={currentLecture.videoUrl}
              //     title="Uketa video player"
              //     frameBorder="0"
              //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              //     allowFullScreen={true}
              //     sandbox="allow-scripts allow-same-origin"
              //     // onDurationChange={handleDurationChange}
              //     // onPlay={handlePlay}
              //     // onPause={handlePause}
              //   ></iframe>
              //   {/* <p>Duration: {duration}</p>
              //   <p>{isPlaying ? "Playing" : "Paused"}</p> */}
              // </div>
            )}
            <div>
              <h6>
                {currentModuleData && currentModuleData.title
                  ? parse(currentModuleData.title)
                  : "No Title Found"}
              </h6>
              <>
                {currentModuleData && currentModuleData.description ? (
                  <p>{parse(currentModuleData.description)}</p>
                ) : (
                  <p className="text-danger">This Module has no description</p>
                )}
              </>
              {/* <p>{currentModuleData.description}</p> */}
              <>
                {currentModuleData &&
                currentModuleData.Quiz &&
                currentModuleData.Quiz.file ? (
                  <Link
                    href={currentModuleData.Quiz.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn defaultButton"
                  >
                    View WorkSheet
                  </Link>
                ) : (
                  <div className="text-danger">
                    This Module has no Worksheet
                  </div>
                )}
              </>
            </div>

            <div className={classes.ProgressRow}>
              {/* <ProgressBar
              className={classes.ProgressBar}
              variant="success"
              now={"80%"}
              // now={currentDuration}
                label={"100%"}
            /> */}
              {/* <a target="_blank" href={currentQuiz} rel="noreferrer">
                <Button className={classes.QuizButton + " defaultButton"}>
                  Take Quiz
                </Button>
              </a> */}
              {showQuiz === true ? (
                <a
                  href={currentQuiz}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.QuizButton + " defaultButton text-center"}
                >
                  View Worksheet
                </a>
              ) : null}

              {/* <Button className="defaultButton" onClick={handleShow}>
                Take Quiz
              </Button> */}
            </div>
          </Col>
          <Col sm={2}>
            <p className="sectionSubheader">Course Modules</p>

            {modules && modules.length < 1 ? (
              <p className="alert alert-danger text-center">No Modules found</p>
            ) : (
              <>
                {lecturesPayload &&
                  Object.values(lecturesPayload).map((lecture) => {
                    if (lecture.id == currentModuleData.id) {
                      return (
                        <div
                          className={classes.SidebarLink + " bg-light"}
                          // onClick={() => setCurrentLecture(lecture)}
                          key={lecture.id}
                        >
                          <p>{lecture.title}</p>
                          <p>
                            <BsFillPlayCircleFill
                              className={classes.SidebarPlayIcon + " text-dark"}
                            />{" "}
                            Play Lecture
                          </p>
                          {/* <progress
                        id="progress"
                        max="100"
                        value={() =>
                          fetchProgressData({
                            lecture: lecture.id,
                            user: userEmail,
                          })
                        }
                      ></progress> */}
                          {/* {Object.entries(currentDurations).map((duration) => {
                        return lecture[0] === duration[0] ? (
                          <ProgressBar
                            variant="success"
                            now={duration[1]}
                            //   label={60}
                          />
                        ) : null;
                      })} */}
                          {/* <Form.Check type="checkbox" id="" label="Mark Complete" /> */}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={classes.SidebarLink}
                          onClick={() => handleSetCurrentLecture(lecture)}
                          key={lecture.id}
                        >
                          <p>{lecture.title}</p>
                          <p>
                            <BsFillPlayCircleFill
                              className={classes.SidebarPlayIcon}
                            />{" "}
                            Play Lecture
                          </p>
                          {/* <progress
                          id="progress"
                          max="100"
                          value={() =>
                            fetchProgressData({
                              lecture: lecture.id,
                              user: userEmail,
                            })
                          }
                        ></progress> */}
                          {/* {Object.entries(currentDurations).map((duration) => {
                          return lecture[0] === duration[0] ? (
                            <ProgressBar
                              variant="success"
                              now={duration[1]}
                              //   label={60}
                            />
                          ) : null;
                        })} */}
                          {/* <Form.Check type="checkbox" id="" label="Mark Complete" /> */}
                        </div>
                      );
                    }
                  })}
              </>
            )}
            <Button variant="dark" onClick={handleShowAddModal}>
              Add New Module
            </Button>
          </Col>
        </Row>
      </div>
      <CourseInfoEl props={props}/>

      {/* <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Module Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.QuizModal}>
            <iframe
              className={classes.QuizFrame}
              src="https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/preview"
              title=""
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <Document
              file="https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/view?usp=share_link"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                What are the first 3 planets closest to the sun?
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Separate options with a comma"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Explain your answers above.</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link
            href="https://drive.google.com/file/d/13El7RCH4-GEj_SAGyf9ZHfypbLDZw7W-/view"
            passHref
          >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          </Link>
          <Button className="defaultButton" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateModule}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>
                <span className="text-danger">* </span>Title:
              </Form.Label>
              <Form.Control
                ref={moduleTitleInputRef}
                type="text"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>
                <span className="text-danger">* </span>Description:
              </Form.Label>
              {/* <Form.Control
                ref={moduleDescriptionInputRef}
                type="text"
                as="textarea"
                rows={10}
                autoFocus
                required
              /> */}
              <Editor
                  props={moduleDescription}
                  sendDataInput={handleModuleDescriptionDataInput}
                />
            </Form.Group>
            <Form.Group className="mb-3 d-block" controlId="">
              <Form.Label>
                Video{"   "}
                <span className="text-danger">
                  (File size should not exceed 100MB)
                </span>
                :
              </Form.Label>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" className="text-orange" />
                </div>
              ) : (
                <div className="d-flex">
                  <div
                    onClick={openVideoWidget}
                    className="btn defaultButton d-block w-50 mx-auto"
                  >
                    Upload Video
                  </div>
                </div>
              )}
            </Form.Group>

            {moduleVideoURL && (
              <video controls className="w-100">
                <source src={moduleVideoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            {successMsg && (
              <div className="alert alert-success text-center">
                {successMsg}
              </div>
            )}

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" className="text-orange" />
              </div>
            ) : (
              <Button className="btn btn-success w-100 my-4" type="submit">
                Create Module
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

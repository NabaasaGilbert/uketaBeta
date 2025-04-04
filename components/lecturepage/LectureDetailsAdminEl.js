import { Col, Row, Button } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
import classes from "./LecturePage.module.css";
// import lectures from "../data/moduleVideos.json";
// import durations from "../data/moduleDurations.json";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { BsFillPlayCircleFill } from "react-icons/bs";
// import Form from "react-bootstrap/Form";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import ReactPlayer from "react-player";
import { useRecoilValue } from "recoil";
import { currentModuleState, currentCourseState } from "../../atoms/atoms";
import Link from "next/link";
import CourseInfoEl from "../coursepage/CourseInfoEl";
// import { Document, Page } from "react-pdf";
import useUser from "../../lib/useUser";
import { useSession } from "next-auth/react";
import parser from "html-react-parser";

export default function LectureDetailsEl(props) {
  // const router = new useRouter();
  // const queryId = router.query.courseId;
  // const CourseName = props.courseName;
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
  const [currentModuleData, setCurrentModuleData] = useState("");

  const {instructor, course, modules} = props;
 
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

  useEffect(() => {
    modules &&
      Object.values(modules).map((lecture, index) => {
        if (index === 0) {
          // setCurrentModuleData(lecture);
          setCurrentLecture(lecture);
        }
      });
  }, [modules]);

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

  return (
    <>
      <div className={classes.LectureDetails}>
        <div className="breadcrumb">
          <Link href="/" passHref>
            <p>Home</p>
          </Link>
          <p>/ {course?.name} / Lectures</p>
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
              <h6>{currentLecture?.title}</h6>
              <>{currentLecture && currentLecture.description && parser(currentLecture?.description)}</>

              <div>
                {currentLecture &&
                  currentLecture.Quiz &&
                  currentLecture.Quiz.file && (
                    <Link
                      href={currentLecture.Quiz.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn defaultButton"
                    >
                      View WorkSheet
                    </Link>
                  )}
              </div>

              {/* <ProgressBar
              className={classes.ProgressBar}
              variant="success"
              now={currentDuration}
              //   label={"100%"}
            /> */}
              {/* <a target="_blank" href={currentQuiz} rel="noreferrer">
                <Button className={classes.QuizButton + " defaultButton"}>
                  Take Quiz
                </Button>
              </a> */}
              {/* {showQuiz === true ? (
                <a
                  href={currentQuiz}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.QuizButton + ' defaultButton text-center'}
                >
                  View Worksheet
                </a>
              ) : null} */}

              {/* <Button className="defaultButton" onClick={handleShow}>
                Take Quiz
              </Button> */}
            </div>
          </Col>
          <Col sm={2}>
            <p className="sectionSubheader">Course Modules</p>
            {modules &&
              Object.values(modules).map((lecture) => {
                if (lecture.id === currentLecture.id) {
                  return (
                    <div
                      // className={classes.SidebarLink}
                      className={classes.SidebarLink + " bg-light"}
                      onClick={() => {
                        return setCurrentLecture(lecture);
                      }}
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
                } else {
                  return (
                    <div
                      className={classes.SidebarLink}
                      onClick={() => setCurrentLecture(lecture)}
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
          </Col>
        </Row>
      </div>

      <CourseInfoEl course={course} instructor={instructor} modules={modules} />
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
    </>
  );
}

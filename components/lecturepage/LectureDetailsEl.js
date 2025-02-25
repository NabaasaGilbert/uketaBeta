import { Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
// import Modal from "react-bootstrap/Modal";
import classes from "./LecturePage.module.css";
// import lectures from "../data/moduleVideos.json";
// import durations from "../data/moduleDurations.json";
import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
import { BsFillPlayCircleFill } from "react-icons/bs";
// import Form from "react-bootstrap/Form";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import ReactPlayer from "react-player";
import { useRecoilValue } from "recoil";
import { currentModuleState, currentCourseState } from "../../atoms/atoms";
import Link from "next/link";
import CourseInfoLectureEl from "../coursepage/CourseInfoLectureEl";
// import { Document, Page } from "react-pdf";
import useUser from "../../lib/useUser";
import { useSession } from "next-auth/react";
import parser from "html-react-parser";
import axios from "axios";
// import Modal from "react-bootstrap/Modal";
// import CourseInfoEl from "../coursepage/CourseInfoEl"

export default function LectureDetailsEl(props) {
  // const router = new useRouter();
  // const queryId = router.query.courseId;
  // const CourseName = props.courseName;
  const { user } = useUser();
  const googleFormIframeRef = useRef();
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewErr, setReviewErr] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showGoogleFormModal, setShowGoogleFormModal] = useState(false);

  const { instructor, course, modules, reviews, rating, students } = props;
  const courseId = course.id;
  const [videoDuration, setVideoDuration] = useState(null);
  const [lecturesProgress, setLecturesProgress] = useState([]);
  const [completedLecturesProgress, setCompletedLecturesProgress] = useState(
    []
  );
  const [viewCertificateButton, setViewCertificateButton] = useState(true);

  const handleCloseGoogleFormModal = () => setShowGoogleFormModal(false);

  // feedback Modal
  const [satisfactionRating, setSatisfactionRating] = useState(null);
  const [platformAccessibilityRating, setPlatformAccessibilityRating] =
    useState(null);
  const [courseMaterialEngagement, setCourseMaterialEngagement] =
    useState(null);
  const [coachRating, setCoachRating] = useState(null);
  const [worksheetsHelpfulRating, setWorksheetsHelpfulRating] = useState(null);
  const [courseApplicability, setCourseApplicability] = useState(null);
  const [courseAffordability, setCourseAffordability] = useState(null);
  const [recommendToFriend, setRecommendToFriend] = useState(null);
  const [feedbackComment, setFeedbackComment] = useState(null);
  const [feedbackError, setFeedbackError] = useState("");
  const [isSendingFeedbackFormData, setIsSendingFeedbackFormData] =
    useState(false);

  const handleLoadedMetadata = (event) => {
    // The 'loadedmetadata' event is triggered when the video metadata is loaded,
    // including the duration.
    setVideoDuration(event.target.duration);
  };

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
  //     if (queryId === duration.id) {courseId
  //       setCurrentDurations(duration.lectures);
  //     }
  //   });
  //   generateRandomIntegerInRange(30, 100);
  // }, []);

  const getLectureProgress = async () => {
    try {
      const userEmail = user.user.email;
      const payload = { userEmail, courseId };
      axios.post(`/api/user/getLectureProgress`, payload).then((res) => {
        setLecturesProgress(res.data.data);
        const filteredArray = res.data.data.filter(
          (item) => item.progress === "Completed"
        );
        const idArray = filteredArray.map((item) => item.lectureId);
        setCompletedLecturesProgress(idArray);

        if (idArray.length >= modules.length) {
          // setShowReviewModal(true);
          // Check if Review Exists before showing modal
          const payload = {
            courseId,
            userId: user.user.id,
          };

          axios
            .post(`/api/user/getUserCourseReview`, payload)
            .then((res) => {
              const review = res.data.message;
              if (review === null) {
                setShowReviewModal(true);
              } else {
                console.log({ message: "Review Already exists" });
                const payload = { userId: user.user.id, courseId: courseId };
                axios
                  .post(`/api/admin/getFeedbackByUserCourse`, payload)
                  .then((res) => {
                    console.log({ res: res.data });
                    const feedback = res.data;
                    console.log({ feedback });
                    if (feedback) {
                      setShowGoogleFormModal(false);
                    } else {
                      setShowGoogleFormModal(true);
                    }
                  });
                return;
              }
            })
            // .then(() => {
            //   const payload = { userId: user.user.id, courseId: courseId };
            //   // console.log(payload)
            //   return axios.post(`/api/admin/getFeedbackByUserCourse`, payload);
            // })
            // .then((res) => {
            //   console.log({ res: res.data });
            //   const feedback = res.data;
            //   console.log({ feedback });
            //   if (feedback) {
            //     setShowGoogleFormModal(false);
            //   } else {
            //     setShowGoogleFormModal(true);
            //   }
            // })
            .catch((err) => {
              console.log({ err });
            });
        } else {
          setShowReviewModal(false);
        }
      });
    } catch (error) {
      return;
    }
  };

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
    const handleMessage = (event) => {
      // Check if the message is from the Google Form iframe
      if (event.source === googleFormIframeRef?.current?.contentWindow) {
        // Check if the message indicates a form submission
        if (event.data === "form-submitted") {
          console.log("Google Form submitted!");
          // You can perform additional actions here
          setViewCertificateButton(false);
        }
      }
    };

    // Add event listener for the 'message' event
    window.addEventListener("message", handleMessage);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (Object.entries(currentLecture).length > 1) {
      fetchLectureQuiz(currentLecture.id);
    }
  }, [currentLecture]);

  useEffect(() => {
    if (user.isLoggedIn === true) {
      setUserEmail(user?.user.email);
      const payload = { course: course.id, user: user.user.id };
      if (courseId) {
        getLectureProgress();
      }

      // axios.post(`/api/instructor/getUserCourseReview`, payload).then((res) => {
      //   if (res.data.status === 200) {
      //     if (res.data.data.length > 0) setShowReviewModal(false);
      //   } else {
      //     if (courseId) {
      //       getLectureProgress();
      //     }
      //   }
      // });
    }
    if (session) {
      setUserEmail(session?.user.email);
    }
  }, [session, user, courseId]);

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
    const response = await fetch("/api/user/progressUpload", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status is okay (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    getLectureProgress;
    // Parse the response as JSON
    const responseData = await response.json();

    if (responseData.showReviewModal) {
      console.log("Horray, you completed the Course");
      return;
    } else {
      console.log("Horray, your Course Progress has been registered");
      return;
    }
  }

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = async ({ event, lectureId }) => {
    setIsPlaying(false);
    const progressData = {
      lectureId: lectureId,
      userEmail: userEmail,
      progress: Math.round(event.target.currentTime),
      duration: Math.round(event.target.duration),
    };

    if (event.target.currentTime === event.target.duration) return;
    await lectureProgressHandler(progressData);
  };

  const handleEnd = async ({ event, lectureId }) => {
    const progressData = {
      lectureId: lectureId,
      userEmail: userEmail,
      progress: "Completed",
      duration: Math.round(event.target.duration),
    };
    setShowQuiz(true);

    // Make nex module the current module once current module is done
    const lastIndex = modules.length - 1;
    const indexOf = modules.findIndex((lecture) => lecture.id === lectureId);
    if (indexOf === lastIndex) {
      console.log("We are at the last index");
      setCurrentLecture(modules[indexOf]);
    } else {
      // move to next lecture after 1s(1000ms)
      setTimeout(() => {
        console.log("We moved to the next module");
        setCurrentLecture(modules[indexOf + 1]);
      }, 1000);
    }

    await lectureProgressHandler(progressData);
    await getLectureProgress();
  };

  const handleProgress = (e) => {
    if (isNaN(e.target.duration)) return;
    setProgress(e.target.currentTime);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const ratingChanged = (rating) => {
    setNewRating(rating);
  };

  const processReviewRating = async () => {
    try {
      setReviewErr("");
      setReviewMsg("");
      const payload = {
        rating: newRating,
        review,
        course: course.id,
        user: user.user.id,
      };
      if (!newRating) return setReviewErr("Please add a Star Rating");
      if (!review) return setReviewErr("Please add a Review");
      setReviewErr("");
      setIsSubmittingReview(true);
      setIsSendingFeedbackFormData(true);

      axios.post(`/api/instructor/addNewReview`, payload).then((res) => {
        if (res.data.status === 200) {
          setReviewMsg("Horray!!! Your review has been submitted.");
          setTimeout(() => {
            setIsSubmittingReview(false);
            setShowReviewModal(!showReviewModal);
            setIsSendingFeedbackFormData(false);
            return setShowGoogleFormModal(true);
          }, 1000);
        } else if (res.data.status === 500) {
          setIsSubmittingReview(false);
          setReviewErr(res.data.response);
          return;
        } else {
          setIsSubmittingReview(false);
          setReviewErr("Something went wrong on the server, please try again");
          return;
        }
      });
    } catch (error) {}
  };

  const handleProceedToCertificate = async () => {
    handleCloseGoogleFormModal();
    // window.open('/certificates');
    window.location.href = "/certificates";
  };

  // Handle form submission
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    const studentId = user.user.id;
    const courseId = course.id;

    // Process the form data (you can send it to a server, update state, etc.)
    if (!satisfactionRating)
      return setFeedbackError("Please add a Satisfaction rating");
    if (!platformAccessibilityRating)
      return setFeedbackError("Please add a Platform Accesibility rating");
    if (!courseMaterialEngagement)
      return setFeedbackError("Please add a Course material Engagement rating");
    if (!coachRating) return setFeedbackError("Please add a Coach rating");
    if (!worksheetsHelpfulRating)
      return setFeedbackError("Please add a WorkSheet Use rating");
    if (!courseApplicability)
      return setFeedbackError("Please add a Course Applicability rating");
    if (!courseAffordability)
      return setFeedbackError("Please add a Course Affordability rating");

    if (recommendToFriend === null)
      return setFeedbackError("Please add a Recommendation to Friend rating");
    if (!studentId)
      return setFeedbackError(
        "Please wait for student data to populate before continuing to feedback"
      );
    if (!courseId)
      return setFeedbackError(
        "Please wait for course data to populate before continuing to feedback"
      );

    const payload = {
      satisfactionRating,
      platformAccessibilityRating,
      courseMaterialEngagement,
      coachRating,
      worksheetsHelpfulRating,
      courseApplicability,
      courseAffordability,
      recommendToFriend,
      feedbackComment,
      student: studentId,
      course: courseId,
    };

    setFeedbackError("");
    setIsSendingFeedbackFormData(true);
    try {
      axios.post(`/api/user/addFeedback`, payload).then((res) => {
        if (res.data.status === 200) {
          alert(
            "Horray!!! Your feedback has been submitted. You will be redirected to the Certificates page"
          );
          setIsSendingFeedbackFormData(false);
          handleCloseGoogleFormModal();
          window.location.href = "/certificates";
        } else if (res.data.status === 400) {
          setIsSendingFeedbackFormData(false);
          setFeedbackError("Feedback already exists");
          return;
        } else if (res.data.status === 500) {
          setIsSendingFeedbackFormData(false);
          setFeedbackError("Error creating feedback");
          return setShowGoogleFormModal(false);
        } else {
          setIsSendingFeedbackFormData(false);
          setFeedbackError("Error creating feedback");
          return setShowGoogleFormModal(false);
        }
      });

      return;
    } catch (error) {}

    // Add further processing logic here
  };

  return (
    <>
      <div className={classes.LectureDetails}>
        <div className="breadcrumb">
          <Link href="/" passHref>
            <p>Home</p>
          </Link>
          <p>/ {course?.name} / Lectures </p>
        </div>
        <Row>
          <Col sm={10}>
            <div className="d-flex justify-content-right">
              <div>
                {isPlaying ? (
                  <p className="text-success">Playing</p>
                ) : (
                  <p className="text-danger">Paused</p>
                )}
              </div>
            </div>
            {currentLecture.videoUrl === undefined ? null : (
              <div id="video_component">
                <video
                  className={classes.VideoPlayer}
                  controls={true}
                  controlsList="nodownload"
                  src={currentLecture.videoUrl}
                  onLoadedMetadata={handleLoadedMetadata}
                  // onDurationChange={handleDurationChange}
                  onPlay={(e) =>
                    handlePlay({ lectureId: currentLecture.id, event: e })
                  }
                  onPause={(e) =>
                    handlePause({ lectureId: currentLecture.id, event: e })
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onProgress={handleProgress}
                  onEnded={(e) =>
                    handleEnd({ lectureId: currentLecture.id, event: e })
                  }
                />
              </div>
            )}

            <div>
              <h6>
                {currentLecture?.title} (
                {videoDuration && formatDuration(videoDuration)})
              </h6>
              <>
                {currentLecture &&
                  currentLecture.description &&
                  parser(currentLecture?.description)}
              </>

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
            </div>
          </Col>
          <Col sm={2}>
            <p className="sectionSubheader">Course Modules</p>
            {modules &&
              Object.values(modules).map((lecture) => {
                if (completedLecturesProgress.includes(lecture.id)) {
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
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={
                          classes.SidebarLink + " bg-success text-white"
                        }
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
                      </div>
                    );
                  }
                } else {
                  if (lecture.id === currentLecture.id) {
                    return (
                      <div
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
                }
              })}
          </Col>
        </Row>
      </div>

      {/* <CourseInfoEl course={course} instructor={instructor} modules={modules} students={students} rating={rating} /> */}

      <CourseInfoLectureEl
        course={course}
        instructor={instructor}
        modules={modules}
        reviews={reviews}
        rating={rating}
        students={students}
      />

      <Modal
        size="lg"
        centered
        aria-labelledby="reviewRatingModal"
        show={showReviewModal}
        onHide={() => setShowReviewModal(!showReviewModal)}
        backdrop="static" // Prevent closing on clicking outside the modal
        keyboard={false} // Prevent closing on pressing the keyboard's Escape key
      >
        <Modal.Header className="text-center">
          <Modal.Title className="text-center w-100">
            🎊🥳Thank and Congratulations for Completing Your UKETA Learning
            Course🎊🥳. <br />
            Please rate and review your experience with this course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviewErr && (
            <div className="alert alert-danger text-center">{reviewErr}</div>
          )}
          {reviewMsg && (
            <div className="alert alert-success text-center">{reviewMsg}</div>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Add Rating</Form.Label>
              <div className="d-flex justify-content-center">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={60}
                  activeColor="#ffbf36"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Add Review:</Form.Label>
              <textarea
                className="form-control"
                rows={5}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>
        {!isSubmittingReview ? (
          <Modal.Footer className="d-flex justify-content-end">
            {/* <Button
              variant="light"
              onClick={() => setShowReviewModal(!showReviewModal)}
              className="rounded-pill"
            >
              Submit Later
            </Button> */}
            <Button
              variant="success"
              onClick={() => processReviewRating()}
              className="rounded-pill"
            >
              Submit Review
            </Button>
          </Modal.Footer>
        ) : (
          <div className="mx-auto p-3">
            <Spinner className="text-warning mx-auto p-2" />
          </div>
        )}
      </Modal>

      <Modal
        show={showGoogleFormModal}
        onHide={handleCloseGoogleFormModal}
        className="courseCompletionModal"
        backdrop="static" // Prevent closing on clicking outside the modal
        keyboard={false} // Prevent closing on pressing the keyboard's Escape key
      >
        <Modal.Header>
          <Modal.Title className="text-center w-100">
            🎊🥳Thank and Congratulations for Completing Your UKETA Learning
            Course🎊🥳
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            We encourage you to take sometime to fill out this survey while your
            certificate is being generated
          </p>

          {/* <iframe
            ref={googleFormIframeRef}
            src="https://forms.gle/AK137CY3WC5aUW3M8"
            width="100%"
            height="700"
            onLoad={() => {
              console.log('Google Form iframe loaded');
            }}
          >
            Loading…
          </iframe> */}
          <form onSubmit={handleSubmitFeedback}>
            {/* Student details */}
            <div className="mb-5">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name and Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={`${user?.user?.name} - ${user?.user?.email}`}
                disabled
              />
            </div>

            {/* Satisfaction */}
            <div className="mb-5">
              <label htmlFor="satisfactionRating" className="form-label">
                How satisfied are you?
              </label>
              <div className="d-flex">
                <div className="px-3">
                  <b>
                    <i>Not Satisfied</i>
                  </b>
                </div>
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="satisfactionRating"
                      value="1"
                      onChange={(event) =>
                        setSatisfactionRating(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      1
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="satisfactionRating"
                    value="2"
                    onChange={(event) =>
                      setSatisfactionRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="satisfactionRating"
                    value="3"
                    onChange={(event) =>
                      setSatisfactionRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="satisfactionRating"
                    value="4"
                    onChange={(event) =>
                      setSatisfactionRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="satisfactionRating"
                    value="5"
                    onChange={(event) =>
                      setSatisfactionRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    5
                  </label>
                </div>
                <div>
                  <b>
                    <i>Satisfied</i>
                  </b>
                </div>
              </div>
            </div>

            {/* Course taken  */}
            <div className="mb-5">
              <label htmlFor="courseInput" className="form-label">
                What course did you take?
              </label>
              <input
                type="email"
                className="form-control"
                placeholder={course?.name}
                value={course?.name}
                disabled
              />
            </div>

            {/* Platform Accesibility */}
            <div className="mb-5">
              <label
                htmlFor="platformAccessibilityRating"
                className="form-label"
              >
                How easy or difficult was it to access the platform?
              </label>
              <div className="d-flex">
                <div className="px-3">
                  <b>
                    <i>Difficult</i>
                  </b>
                </div>
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="platformAccessibilityRating"
                      value="1"
                      onChange={(event) =>
                        setPlatformAccessibilityRating(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      1
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="platformAccessibilityRating"
                    value="2"
                    onChange={(event) =>
                      setPlatformAccessibilityRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="platformAccessibilityRating"
                    value="3"
                    onChange={(event) =>
                      setPlatformAccessibilityRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="platformAccessibilityRating"
                    value="4"
                    onChange={(event) =>
                      setPlatformAccessibilityRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="platformAccessibilityRating"
                    value="5"
                    onChange={(event) =>
                      setPlatformAccessibilityRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    5
                  </label>
                </div>
                <div>
                  <b>
                    <i>Easy</i>
                  </b>
                </div>
              </div>
            </div>

            {/* Course Material Engagement */}
            <div className="mb-5">
              <label htmlFor="courseMaterialEngagement" className="form-label">
                How engaging and informative were course materials?
              </label>
              <div className="d-flex">
                <div className="px-3">
                  <b>
                    <i>Not Engaging</i>
                  </b>
                </div>
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courseMaterialEngagement"
                      value="1"
                      onChange={(event) =>
                        setCourseMaterialEngagement(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      1
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="2"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="3"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="4"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="5"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    5
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="6"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    6
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="7"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    7
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="8"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    8
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="9"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    9
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseMaterialEngagement"
                    value="10"
                    onChange={(event) =>
                      setCourseMaterialEngagement(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    10
                  </label>
                </div>

                <div>
                  <b>
                    <i>Very Engaging</i>
                  </b>
                </div>
              </div>
            </div>

            {/* Coach Rating */}
            <div className="mb-5">
              <label htmlFor="coachRating" className="form-label">
                How would you rate the Coach ?
              </label>
              <div className="d-block">
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="coachRating"
                      value="A"
                      onChange={(event) => setCoachRating(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      A
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="coachRating"
                    value="B"
                    onChange={(event) => setCoachRating(event.target.value)}
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    B
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="coachRating"
                    value="C"
                    onChange={(event) => setCoachRating(event.target.value)}
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    C
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="coachRating"
                    value="D"
                    onChange={(event) => setCoachRating(event.target.value)}
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    D
                  </label>
                </div>
              </div>
            </div>

            {/* Worksheets Helpful */}
            <div className="mb-5">
              <label htmlFor="worksheetsHelpfulRating" className="form-label">
                Did you find the worksheets helpful?
              </label>
              <div className="d-flex">
                <div className="px-3">
                  <b>
                    <i>Not helpful</i>
                  </b>
                </div>
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="worksheetsHelpfulRating"
                      value="1"
                      onChange={(event) =>
                        setWorksheetsHelpfulRating(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      1
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="worksheetsHelpfulRating"
                    value="2"
                    onChange={(event) =>
                      setWorksheetsHelpfulRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="worksheetsHelpfulRating"
                    value="3"
                    onChange={(event) =>
                      setWorksheetsHelpfulRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="worksheetsHelpfulRating"
                    value="4"
                    onChange={(event) =>
                      setWorksheetsHelpfulRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="worksheetsHelpfulRating"
                    value="5"
                    onChange={(event) =>
                      setWorksheetsHelpfulRating(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    5
                  </label>
                </div>
                <div>
                  <b>
                    <i>Very helpful</i>
                  </b>
                </div>
              </div>
            </div>

            {/* Course Applicability */}
            <div className="mb-5">
              <label htmlFor="courseApplicability" className="form-label">
                How applicable was the course to you?
              </label>
              <div className="d-flex">
                <div className="px-3">
                  <b>
                    <i>Not applicable</i>
                  </b>
                </div>
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courseApplicability"
                      value="1"
                      onChange={(event) =>
                        setCourseApplicability(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      1
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="courseApplicability"
                    value="2"
                    onChange={(event) =>
                      setCourseApplicability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseApplicability"
                    value="3"
                    onChange={(event) =>
                      setCourseApplicability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseApplicability"
                    value="4"
                    onChange={(event) =>
                      setCourseApplicability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseApplicability"
                    value="5"
                    onChange={(event) =>
                      setCourseApplicability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    5
                  </label>
                </div>
                <div>
                  <b>
                    <i>Very applicable</i>
                  </b>
                </div>
              </div>
            </div>

            {/* Course Affordability */}
            <div className="mb-5">
              <label htmlFor="courseAffordability" className="form-label">
                How affordable was the course?
              </label>
              <div className="d-flex">
                <div className="px-3">
                  <b>
                    <i>Very affordable</i>
                  </b>
                </div>
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="courseAffordability"
                      value="1"
                      onChange={(event) =>
                        setCourseAffordability(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      1
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="courseAffordability"
                    value="2"
                    onChange={(event) =>
                      setCourseAffordability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseAffordability"
                    value="3"
                    onChange={(event) =>
                      setCourseAffordability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseAffordability"
                    value="4"
                    onChange={(event) =>
                      setCourseAffordability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="courseAffordability"
                    value="5"
                    onChange={(event) =>
                      setCourseAffordability(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="rating5">
                    5
                  </label>
                </div>
                <div>
                  <b>
                    <i>Expensive</i>
                  </b>
                </div>
              </div>
            </div>

            {/* Recommend to a Friend */}
            <div className="mb-5">
              <label htmlFor="recommendToFriend" className="form-label">
                Would you recommend this course to a friend?
              </label>
              <div className="d-flex">
                <div className="form-check form-check-inline">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="recommendToFriend"
                      value="Yes"
                      onChange={() => setRecommendToFriend(true)}
                    />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="rating1">
                      Yes
                    </label>
                  </div>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input d-block"
                    type="radio"
                    name="recommendToFriend"
                    value="No"
                    onChange={() => setRecommendToFriend(false)}
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="feedbackComment" className="form-label">
                Any other comments?
              </label>
              <textarea
                className="form-control"
                onChange={(event) => setFeedbackComment(event.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div>
              {feedbackError && (
                <div className="alert alert-danger text-center">
                  {feedbackError}
                </div>
              )}
            </div>
            <div className="pt-5">
              {isSendingFeedbackFormData ? (
                <Spinner className="text-warning" />
              ) : (
                <div className="d-flex justify-content-between">
                  <div>
                    <i>
                      Please fill out and submit the Feedback Form to be able to
                      proceed to the Certificate
                    </i>
                  </div>
                  <button type="submit" className="btn btn-orange">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

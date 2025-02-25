import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import classes from "./CoursesPage.module.css";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import {
  BsFillStarFill,
  BsFillBookmarkStarFill,
  BsFillPeopleFill,
  BsFillPlayCircleFill,
  BsPatchExclamation,
  BsGlobe2,
  BsFillCaretRightFill,
} from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";
// import { useEffect, useState } from "react";
import SidebarEl from "./SidebarEl";
// import { useSession } from "next-auth/react";
import CommentsEl from "./CommentsEl";
import { useRecoilValue } from "recoil";
import {
  currentCourseState,
  currentInstructorState,
  currentModuleState,
} from "../../atoms/atoms";
import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import useUser from "../../lib/useUser";
import Spinner from "react-bootstrap/Spinner";
import { Router } from "next/router";

var Editor = dynamic(() => import("../../components/editor"), {
  ssr: false,
});

export default function CourseInfoEl({ props }) {
  // const { user } = useUser();

  const { course, instructor, modules } = props;
  // const router = new useRouter();
  const CourseInfo = useRecoilValue(currentCourseState);
  const ModuleInfo = useRecoilValue(currentModuleState);
  const InstructorInfo = useRecoilValue(currentInstructorState);
  const [commentResponse, setCommentResponse] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentModuleId, setCurrentModuleId] = useState("");
  const [currentModuleTitle, setCurrentModuleTitle] = useState("");
  const [currentModuleDescription, setCurrentModuleDescription] = useState("");
  const [currentModuleVideoURL, setCurrentModuleVideoURL] = useState("");
  const [workSheetPDFURL, setWorkSheetPDFURL] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  // const [currerntModuleDescription, setCurrentModuleDescription] = useState("");

  // Module fields
  const moduleTitleInputRef = useRef();
  const moduleDescriptionInputRef = useRef();
  const [moduleVideoURL, setModuleVideoURL] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddWorkSheetModal, setShowAddWorkSheetModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseAddWorkSheetModal = () => setShowAddWorkSheetModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowAddModal = () => setShowAddModal(true);

  const handleShowDeleteModal = async (data) => {
    try {
      await setCurrentModuleId(data?.id);
      await setCurrentModuleTitle(data?.title);
      await setCurrentModuleDescription(data?.description);
      return setShowDeleteModal(true);
    } catch (e) {
      return
    }
  };

  const handleShowEditModal = async (data) => {
    try {
      // await setCurrentModule(data);
      await setCurrentModuleId(data?.id);
      await setCurrentModuleTitle(data?.title);
      await setCurrentModuleDescription(data?.description);
      await setCurrentModuleVideoURL(data?.videoUrl);
      return setShowEditModal(true);
    } catch (e) {
      return
    }
  };

  const handleShowAddWorkSheetModal = async (data) => {
    try {
      // await setCurrentModule(data);
      await setCurrentModuleId(data?.id);
      await setCurrentModuleTitle(data?.title);
      return setShowAddWorkSheetModal(true);
    } catch (e) {
      return
    }
  };

  // const { data: session } = useSession();
  async function commentSubmitHandler(commentData) {
    const commentApiResponse = await fetch("/api/comments/addComment", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setCommentResponse(commentApiResponse);
    // router.reload();
  }

  useEffect(() => {
    axios.get(`/api/cloudinary`).then((res) => {
      setCloudinaryName(res.data.cloudinaryName);
      setCloudinaryPreset(res.data.cloudinaryPreset);
      return setLoading(false);
    });
  }, []);

  // create the Edit Video widget
  const openEditVideoWidget = () => {
    setLoading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryName,
        uploadPreset: cloudinaryPreset,
        resourceType: "video", // either 'image' or 'video'
      },
      async (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "video"
        ) {
          setLoading(false);
          await setCurrentModuleVideoURL(result.info.secure_url);
        } else {
          console.log({ error });
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

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
          // console.log({ error });
          return
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const openPDFWidget = () => {
    // create the widget
    setLoading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryName,
        uploadPreset: cloudinaryPreset,
        // resourceType: "auto", // either 'image' or 'video'
        // folder: "sheets",
        resourceType: "raw", // Set resourceType to 'raw' for non-image or non-video files
        maxFiles: 1, // Maximum number of files to be uploaded
        formats: ["pdf"],
      },
      // handleUploadSuccess
      (error, result) => {
        if (result && result.info && result.info.files) {
          // const imgLink = result.info.files[0].uploadInfo.secure_url;

          if (result.info.files.length > 0) {
            const imgLink = result.info.files[0].uploadInfo.secure_url;
            setLoading(false);
            // setModuleVideoURL(result.info.secure_url);
            setWorkSheetPDFURL(imgLink);
          } else {
            setLoading(false);
            // console.log({ result, error, msg: "failed to upload PDF" });
          }
        } else {
          setLoading(false);
          // console.log({ result, error, msg: "failed to upload PDF" });
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const handleModuleDescriptionDataInput = (data) => {
    setModuleDescription(data);
  };

  const handleCurrentModuleDescriptionDataInput = (data) => {
    setCurrentModuleDescription(data);
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
      // console.log({ enteredTitle, enteredDescription });
      if (!enteredTitle || !moduleDescription) {
        setLoading(false);
        return setError("Please enter all fields");
      }

      const payload = {
        title: enteredTitle,
        activity: course.name,
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

  const handleEditModule = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setSuccessMsg("");
      setError("");
      // handle Crete Module here
      if (!currentModuleTitle || !currentModuleDescription) {
        return setError("Module should have Title and Description");
      }

      const payload = {
        id: currentModuleId,
        title: currentModuleTitle,
        description: currentModuleDescription,
        videoUrl: currentModuleVideoURL,
      };

      axios.post("/api/admin/editLectureData", payload).then((res) => {        
        if (res.data.status === 200) {
          setSuccessMsg("Module Edited Successfully");
          setLoading(false);
          setCurrentModuleId("");
          setCurrentModuleTitle("");
          setCurrentModuleDescription("");
          setCurrentModuleVideoURL("");
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

  const handleDeleteModule = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setSuccessMsg("");
      setError("");
      // handle Crete Module here
      if (!currentModuleId) {
        return setError("Module should have an ID");
      }

      const payload = {
        data: currentModuleId,
      };

      axios.delete("/api/admin/deleteLecture", payload).then((res) => {   
         
        if (res.data.status === 200) {
          setSuccessMsg("Module Deleted Successfully");
          setLoading(false);
          setCurrentModuleId("");
          setCurrentModuleTitle("");
          setCurrentModuleDescription("");
          setCurrentModuleVideoURL("");          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setLoading(false);
          return setError("Error deleting Module");
        }
      });
    } catch (error) {
      return;
    }
  };

  const handleAddWorkSheetModule = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setSuccessMsg("");
      setError("");
      // handle Crete Module here
      if (!workSheetPDFURL || !currentModuleId) {
        return setError("Worksheet should have PDF file attached");
      }

      const payload = {
        lectureId: currentModuleId,
        file: workSheetPDFURL,
      };

      axios.post("/api/admin/addWorksheet", payload).then((res) => {        
        if (res.data.status === 200) {
          setSuccessMsg("Worksheet Added Successfully");
          setLoading(false);
          setCurrentModuleId("");
          setCurrentModuleTitle("");
          setCurrentModuleDescription("");
          setCurrentModuleVideoURL("");
          setWorkSheetPDFURL("");
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

  return (
    <>
      <Row className={classes.CourseContent}>
        {!course ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <>
            <Col sm={9}>
              <CommentsEl
                onAddComment={commentSubmitHandler}
                reponse={commentResponse}
              />
              <p className={classes.CourseDetailsName}>{course?.name}</p>
              <p>{course && course.shortDesc && parse(course.shortDesc)}</p>
              <div className={classes.DetailRow}>
                <BsFillStarFill className={classes.StarIcon} />
                {course?.rating +
                  " (" +
                  course?.ratingCount +
                  " ratings) " +
                  course?.studentCount +
                  " Students"}
              </div>
              <Link
                href={"/admin/instructor/" + instructor?.id}
                className={classes.tutorLink}
                passHref
              >
                <div key={instructor?.id} className={classes.DetailRow}>
                  <img
                    src={instructor?.image}
                    // className={classes.tutorImage}
                    alt=""
                  />
                  <p>{instructor?.instructor}</p>
                </div>
              </Link>
              {/* <div className={classes.DetailRow}> */}
              {/* <img src={InstructorInfo?.image} alt="" /> */}
              {/* <p className="pt-3">{InstructorInfo?.instructor}</p> */}
              {/* </div> */}
              <p className="mt-2">
                <BsPatchExclamation /> Last updated: {course?.updateDate}
              </p>
              <p>
                <BsGlobe2 /> English
              </p>
              <div>
                <p className={classes.DescriptionSubheader}>Description</p>
                <p>{course && course.longDesc && parse(course?.longDesc)}</p>
              </div>
              <div className={classes.DescriptionSection}>
                <p className={classes.DescriptionSubheader}>Introduction</p>
                <p>{course?.introduction}</p>
              </div>
              <div className={classes.DescriptionSection}>
                <p className={classes.DescriptionSubheader}>Requirements</p>
                <p>
                  1. A working internet connection.
                  <br />
                  2. A book/pad to take notes.
                  <br />
                  3. A desktop/laptop or mobile device to watch video lessons.
                  <br />
                </p>
              </div>
              <div className={classes.DescriptionSection}>
                <div className="d-flex justify-content-between py-2">
                  <p className={classes.DescriptionSubheader}>Manage Modules</p>
                  <Button variant="dark" onClick={handleShowAddModal}>
                    Add New Module
                  </Button>
                </div>

                {course &&
                  course.Lecture &&
                  course.Lecture.length > 0 &&
                  Object.values(course.Lecture).map((info) => {                    
                    return (
                      <div key={info.id} className="alert alert-warning p-3">
                        <div className="d-flex justify-content-between">
                          <p className={classes.subHeader}>
                            {/* <BsFillCaretRightFill className="px-2" /> */}
                            {info.title}
                          </p>
                          {/* {console.log({info?.Quiz?.file})} */}
                          <div className="d-flex">
                            <Button
                              className="btn btn-warning mx-2"
                              onClick={() => handleShowAddWorkSheetModal(info)}
                            >
                              Add WorkSheet
                              <BiEdit />
                            </Button>
                            <Button
                              className="btn btn-success mx-2"
                              onClick={() => handleShowEditModal(info)}
                            >
                              Edit
                              <BiEdit />
                            </Button>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleShowDeleteModal(info)}
                            >
                              Delete
                              <BiTrash />
                            </Button>
                          </div>
                        </div>

                        <p>
                          {info && info.description && parse(info.description)}
                        </p>
                        {info && info.Quiz && info.Quiz.file && (
                          <a href={info?.Quiz?.file} target="_blank">
                            View WorkSheet
                          </a>
                        )}
                      </div>
                    );
                  })}
              </div>
              {/* <div className={classes.DescriptionSection}>
            <p className={classes.DescriptionSubheader}>Reviews</p>
            {Object.entries(Reviews).map((reviewObject) => {
              Object.values(reviewObject).map((review) => {
                return <p key={review.id}>{review.reviews}</p>;
              });
            })}
          </div> */}
              <div className={classes.DescriptionSection}>
                <p className={classes.DescriptionSubheader}>Coach</p>
                {/* {Object.values(Instructors).map((instructor) => {
              return CourseInfo?.tutor === instructor.instructor ? ( */}
                <Row>
                  <Col sm={3}>
                    <img
                      src={
                        instructor.image
                          ? instructor.image
                          : "/defaults/default-profile-image.png"
                      }
                      className={classes.InstructorImage}
                      alt=""
                    />
                  </Col>
                  <Col sm={9}>
                    <p className={classes.subHeader}>{instructor?.tutor}</p>
                    <p>{instructor?.shortDesc}</p>
                    <p>
                      <BsFillStarFill /> {instructor?.rating} Instructor Rating
                    </p>
                    <p>
                      <BsFillBookmarkStarFill /> {instructor?.reviews} Reviews
                    </p>
                    <p>
                      <BsFillPeopleFill /> {instructor?.students} Students
                    </p>
                    <p>
                      <BsFillPlayCircleFill /> {instructor?.courses} Courses
                    </p>
                    <Link href={"/admin/instructor/" + instructor?.id} passHref>
                      <Button className="defaultButton">Learn More</Button>
                    </Link>
                  </Col>
                  <p>
                    <br />
                    {instructor?.desc}
                  </p>
                </Row>
                {/* ) : null;
            })} */}
              </div>
            </Col>
            <Col sm={3}>
              {course?.previewVideo === null ? null : (
                <iframe
                  className={classes.IntroVideo}
                  src={course?.previewVideo}
                  title="FREE Introductory Class! What do you want from your life?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              {/* <SidebarEl /> */}
              <SidebarEl instructor={course?.tutor} />
            </Col>
          </>
        )}

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center text-danger">
              <h3 className="text-center text-dark">{currentModuleTitle}</h3>
              <p className="text-center text-dark">
                {currentModuleDescription}
              </p>
              <h4>Are you sure you want to delete this module?</h4>
              <h4>This action is irreversible !!!</h4>
            </div>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            {successMsg && (
              <div className="alert alert-success text-center">
                {successMsg}
              </div>
            )}
          </Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" className="text-orange" />
            </div>
          ) : (
            <Modal.Footer className="w-100 d-flex justify-content-between">
              <Button variant="light" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteModule}>
                Delete Module
              </Button>
            </Modal.Footer>
          )}
        </Modal>

        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditModule}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>
                  <span className="text-danger">* </span>Title:
                </Form.Label>
                <Form.Control
                  // ref={moduleTitleInputRef}
                  type="text"
                  autoFocus
                  value={currentModuleTitle}
                  onChange={(e) => setCurrentModuleTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>
                  <span className="text-danger">* </span>Description:
                </Form.Label>
                {/* <Form.Control
                  // ref={moduleDescriptionInputRef}
                  type="text"
                  as="textarea"
                  rows={10}
                  autoFocus
                  value={currentModuleDescription}
                  onChange={(e) => setCurrentModuleDescription(e.target.value)}
                  required
                /> */}
                <Editor
                  props={currentModuleDescription}
                  sendDataInput={handleCurrentModuleDescriptionDataInput}
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
                      onClick={openEditVideoWidget}
                      className="btn defaultButton d-block w-50 mx-auto"
                    >
                      Change Video
                    </div>
                  </div>
                )}
              </Form.Group>

              {currentModuleVideoURL && (
                <video controls className="w-100">
                  <source src={currentModuleVideoURL} type="video/mp4" />
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
                  Update Module
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>

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

        <Modal
          show={showAddWorkSheetModal}
          onHide={handleCloseAddWorkSheetModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Worksheet to Module</Modal.Title>
          </Modal.Header>
          <div className="p-2 text-center">
            <p>You are Adding a worksheet to the Module :</p>
            <h5>{currentModuleTitle}</h5>
          </div>
          <Modal.Body>
            <Form onSubmit={handleAddWorkSheetModule}>
              <Form.Group className="mb-3 d-block" controlId="">
                <Form.Label>
                  Add Work Sheet PDF File{"   "}
                  <span className="text-danger">
                    (File size should not exceed 10MB)
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
                      onClick={openPDFWidget}
                      className="btn defaultButton d-block w-50 mx-auto"
                    >
                      Add WorkSheet PDF File
                    </div>
                  </div>
                )}
              </Form.Group>

              {workSheetPDFURL && (
                <div className="d-flex">
                  <Link
                    href={workSheetPDFURL}
                    target="_blank"
                    className="btn btn-warning mx-auto"
                  >
                    Preview PDF
                  </Link>
                </div>
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
                  Add Worksheet
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
}

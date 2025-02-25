import { Col, Row, Button } from "react-bootstrap";
import classes from "./CoursesPage.module.css";
import Link from "next/link";
import {
  BsFillStarFill,
  BsFillBookmarkStarFill,
  BsFillPeopleFill,
  BsFillPlayCircleFill,
  BsPatchExclamation,
  BsGlobe2,
  BsFillCaretRightFill,
  BsArrowUpCircle,
} from "react-icons/bs";
// import { useEffect, useState } from "react";
import SidebarEl from "../homepage/SidebarEl";
// import { useSession } from "next-auth/react";
import CommentsEl from "./CommentsEl";
import { useRecoilValue } from "recoil";
import {
  currentCourseState,
  currentInstructorState,
  currentModuleState,
} from "../../atoms/atoms";
import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/router";
// import useUser from "../../lib/useUser";
import Spinner from "react-bootstrap/Spinner";
import parser from "html-react-parser";
import ReactStars from "react-rating-stars-component";
import moment from "moment/moment";
import ToggleableText from "../helpers/ToogleableText";
import axios from "axios";

export default function CourseInfoEl(props) {
  // const ref = useRef(null);
  const { instructor, course, modules, reviews, rating, students } = props;
  // console.log({ students });
  const [commentResponse, setCommentResponse] = useState("");
  const aboutRef = useRef(null);
  const modulesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const discussBoardRef = useRef(null);
  const reviewsRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const onMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === 0) {
      // Window is still at the top of the page height
      setIsAtTop(true);
    } else {
      // Window is not at the top of the page height
      setIsAtTop(false);
    }
  };

  const getBlogs = async () => {
    try {
      axios.get("/api/admin/fetchAllBlogs").then((res) => {
        let arr = [...res.data];

        // Randomize the order of the blogs
        arr = arr.sort(() => Math.random() - 0.5);

        // Limit the number of blogs to 3
        arr = arr.slice(0, 5);

        setBlogs(arr.reverse());
        setLoading(false);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getBlogs();
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    // observer.observe(ref.current);
    window.addEventListener("mousemove", onMouseMove);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleScrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = topOffset + scrollTop - 100;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };

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

  const [openModule, setOpenModule] = useState(null);

  const toggleDescription = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  return (
    <>
      <Row className={classes.CourseContent}>
        {!course ? (
          <Spinner animation="border" variant="warning" />
        ) : (
          <>
            <Col sm={12} md={12} lg={7} xl={7} ref={aboutRef}>
              <div className="d-flex mb-3 overflow-auto overflow-scrolling-touch">
                <button
                  className="btn btn-light mx-1"
                  onClick={() => handleScrollToSection(aboutRef)}
                >
                  About
                </button>
                <button
                  className="btn btn-light mx-1"
                  onClick={() => handleScrollToSection(modulesRef)}
                >
                  Modules
                </button>
                <button
                  className="btn btn-light mx-1"
                  onClick={() => handleScrollToSection(testimonialsRef)}
                >
                  Testimonials
                </button>
                <button
                  className="btn btn-light mx-1"
                  onClick={() => handleScrollToSection(discussBoardRef)}
                >
                  Discussion Board
                </button>
                <button
                  className="btn btn-light mx-1"
                  onClick={() => handleScrollToSection(reviewsRef)}
                >
                  Reviews
                </button>
              </div>
              <div>
                {" "}
                <p className={classes.DescriptionSubheader}>About</p>
                <div className="border p-3 rounded">
                  <p className={classes.CourseDetailsName}>{course?.name}</p>
                  <p>
                    {course && course.shortDesc && (
                      <ToggleableText
                        text={parser(course?.shortDesc)}
                        maxChars={120}
                      />
                    )}
                  </p>
                  <div className={classes.DetailRow}>
                    <BsFillStarFill className={classes.StarIcon} />
                    {/* {course?.rating +
                      " (" +
                      course?.ratingCount +
                      " ratings) " +
                      course?.studentCount +
                      " Students"} */}
                    {rating +
                      " (" +
                      students?.length +
                      " ratings) " +
                      students.length +
                      " Students"}
                  </div>
                  <Link
                    href={"/instructor/" + instructor?.id}
                    className={classes.tutorLink}
                    passHref
                  >
                    <div key={instructor?.id} className={classes.DetailRow}>
                      {instructor && instructor.image ? (
                        <img
                          src={instructor?.image}
                          // className={classes.tutorImage}
                          alt=""
                        />
                      ) : (
                        <img
                          src="/defaults/default-profile-image.png"
                          // className={classes.tutorImage}
                          alt=""
                        />
                      )}
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
                    {course.longDesc && (
                      <ToggleableText
                        text={parser(course?.longDesc)}
                        maxChars={100}
                      />
                    )}
                  </div>
                  <div className={classes.DescriptionSection}>
                    <p className={classes.DescriptionSubheader}>Introduction</p>
                    <p>{course.longDesc && parser(course?.introduction)}</p>
                  </div>
                  <div className={classes.DescriptionSection}>
                    <p className={classes.DescriptionSubheader}>Requirements</p>
                    <p>
                      1. A working internet connection.
                      <br />
                      2. A book/pad to take notes.
                      <br />
                      3. A desktop/laptop or mobile device to watch video
                      lessons.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.DescriptionSection} ref={modulesRef}>
                {modules && (
                  <p className={classes.DescriptionSubheader}>Modules</p>
                )}
                {modules &&
                  Object.values(modules).map((info) => {
                    return (
                      <div
                        key={info.id}
                        className="my-1 bg-light-custom p-2 rounded"
                      >
                        <p
                          className={`${classes.subHeader} clickable`}
                          onClick={() => toggleDescription(info.id)}
                        >
                          <BsFillCaretRightFill />
                          {info.title}
                        </p>
                        {openModule === info.id && (
                          <p>{parser(info.description)}</p>
                        )}
                        {info && info.Quiz && info.Quiz.file && (
                          <a href={info?.Quiz?.file} target="_blank">
                            View Worksheet
                          </a>
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className="my-5" ref={testimonialsRef}>
                <p className={classes.DescriptionSubheader}>Testimonials</p>
                <div className="d-sm-block d-md-block d-lg-flex d-xl-flex flex-wrap">
                  <Col sm={12} md={12} lg={6} xl={6} className="p-1">
                    <div className="p-2 border rounded">
                      <div className="d-flex">
                        <img
                          src="/defaults/default-profile-image.png"
                          width={40}
                          height={40}
                        />
                        <div className="line-height-0 mt-2 mx-2">
                          <div>
                            <p className="fw-bold p- m-00">Joan Asiimwe</p>
                            <p className="p-0 m-0">
                              <small>Learner since 2023</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        "Learning isn't just about being better at your job:
                        it's so much more than that. Uketa allows me to learn
                        without limits."
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} md={12} lg={6} xl={6} className="p-1">
                    <div className="p-2 border rounded">
                      <div className="d-flex">
                        <img
                          src="/defaults/default-profile-image.png"
                          width={40}
                          height={40}
                        />
                        <div className="line-height-0 mt-2 mx-2">
                          <div>
                            <p className="fw-bold p- m-00">Martin Bwire</p>
                            <p className="p-0 m-0">
                              <small>Learner since 2023</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        "The course is wonderfully flexible, I want to maintain
                        my job while gaining the skills to be a better
                        entrepreneur.”
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} md={12} lg={6} xl={6} className="p-1">
                    <div className="p-2 border rounded">
                      <div className="d-flex">
                        <img
                          src="/defaults/default-profile-image.png"
                          width={40}
                          height={40}
                        />
                        <div className="line-height-0 mt-2 mx-2">
                          <div>
                            <p className="fw-bold p- m-00">Adrian Opolot</p>
                            <p className="p-0 m-0">
                              <small>Learner since 2023</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        "When I need courses on topics that my university
                        doesn't offer, Uketa is one of the best places to go."
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} md={12} lg={6} xl={6} className="p-1">
                    <div className="p-2 border rounded">
                      <div className="d-flex">
                        <img
                          src="/defaults/default-profile-image.png"
                          width={40}
                          height={40}
                        />
                        <div className="line-height-0 mt-2 mx-2">
                          <div>
                            <p className="fw-bold p- m-00">John Nsubuga</p>
                            <p className="p-0 m-0">
                              <small>Learner since 2023</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        "To be able to take courses at my own pace and rhythm
                        has been an amazing experience.”
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
              <div className="my-5" ref={discussBoardRef}>
                <p className={classes.DescriptionSubheader}>Discussion Board</p>
                <div className="p-1 border rounded">
                  <CommentsEl
                    onAddComment={commentSubmitHandler}
                    reponse={commentResponse}
                  />
                </div>
              </div>
              <div className="my-5" ref={reviewsRef}>
                <p className={classes.DescriptionSubheader}>
                  Reviews & Ratings
                </p>

                <div className="p-3 border rounded">
                  {reviews && reviews.length > 0 ? (
                    <div>
                      {reviews.map((review) => {
                        return (
                          <div className="py-2" key={review.id}>
                            <div className="d-flex">
                              <span>
                                <ReactStars
                                  count={5}
                                  value={review.rating}
                                  size={22}
                                  activeColor="#ffbf36"
                                  classNames="p-0 m-0"
                                  edit={false}
                                />{" "}
                              </span>
                              <span className="fw-bold p-1">
                                {review.User.name}
                              </span>
                            </div>
                            <div>
                              <i>
                                <small>
                                  Posted:{" "}
                                  {moment(review.createdAt).format("LL")}
                                </small>
                              </i>
                            </div>
                            <div>{review.review}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center w-100">No Reviews found</div>
                  )}
                </div>
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
                    {instructor && instructor.image ? (
                      <img
                        src={instructor?.image}
                        className={classes.InstructorImage}
                        alt=""
                      />
                    ) : (
                      <img
                        src="/defaults/default-profile-image.png"
                        className={classes.InstructorImage}
                        alt=""
                      />
                    )}
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
                    <Link href={"/instructor/" + instructor?.id} passHref>
                      <Button className="defaultButton">Learn More</Button>
                    </Link>
                  </Col>
                  <p>
                    <br />
                    {instructor.desc && parser(instructor?.desc)}
                  </p>
                </Row>
                {/* ) : null;
            })} */}
              </div>

              <div className="d-sm-block d-md-block d-lg-flex d-xl-flex">
                <Col sm={12} md={12} lg={6} xl={6} className="p-1">
                  <SidebarEl />
                </Col>
                <Col sm={12} md={12} lg={6} xl={6} className="p-1">
                  <SidebarEl instructor={instructor} />
                </Col>
              </div>
              <div>
                <div>
                  <div className="fancy-header">
                    <h5>Blogs</h5>
                  </div>
                  {loading ? (
                    <div className="d-flex">
                      <Spinner className="text-warning mx-auto" />
                    </div>
                  ) : (
                    <>
                      {blogs.map((elem) => {
                        return (
                          <Link
                            href={`/blog/` + elem.id}
                            passHref
                            key={course.id}
                            className="fancySidebarLink"
                          >
                            <li key={course.id} className="blogContentItem">
                              <img src={elem.image} />
                              <div className="fancySidebarInfo">
                                <p>{elem.title}</p>
                                <p className="text-muted">Learn More</p>
                              </div>
                            </li>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </Col>
            <Col sm={5}>
              {/* {course?.previewVideo === null ? null : (
                <iframe
                  className={classes.IntroVideo}
                  src={course?.previewVideo}
                  title="FREE Introductory Class! What do you want from your life?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )} */}
              {/* <SidebarEl />
              <SidebarEl instructor={instructor} /> */}
            </Col>
          </>
        )}
      </Row>
      {!isAtTop && (
        <button
          onClick={() => handleScrollToSection(aboutRef)}
          className="btn btn-primary rounded text-white shadow-sm m-0 bg-orange border-0 rounded-pill py-1"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1050,
          }}
        >
          <BsArrowUpCircle className="fs-1 my-2" />
        </button>
      )}
    </>
  );
}

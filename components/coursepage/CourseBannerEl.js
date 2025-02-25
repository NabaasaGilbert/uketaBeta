import { Col, Row, Button } from "react-bootstrap";
import classes from "./CoursesPage.module.css";
import {
  BsStar,
  BsPlayBtn,
  BsPatchCheck,
  BsFileEarmarkPlay,
  BsJournals,
  BsTrophy,
  BsGlobe2,
  BsCheck2,
} from "react-icons/bs";
import { ImCheckmark } from "react-icons";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  currentCourseState,
  cartState,
  userCourseDataState,
  // currentInstructorState,
} from "../../atoms/atoms";
import Link from "next/link";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import ToggleableText from "../helpers/ToogleableText";
import parser from "html-react-parser";

export default function CourseBannerEl(props) {
  const CourseInfo = useRecoilValue(currentCourseState);
  const UserCourseInfo = useRecoilValue(userCourseDataState);
  // const InstructorInfo = useRecoilValue(currentInstructorState);
  const [paidStatus, setPaidStatus] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const [instructor, setInstructor] = useState({});
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { modules } = props;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    UserCourseInfo &&
      Object.values(UserCourseInfo).map((userCourse) => {
        userCourse.courseId === CourseInfo?.id ? setPaidStatus(true) : null;
      });
    if (CourseInfo) {
      const tutor = CourseInfo.tutor;
      axios.get(`/api/instructor/getInstructor?${tutor}`).then((res) => {
        setInstructor(res.data.data);
      });
      axios
        .get(`/api/instructor/getCourseReview?${CourseInfo?.id}`)
        .then((res) => {
          let arr = [];
          res.data.data.map((elem) => {
            arr.push(elem.rating);
          });
          // setRatingCount(res.data.data.length);
          // setRatingCount(24)
          const summation = arr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
          // setRating(summation);
          setRating(5);
          setTimeout(() => {
            setIsLoading(false);
          }, 5000);
        });
      axios.get(`/api/user/getUsersOnCourse?${CourseInfo?.id}`).then((res) => {
        setStudentCount(res.data.data.length);
        setRatingCount(res.data.data.length);
      });
    }
  }, [CourseInfo, rating, studentCount]);

  return (
    <>
      <div className="breadcrumb px-2">
        <Link href="/" passHref>
          <p>Home</p>
        </Link>
        <p>/</p>
        <Link href="/courses" passHref>
          <p>Courses</p>
        </Link>
        <p>/ {CourseInfo?.name}</p>
      </div>
      <Row className="px-2">
        <Col sm={12} md={12} lg={7} xl={7}>
          <div>
            {!CourseInfo ? (
              <Spinner animation="border" variant="warning" />
            ) : (
              <div>
                <h1 className="fw-bold">{CourseInfo?.name}</h1>
                <p>
                  {" "}
                  <ToggleableText
                    text={parser(CourseInfo?.shortDesc)}
                    maxChars={120}
                  />
                </p>
                <div className="d-flex">
                  {!isLoading ? (
                    <span className="bg-white py-0 px-2 rounded m-0">
                      <ReactStars
                        count={5}
                        value={rating}
                        size={22}
                        activeColor="#ffbf36"
                        classNames="p-0 m-0"
                        edit={false}
                      />{" "}
                    </span>
                  ) : (
                    <div
                      className="spinner-grow spinner-grow-sm my-0"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}

                  <span className="py-1 px-2">
                    {rating}({ratingCount} Reviews) {studentCount} Students
                  </span>
                </div>
                <p>
                  Created by{" "}
                  <span className="fw-bold">{instructor?.instructor}</span>
                </p>
                <div className="d-flex">
                  <span>
                    <small>
                      <button className="btn border border-dark p-0 px-1 rounded-pill mx-1">
                        <BsCheck2 />
                      </button>
                      Last updated: {CourseInfo?.updateDate}
                    </small>
                  </span>{" "}
                  <span className="px-2">|</span>
                  <span className="px-2">
                    <p>
                      <small>
                        <BsGlobe2 className="mx-1" /> English
                      </small>
                    </p>
                  </span>
                </div>
              </div>
              // <img
              //   src={CourseInfo?.image}
              //   className={classes.CourseDetailsImage}
              //   alt=""
              // />
            )}
          </div>
        </Col>
        <Col sm={12} md={12} lg={5} xl={5} className="position-relative">
          <div className="courseVideoContainer">
            <div className={`${classes.SidebarRow} shadow`}>
              {paidStatus === true ? (
                <div>
                  <p className={classes.CourseDetailsPrice}>Purchased</p>
                  <video controls className="w-100">
                    <source
                      src={modules[0]?.videoUrl}
                      type="video/mp4"
                      className="w-100"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h6 className="text-center text-orange m-0">
                    Preview this course
                  </h6>
                  <Link href={"/lectures/" + CourseInfo?.id} passHref>
                    <Button className={classes.BuyButton}>View Course</Button>
                  </Link>
                </div>
              ) : (
                <>
                  {modules && (
                    <div>
                      <video
                        controls
                        className="w-100"
                        poster="/logo/UketaLogoSquare.jpg"
                      >
                        <source
                          src={modules[0]?.videoUrl}
                          type="video/mp4"
                          className="w-100"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <h6 className="text-center text-orange m-0">
                        Preview this course
                      </h6>

                      {!CourseInfo ? (
                        <Spinner animation="border" variant="warning" />
                      ) : null}
                      <p className={`${classes.CourseDetailsPrice} m-0`}>
                        {CourseInfo?.priceUGX != null && (
                          <div>
                            <small>UGX.</small>
                            {" " + numberWithCommas(CourseInfo?.priceUGX)}
                          </div>
                        )}
                      </p>
                      <p className="">
                        {CourseInfo?.priceUSD != null &&
                          CourseInfo?.priceUSD + " USD"}
                      </p>
                      {!cart[CourseInfo?.id] ? (
                        <Button
                          onClick={() => {
                            setCart({
                              ...cart,
                              [CourseInfo?.id]: CourseInfo?.name,
                            });
                          }}
                          className={`${classes.CartAddButton} ${classes.subHeader} bg-orange text-white border-0 fw-bold`}
                        >
                          Add To Cart
                        </Button>
                      ) : (
                        <Button
                          className={classes.CartAddedButton}
                          onClick={(oldCart) => {
                            const copy = { ...cart };
                            delete copy[CourseInfo?.id];
                            setCart(copy);
                          }}
                        >
                          Remove from Cart
                        </Button>
                      )}
                      {Object.entries(cart).length > 0 ? (
                        <Link href="/cart/" passHref>
                          <Button className={classes.BuyButton}>
                            Proceed to Checkout
                          </Button>
                        </Link>
                      ) : null}
                      {/* <a
                  href={CourseInfo?.paymentLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    className={classes.BuyButton}
                  >
                    Buy Now
                  </Button>
                </a> */}
                    </div>
                  )}
                </>
              )}

              {/* <p className="text-center">30-Day Money-Back Guarantee</p> */}
              <p className={`${classes.subHeader} text-orange m-0`}>
                This course includes:
              </p>
              <div className="d-flex">
                <span className="w-50">
                  <p className="fw-bold m-0 mb-1">
                    <BsFileEarmarkPlay className="text-orange" />{" "}
                    <small> {modules && modules.length} Modules</small>
                  </p>
                  <p className="fw-bold m-0 mb-1">
                    <BsPlayBtn className="text-orange" />{" "}
                    <small>On-demand video</small>
                  </p>
                  <p className="fw-bold m-0 mb-1">
                    <BsPatchCheck className="text-orange" />{" "}
                    <small>Full lifetime access</small>
                  </p>
                  <p className="fw-bold m-0 mb-1">
                    <BsJournals className="text-orange" />{" "}
                    <small>Assignments</small>
                  </p>
                </span>
                <span className="w-50">
                  <div className="fw-bold m-0 mb-1 d-flex line-height-12 mb-3">
                    <BsTrophy className="text-orange mt-0 mx-1" />{" "}
                    <span>
                      <small>Certificate of completion</small>
                    </span>
                  </div>
                  <div className="fw-bold m-0 mb-1 d-flex line-height-12">
                    <BsStar className="text-orange mt-0 mx-1" />{" "}
                    <span>
                      <div className="text-orange">
                        <small>Bonus:</small>
                      </div>
                      <div className="">
                        <small>Access to the HER private community</small>
                      </div>
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

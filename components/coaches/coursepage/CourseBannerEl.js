import { Col, Row, Button } from "react-bootstrap";
import classes from "./CoursesPage.module.css";
import {
  BsStar,
  BsPlayBtn,
  BsPatchCheck,
  BsFileEarmarkPlay,
  BsJournals,
  BsTrophy,
} from "react-icons/bs";
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

export default function CourseBannerEl() {
  const CourseInfo = useRecoilValue(currentCourseState);
  const UserCourseInfo = useRecoilValue(userCourseDataState);
  // const InstructorInfo = useRecoilValue(currentInstructorState);
  const [paidStatus, setPaidStatus] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    UserCourseInfo &&
      Object.values(UserCourseInfo).map((userCourse) => {
        userCourse.courseId === CourseInfo?.id ? setPaidStatus(true) : null;
      });
  }, [CourseInfo]);

  return (
    <>
      <div className="breadcrumb">
        <Link href="/" passHref>
          <p>Home</p>
        </Link>
        <p>/</p>
        <Link href="/courses" passHref>
          <p>Courses</p>
        </Link>
        <p>/ {CourseInfo?.name}</p>
      </div>
      <Row>
        <Col sm={8}>
          <div>
            {!CourseInfo ? (
              <Spinner animation="border" variant="warning" />
            ) : (
              <img
                src={CourseInfo?.image}
                className={classes.CourseDetailsImage}
                alt=""
              />
            )}
          </div>
        </Col>
        <Col sm={4}>
          <div className={classes.SidebarRow}>
            {paidStatus === true ? (
              <>
                <p className={classes.CourseDetailsPrice}>Purchased</p>
                <Link href={"/lectures/" + CourseInfo?.id} passHref>
                  <Button className={classes.BuyButton}>View Course</Button>
                </Link>
              </>
            ) : (
              <>
                {!CourseInfo ? (
                  <Spinner animation="border" variant="warning" />
                ) : null}
                <p className={classes.CourseDetailsPrice}>
                  {CourseInfo?.priceUGX != null &&
                    numberWithCommas(CourseInfo?.priceUGX) + " UGX"}
                </p>
                <p>
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
                    className={classes.CartAddButton}
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
              </>
            )}

            {/* <p className="text-center">30-Day Money-Back Guarantee</p> */}
            <p className={classes.subHeader}>This course includes:</p>
            <p>
              <BsFileEarmarkPlay /> {CourseInfo?.moduleCount}
            </p>
            <p>
              <BsPlayBtn /> On-demand video
            </p>
            <p>
              <BsPatchCheck /> Full lifetime access
            </p>
            <p>
              <BsJournals /> Assignments
            </p>
            <p>
              <BsTrophy /> Certificate of completion
            </p>
            <p>
              <BsStar /> Bonus: Access to the HER private community
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
}

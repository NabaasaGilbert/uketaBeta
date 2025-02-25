// import courses from "../data/courseData.json";
import { Navigation, Scrollbar, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import classes from "./Homepage.module.css";
import Link from "next/link";
import { Button, Col } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { courseDataState } from "../../atoms/atoms";
import Spinner from "react-bootstrap/Spinner";
import parser from "html-react-parser";
import limitStringLength from "../../pages/utils/limitStringLength";
import CustomLink from "../CustomLink";

export default function CourseSliderEl() {
  const CourseData = useRecoilValue(courseDataState);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={classes.sliderSection}>
      {!CourseData ? <Spinner animation="border" variant="warning" /> : null}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        effect="fade"
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 7000,
        }}
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {CourseData &&
          Object.values(CourseData).map((course) => (
            <SwiperSlide key={course.id}>
              <div className={classes.swiperSlide}>
                <Col sm={6} className={classes.swiperSlideText}>
                  <p className={classes.swiperSlideHead}>{course.name}</p>
                  <p className={classes.swiperSlideDesc}>
                    {course.shortDesc &&
                      limitStringLength(parser(course.shortDesc), 0, 250)}
                  </p>
                  <p className={classes.swiperSlideDesc}>
                    {course.longDesc &&
                      limitStringLength(parser(course.longDesc), 0, 150)}
                  </p>
                  <div className={classes.swiperSlidePrice}>
                    <p>{numberWithCommas(course.priceUGX) + " UGX"}</p>
                    <CustomLink href={"/courses/" + course.id} passHref>
                      <Button className={classes.heroButton}>Learn More</Button>
                    </CustomLink>
                  </div>
                </Col>
                <Col sm={6}>
                  <CustomLink href={"/courses/" + course.id} passHref>
                    <img src={course.image} />
                  </CustomLink>
                </Col>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

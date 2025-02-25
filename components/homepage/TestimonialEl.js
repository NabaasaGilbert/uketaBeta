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

export default function TestimonialEl() {
  return (
    <div className={classes.testimonialSection}>
      <p className="sectionHeader text-center mt-3">Testimonies</p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        effect="fade"
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 7000,
        }}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        className={classes.testimonialSlider}
      >
        <SwiperSlide>
          <div className={classes.testimonialSlide}>
            <img src="/hero_slider/idea.png" alt="" />
            <div className={classes.testimonialSlideText}>
              <p className={classes.swiperSlideHead}>Kansiime Milcah</p>
              <p className={classes.swiperSlideDesc}>
                “This course has been quite a journey into self-discovery that I
                will refer to as often as I can. believe in myself more than I
                did before.”
              </p>
            </div>
          </div>
          {/* </Link> */}
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.testimonialSlide}>
            <img src="/hero_slider/brain.png" alt="" />
            <Col className={classes.testimonialSlideText}>
              <p className={classes.swiperSlideHead}>Norah Nakidde</p>
              <p className={classes.swiperSlideDesc}>
                “This course has changed the way I take each day. I have become
                more productive and e􀆚cient at work and I feel ready to conquer
                anything that comes my way.”
              </p>
            </Col>
          </div>
          {/* </Link> */}
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.testimonialSlide}>
            <img src="/hero_slider/study.png" alt="" />
            <Col className={classes.testimonialSlideText}>
              <p className={classes.swiperSlideHead}>Rosemary Nakalinzi</p>
              <p className={classes.swiperSlideDesc}>
                “The courses have reminded me of the importance of being visible
                and speaking up in different contexts to bring about the
                positive changes I would like to see; it&apos;s vital to be at
                that decision table or have the right people to speak for you in
                your absence.”
              </p>
            </Col>
          </div>
          {/* </Link> */}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

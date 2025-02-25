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

export default function HeroEl() {
  return (
    <div className={classes.sliderSection}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        effect="fade"
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        autoplay={{
          delay: 7000,
        }}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        className={classes.heroSlider}
      >
        <SwiperSlide>
          <div className={classes.heroSlide}>
            <Col sm={6} className={classes.heroSlideText}>
              <p className={classes.swiperSlideHead}>Get Certified</p>
              <p className={classes.swiperSlideDesc}>
                Finish your course and get certified by Ibanda University
              </p>
              <img src="/hero_slider/certificate.png" alt="" />
            </Col>
            <Col sm={6}>
              <img src="/slider/certificate.png" />
            </Col>
          </div>
          {/* </Link> */}
        </SwiperSlide>

        <SwiperSlide>
          <div className={classes.heroSlide}>
            <Col sm={6} className={classes.heroSlideText}>
              <p className={classes.swiperSlideHead}>Unlock</p>
              <p className={classes.swiperSlideDesc}>
                Gain a lifetime access to knowledge material, tools and
                in-demand skills that will set you on a path to discover your
                untapped potential.
              </p>
              <img src="/hero_slider/idea.png" alt="" />
            </Col>
            <Col sm={6}>
              <img src="https://res.cloudinary.com/daecbszah/image/upload/v1677774325/hero%20slider/hero2_njyohv.png" />
            </Col>
          </div>
          {/* </Link> */}
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.heroSlide}>
            <Col sm={6} className={classes.heroSlideText}>
              <p className={classes.swiperSlideHead}>Understand</p>
              <p className={classes.swiperSlideDesc}>
                Our course content is packaged with an audio-visual balance, so
                you not only learn it but also understand it.
              </p>
              <img src="/hero_slider/brain.png" alt="" />
            </Col>
            <Col sm={6}>
              <img src="https://res.cloudinary.com/daecbszah/image/upload/v1677774320/hero%20slider/hero1_lnd0lt.png" />
            </Col>
          </div>
          {/* </Link> */}
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.heroSlide}>
            <Col sm={6} className={classes.heroSlideText}>
              <p className={classes.swiperSlideHead}>Uplift</p>
              <p className={classes.swiperSlideDesc}>
                Our courses help you to take the next step of your career. Join
                us today and stand out of the crowd.
              </p>
              <img src="/hero_slider/study.png" alt="" />
            </Col>
            <Col sm={6}>
              <img src="https://res.cloudinary.com/daecbszah/image/upload/v1677774326/hero%20slider/hero_ll3jrp.png" />
            </Col>
          </div>
          {/* </Link> */}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

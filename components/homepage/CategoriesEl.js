import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import classes from "./Homepage.module.css";

export default function CategoriesEl() {
  const router = new useRouter();
  const currPage = router.pathname;
  return (
    <Row
      className={
        currPage === "/"
          ? classes.categoriesSection
          : classes.categoriesSectionAbout
      }
    >
      <p className="sectionHeader text-center mt-4 mb-4">
        {currPage === "/" ? "Categories" : "What UKETA Offers"}
      </p>
      <Col xl={3} lg={3} md={6} sm={6} xs={12} className="text-center">
        <div className="d-flex">
          <img src="/hero_slider/brain.png" className="mx-auto" alt="" />
        </div>
        <p className={classes.categoryHeader}>
          Business and Career Development
        </p>
        <p>
          The courses are designed for people of all ages who want to focus on
          self-development, career advancement, and personal fulfillment.
        </p>
      </Col>
      <Col xl={3} lg={3} md={6} sm={6} xs={12} className="text-center">
        <div className="d-flex">
          <img src="/hero_slider/idea.png" className="mx-auto" alt="" />
        </div>
        <p className={classes.categoryHeader}>Educating and Training</p>
        <p>
          The interactive video-based trainings help you assess your current
          position, set goals, and learn tools and skills to achieve your goals.
        </p>
      </Col>
      <Col xl={3} lg={3} md={6} sm={6} xs={12} className="text-center">
        <div className="d-flex">
          <img src="/hero_slider/study.png" className="mx-auto" alt="" />
        </div>
        <p className={classes.categoryHeader}>Personal Development</p>
        <p>
          You will be able to improve your personal presentation, grow your
          confidence and boost your esteem.
        </p>
      </Col>
      <Col xl={3} lg={3} md={6} sm={6} xs={12} className="text-center">
        <div className="d-flex">
          <img src="/hero_slider/brain.png" className="mx-auto" alt="" />
        </div>
        <p className={classes.categoryHeader}>Networking and Resources</p>
        <p>
          You learn the best practices used by professionals all over. The
          course covers strategy, content, slides, body language and more.
        </p>
      </Col>
    </Row>
  );
}

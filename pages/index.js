import Head from "next/head";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CategoriesEl from "../components/homepage/CategoriesEl";
import CourseSliderEl from "../components/homepage/CourseSliderEl";
import InfoEl from "../components/homepage/InfoEl";
import HeroEl from "../components/homepage/HeroEl";
import PerksEl from "../components/homepage/PerksEl";
import SidebarEl from "../components/homepage/SidebarEl";
import HomeTilesEl from "../components/homepage/HomeTilesEl";
import TestimonialEl from "../components/homepage/TestimonialEl";
import classes from "../components/homepage/Homepage.module.css";
import Link from "next/link";
import InfoModal from "../components/userpages/InfoModal";
import SalesTracker from "../components/SalesTracker";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Home | Uketa Learning - Unlock, Understand, Uplift"
        />
        {/* <meta property="og:type" content="article" /> */}
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform for Uganda with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com" />
        <meta name="robots" content="all" />
      </Head>      
      <HeroEl />
      <Row>
        <p className="sectionHeader text-center mt-3">Courses</p>
        <Col sm={10}>
          <CourseSliderEl />
        </Col>
        <Col sm={2}>
          <SidebarEl />
        </Col>
      </Row>
      <CategoriesEl />
      <HomeTilesEl />
      <PerksEl />
      <TestimonialEl />
      <div className={classes.instructorSection}>
        <Col sm={6}>
          <p className="sectionHeader">Teach On Uketa</p>
          <p>
            Do you have an already existing course that could fit Uketa? Get in
            touch and start teaching today.
          </p>
          <Link href="/collaborate" passHref legacyBehavior>
            <a className="defaultButton">Become A Coach</a>
          </Link>
        </Col>
        <Col sm={6}>
          <img src="/start-teaching.jpg" alt="" />
        </Col>
      </div>
      <InfoModal />
      <SalesTracker/>
    </div>
  );
}

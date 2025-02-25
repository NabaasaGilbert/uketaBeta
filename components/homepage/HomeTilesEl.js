import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
// import courses from "../data/courseData.json";
import classes from "./Homepage.module.css";
import { Spinner } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import CountUp from "react-countup";

export default function HomeTilesEl() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  useEffect(() => {
    const getStudentCount = async () => {
      try {
        axios.get(`/api/admin/fetchAllStudents`).then((res) => {
          setStudentCount(res.data.length);
        });
      } catch (error) {}
    };
    const getCoursesCount = async () => {
      try {
        axios.get(`/api/admin/fetchAllCourses`).then((res) => {
          setCoursesCount(res.data.length);
        });
      } catch (error) {}
    };
    const getInstructorCount = async () => {
      try {
        axios.get(`/api/admin/fetchAllInstructors`).then((res) => {
          setInstructorCount(res.data.length);
        });
      } catch (error) {}
    };
    getStudentCount();
    getCoursesCount();
    getInstructorCount();
  }, []);

  return (
    // <div></div>
    <Row className="p-5 flex-wrap">
      <Col xl={3} lg={3} md={6} sm={12} xs={12} className="p-3">
        <div className="home-tiles text-white p-5 text-center">
          <div className="sectionHeader">
            <CountUp end={studentCount} duration={15} />+
          </div>
          <div className="">Members</div>
        </div>
      </Col>
      <Col xl={3} lg={3} md={6} sm={12} xs={12} className="p-3">
        <div className="home-tiles text-white p-5 text-center">
          <div className="sectionHeader">
            <CountUp end={coursesCount} duration={15} />+
          </div>
          <div className="">Courses</div>
        </div>
      </Col>
      <Col xl={3} lg={3} md={6} sm={12} xs={12} className="p-3">
        <div className="home-tiles text-white p-5 text-center">
          <div className="sectionHeader">
            <CountUp end={instructorCount} duration={20} />+
          </div>
          <div className="">Instructors</div>
        </div>
      </Col>
      <Col xl={3} lg={3} md={6} sm={12} xs={12} className="p-3">
        <div className="home-tiles text-white p-5 text-center">
          <div className="sectionHeader">4.8</div>
          <div className="">Average Instructor Rating</div>
        </div>
      </Col>
    </Row>
  );
}

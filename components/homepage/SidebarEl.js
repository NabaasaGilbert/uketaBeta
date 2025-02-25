import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
// import courses from "../data/courseData.json";
import classes from "./Homepage.module.css";
import { Spinner } from "react-bootstrap";
import CustomLink from "../CustomLink"

export default function SidebarEl(props) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { instructor } = props;

  useEffect(() => {
    const getCourses = async () => {
      try {
        if (instructor) {
          axios
            .get(`/api/instructor/getMyCourses?${instructor.id}`)
            .then((res) => {
              setCourses(res.data.data);
              return setLoading(false);
            });
        } else {
          axios.get(`/api/courses/allcourses`).then((res) => {
            setCourses(res.data);
            return setLoading(false);
          });
        }
      } catch (error) {}
    };
    getCourses();
  }, []);

  return (
    <div className={classes.sideBar}>
      <p className={classes.sidebarHeader}>
        {!instructor
          ? "Top Courses"
          : "All Courses By " + instructor.instructor}
      </p>
      <ul className={classes.sidebarList}>
        {loading && (
          <div className="d-flex">
            <Spinner className="mx-auto text-orange" />
          </div>
        )}
        {!loading &&
          courses &&
          Object.values(courses).map((course, index) =>
            index <= 4 ? (
              <CustomLink
                href={`/courses/` + course.id}
                passHref
                key={course.id}
                className={classes.sidebarLink}
              >
                <li key={course.id} className={classes.sidebarItem}>
                  <img src={course.image} />
                  <div className={classes.sidebarInfo}>
                    <p>{course.name}</p>
                    <p className="text-muted">Learn More</p>
                  </div>
                </li>
              </CustomLink>
            ) : // !instructor ? (
            //   <Link
            //     href={`/courses/` + course.id}
            //     passHref
            //     key={course.id}
            //     className={classes.sidebarLink}
            //   >
            //     <li key={course.id} className={classes.sidebarItem}>
            //       <img src={course.image} />
            //       <div className={classes.sidebarInfo}>
            //         <p>{course.name}</p>
            //         <p>Learn More</p>
            //       </div>
            //     </li>
            //   </Link>
            // ) : course.tutor === InstructorInfo.id ? (
            //   <Link
            //     href={`/courses/` + course.id}
            //     passHref
            //     key={course.id}
            //     className={classes.sidebarLink}
            //   >
            //     <li key={course.id} className={classes.sidebarItem}>
            //       <img src={course.image} />
            //       <div className={classes.sidebarInfo}>
            //         <p>{course.name}</p>
            //         <p>Learn More</p>
            //       </div>
            //     </li>
            //   </Link>
            // ) : null
            null
          )}
      </ul>
    </div>
  );
}

import Link from 'next/link';
// import courses from "../data/courseData.json";
import classes from './Homepage.module.css';
import { useRecoilValue } from 'recoil';
import { courseDataState, currentInstructorState } from '../../atoms/atoms';
import { useState, useEffect } from 'react';

export default function SidebarEl(props) {
  const CourseData = useRecoilValue(courseDataState);
  const InstructorInfo = useRecoilValue(currentInstructorState);
  const Instructor = props.instructor;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let arr = [];
    CourseData &&
      Object.values(CourseData).map((course, index) => {
        if (course.tutor === InstructorInfo.id) {
          arr.push(course);
        }
      });
    console.log(arr);
    setCourses(arr);
  }, []);

  return (
    <div className={classes.sideBar}>
      <p className={classes.sidebarHeader}>
        {/* {!Instructor
          ? 'Top Courses'
          : 'All Courses By ' + InstructorInfo.instructor} */}
        {'All Courses By ' + InstructorInfo.instructor}
      </p>
      <ul className={classes.sidebarList}>

        {courses.length < 1 ? (
          <div className="alert alert-danger text-center">No Courses found</div>
        ) : (
          <>
            {courses.map((course, index) => {
              return (
                <Link
                  href={`/courses/` + course.id}
                  passHref
                  key={course.id}
                  className={classes.sidebarLink}
                >
                  <li key={course.id} className={classes.sidebarItem}>
                    <img src={course.image} />
                    <div className={classes.sidebarInfo}>
                      <p>{course.name}</p>
                      <p>Learn More</p>
                    </div>
                  </li>
                </Link>
              );
            })}
          </>
        )}

        {/* {CourseData &&
          Object.values(CourseData).map((course, index) =>
            index <= 4 ? (
              !Instructor ? (
                <Link
                  href={`/courses/` + course.id}
                  passHref
                  key={course.id}
                  className={classes.sidebarLink}
                >
                  <li key={course.id} className={classes.sidebarItem}>
                    <img src={course.image} />
                    <div className={classes.sidebarInfo}>
                      <p>{course.name}</p>
                      <p>Learn More</p>
                    </div>
                  </li>
                </Link>
              ) : course.tutor === InstructorInfo.id ? (
                <Link
                  href={`/courses/` + course.id}
                  passHref
                  key={course.id}
                  className={classes.sidebarLink}
                >
                  <li key={course.id} className={classes.sidebarItem}>
                    <img src={course.image} />
                    <div className={classes.sidebarInfo}>
                      <p>{course.name}</p>
                      <p>Learn More</p>
                    </div>
                  </li>
                </Link>
              ) : null
            ) : null
          )} */}
          
      </ul>
    </div>
  );
}

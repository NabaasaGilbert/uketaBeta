import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import axios from "axios";
import { Spinner } from "react-bootstrap";

import {
  currentCourseState,
  currentModuleState,
  currentInstructorState,
} from "../../../atoms/atoms";
import CourseDetails from "../../../components/coaches/course/CourseDetails";

export default function CoursePage() {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = new useRouter();
  const queryId = router.query.courseId;
  const setCourseData = useSetRecoilState(currentCourseState);
  const setCourseModules = useSetRecoilState(currentModuleState);
  const setCourseInstructor = useSetRecoilState(currentInstructorState);
  // const UserCourses = useRecoilValue(userCourseDataState);
  // const AllCourseData = useRecoilValue(courseDataState);
  const { index } = router.query;
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [instructor, setInstructor] = useState({});
  const [modules, setModules] = useState([]);

  async function fetchCourseHandler(props) {
    // const courseResponse = await fetch("/api/courses/getCurrentCourse", {
    //   method: "POST",
    //   body: JSON.stringify(props),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((f) => f.json());
    
    await axios
      .post("/api/courses/getCurrentCourse", props, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        setCourse(res.data.data);
        setModules(res.data.modules);
        setInstructor(res.data.instructor);
      })
      .catch((err) => {
        setLoading(false);
      });

    // setLoading(false);
    // console.log({ courseResponse });

    // setCourse(courseResponse.data);
    // setModules(courseResponse.modules);
    // setInstructor(courseResponse.instructor);

    // setCourseData(courseResponse.data);
    // setCourseModules(courseResponse.modules);
    // setCourseInstructor(courseResponse.instructor);
  }

  // useEffect(() => {
  //   UserCourses &&
  //     Object.values(UserCourses).map((userCourse) =>
  //       userCourse.courseId === queryId
  //         ? fetchCourseHandler(queryId)
  //         : router.push("/mycourses")
  //     );
  // }, [UserCourses]);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) {
      router.push("/coach/login");
    }

    if (queryId) {
      fetchCourseHandler(queryId);
      setLoading(false);
    }
  }, [session, user, queryId]);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="d-flex my-5 py-5">
          <Spinner className="mx-auto text-orange" />
        </div>
      ) : (
        <CourseDetails
          instructor={instructor}
          modules={modules}
          course={course}
        />
      )}
    </div>
  );
}

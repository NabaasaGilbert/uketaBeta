import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import useUser from "../../lib/useUser";
import {
  currentCourseState,
  currentModuleState,
  currentInstructorState,
  // userCourseDataState,
  // courseDataState,
} from "../../atoms/atoms";
import LectureDetailsEl from "../../components/lecturepage/LectureDetailsEl";
import { Spinner } from "react-bootstrap";
import axios from "axios";

export default function LecturePage() {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = new useRouter();
  const queryId = router.query.lectureId;
  // console.log({queryId})
  const [course, setCourse] = useState({});
  const [modules, setModules] = useState([]);
  const [instructor, setInstructor] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [students, setStudents] = useState(0);

  const [qId, setQId] = useState("");

  // const setCourseData = useSetRecoilState(currentCourseState);
  // const setCourseModules = useSetRecoilState(currentModuleState);
  // const setCourseInstructor = useSetRecoilState(currentInstructorState);
  // const UserCourses = useRecoilValue(userCourseDataState);
  // const AllCourseData = useRecoilValue(courseDataState);

  async function fetchCourseHandler(props) {
    const courseResponse = await fetch("/api/courses/getCurrentCourse", {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    // console.log({ courseResponse });
    setCourse(courseResponse.data);
    setModules(courseResponse.data.Lecture);
    setInstructor(courseResponse.instructor);
    return setLoading(false);
  }

  const getCourseReviews = () => {
    axios
      .get(`/api/instructor/getCourseReview?${router.query.lectureId}`)
      .then((res) => {
        let arr = [];
        setReviews(res.data.data);
        // console.log(res.data.data)
        if (res.data.data.length > 0) {
          res.data.data.map((elem) => {
            arr.push(elem.rating);
          });
          const summation = arr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
          setRating(summation);
        }
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        // setLoading(false);
      });
  };

  const getStudents = () => {
    axios
      .get(`/api/user/getUsersOnCourse?${router.query.lectureId}`)
      .then((res) => {
        setStudents(res.data.data);
        setLoading(false)
      });
  };

  // useEffect(() => {
  //   UserCourses &&
  //     Object.values(UserCourses).map((userCourse) =>
  //       userCourse.courseId === queryId
  //         ? fetchCourseHandler(queryId)
  //         : router.push("/mycourses")
  //     );
  // }, [UserCourses]);

  // useEffect(() => {
  //   if (user.isLoggedIn === false && !session) {
  //     router.push("/login");
  //   }
  //   if (queryId) {
  //     fetchCourseHandler(queryId);
  //   }
  // }, [session, user, queryId]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const newQueryId = router.query.lectureId;

      setQId(newQueryId);

      if (newQueryId) {
        window.location.reload();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) {
      return router.push("/login");
    }
    setQId(router.query.courseId);
    if (router.query.lectureId) {
      fetchCourseHandler(router.query.lectureId);
      getCourseReviews();
      getStudents();
    }
  }, [router.query.lectureId, session, user]);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="d-flex p-5">
          <Spinner className="text-orange mx-auto" />
        </div>
      ) : (
        <LectureDetailsEl
          instructor={instructor}
          modules={modules}
          course={course}
          reviews={reviews}
          rating={rating}
          students={students}
        />
      )}
    </div>
  );
}

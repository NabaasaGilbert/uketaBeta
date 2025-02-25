import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
// import useUser from "../../lib/useUser";
import useUser from '../../../lib/useUser';
import {
  currentCourseState,
  currentModuleState,
  currentInstructorState,
  // userCourseDataState,
  // courseDataState,
} from '../../../atoms/atoms';
import LectureDetailsEl from '../../../components/adminpages/LectureDetailsEl';
import { Spinner } from 'react-bootstrap';

export default function LecturePage() {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = new useRouter();
  const queryId = router.query.index;
  const setCourseData = useSetRecoilState(currentCourseState);
  const setCourseModules = useSetRecoilState(currentModuleState);
  const setCourseInstructor = useSetRecoilState(currentInstructorState);

  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState({});
  const [course, setCourse] = useState({});
  const [modules, setModules] = useState([]);

  // const UserCourses = useRecoilValue(userCourseDataState);
  // const AllCourseData = useRecoilValue(courseDataState);

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
      router.push('/login');
    }
    async function fetchCourseHandler(props) {
      const courseResponse = await fetch('/api/courses/getCurrentCourse', {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((f) => f.json());
      //   console.log(courseResponse);
      setLoading(false);

      setCourse(courseResponse.data);
      setModules(courseResponse.modules);
      setInstructor(courseResponse.instructor);

      setCourseData(courseResponse.data);
      setCourseModules(courseResponse.modules);
      setCourseInstructor(courseResponse.instructor);
    }

    if (queryId) fetchCourseHandler(queryId);
  }, [session, user, queryId]);

  return (
    <>
      <Head>
        <title>Lectures | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Lectures | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Start teaching with us - Become an instructor and create change one module at a time on UKETA a Uganda based online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta
          property="og:url"
          content="https://uketalearning.com/admin/lectures"
        />
        <meta name="robots" content="all" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div className="mt-5">
        {loading ? (
          <div className="d-flex my-5 py-5">
            <Spinner className="mx-auto text-orange" />
          </div>
        ) : (
          <LectureDetailsEl
            instructor={instructor}
            modules={modules}
            course={course}
          />
        )}
      </div>
    </>
  );
}

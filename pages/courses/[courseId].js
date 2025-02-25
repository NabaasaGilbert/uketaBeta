import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CourseDetailsEl from "../../components/coursepage/CourseDetailsEl";
// import courses from "../../components/data/courseData.json";
// import modules from "../../components/data/moduleData.json";
import { useSetRecoilState } from "recoil";
import {
  currentCourseState,
  currentModuleState,
  currentInstructorState,
} from "../../atoms/atoms";

export default function CourseDetails() {
  const router = new useRouter();
  const queryId = router.query.courseId;
  // const CourseData = courses.courses;
  // const ModuleData = modules.moduledata;
  const setCourseData = useSetRecoilState(currentCourseState);
  const setCourseModules = useSetRecoilState(currentModuleState);
  const setCourseInstructor = useSetRecoilState(currentInstructorState);

  async function fetchCourseHandler(props) {
    const courseResponse = await fetch("/api/courses/getCurrentCourse", {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setCourseData(courseResponse.data);
    setCourseModules(courseResponse.modules);
    setCourseInstructor(courseResponse.instructor);
  }

  useEffect(() => {
    fetchCourseHandler(queryId);
  }, [queryId]);

  return (
    <div className="mt-5">
      <CourseDetailsEl />
    </div>
  );
}

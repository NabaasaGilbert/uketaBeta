import CoursesEl from "../components/coursepage/CoursesEl";
import CourseSliderEl from "../components/homepage/CourseSliderEl";
import Head from "next/head";

export default function courses() {
  return (
    <>
      <Head>
        <title>Courses | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Courses | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Select from courses taught by real-world experts, learn in-demand skills with professional video courses at your own pace, with lifetime access on mobile and desktop on Uketa an online learning and teaching platform from Uganda with courses ranging in multiple topics and skill levels from expert coaches"
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/courses" />
        <meta name="robots" content="all" />
      </Head>
      <div className="mt-5">.</div>
      <p className="sectionHeader text-center">Top Courses</p>
      {/* <p className="text-center">Our top rated courses.</p> */}
      {/* <div className="mt-5"> */}
      <CourseSliderEl />
      <p className="sectionHeader text-center mt-5">All Courses</p>
      <CoursesEl />
      {/* </div> */}
    </>
  );
}

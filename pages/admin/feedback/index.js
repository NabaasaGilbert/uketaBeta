import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import CommentsListEl from "../../../components/adminpage/CommentsListEl";
import classes from "./feedback.module.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import axios from "axios";
import RecommendCourseChart from "./RecommendCourseChart";
import CoachRatingChart from "./CoachRatingCharts";
import CourseAffordabilityChart from "./CourseAffordabilityChart";
import CourseApplicabilityChart from "./CourseApplicability";
import WorksheetsHelpfulChart from "./WorkSheetsHelpfulChart";
import CourseMaterialEngagementChart from "./CourseMaterialEngagementChart";
import PlatformAccessibilityChart from "./PlatformAccessibilityChart";
import SatisfactionRatingChart from "./SatisfactionRatingChart";
import CourseIdDistributionChart from "./CourseIdDistributionChart";
import { Spinner } from "react-bootstrap";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [feedbackData, setFeedbackData] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(false);

  // const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email !== "admin@uketa.online") router.push("/");

    axios
      .post("/api/admin/getAllFeedback")
      .then((res) => {
        setFeedback(res.data);
        return setFeedbackData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("/api/admin/fetchAllCourses")
      .then((res) => {
        setLoading(false);
        return setCourses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [session, user]);

  const handleSelectCourse = (e) => {
    setSelectedCourse(e.target.value);

    const filteredCourses = feedbackData.filter(
      (course) => course.courseId === e.target.value
    );
    setFilters(true);
    return setFeedback(filteredCourses);
  };

  const handleOpenFeedbackDetails = async (feedbackId) => {
    try {
      if (feedbackId) {
        return router.push(`/admin/feedback/details?feedbackId=${feedbackId}`);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
          <p className="sectionSubheader">View Feedback ({feedback.length})</p>
          {/* <CommentsListEl /> */}
          <div className="d-flex">
            <label htmlFor="courseSelect" className="py-2">
              Select a Course:
            </label>
            <div className="px-2">
              {/* <input type="text" className="form-control" /> */}
              <select
                className="form-control"
                value={selectedCourse}
                onChange={(e) => handleSelectCourse(e)}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="d-flex py-5">
              <Spinner className="mx-auto text-warning my-5" />
            </div>
          ) : (
            <>
              {feedback.length < 1 ? (
                <div className="text-center p-2">
                  {" "}
                  <h4>No Feedback Found</h4>
                </div>
              ) : (
                <>
                  <div>
                    {filters && (
                      <div>
                        <div className="px-2 mt-3">
                          <h6>
                            View individual feedback by clicking on the name
                          </h6>
                        </div>
                        <div className="d-flex px-2">
                          {feedback.map((elem) => {
                            return (
                              <button
                                className="btn btn-secondary mx-2"
                                key={elem.id}
                                onClick={() =>
                                  handleOpenFeedbackDetails(elem.id)
                                }
                              >
                                {elem.User.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2 d-flex flex-wrap">
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>What course did you take?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <CourseIdDistributionChart feedbackData={feedback} />
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>How satisfied are you with the course?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <SatisfactionRatingChart feedbackData={feedback} />
                        <div className="d-flex justify-content-between w-100">
                          <p>Not Satisfied</p>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            3
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />{" "}
                            4
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            5
                          </label>
                          <p>Very Satisfied</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>
                          How easy or difficult was it to access the platform?
                        </h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <PlatformAccessibilityChart feedbackData={feedback} />
                        <div className="d-flex justify-content-between w-100">
                          <p>Difficult</p>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            3
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />{" "}
                            4
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            5
                          </label>
                          <p>Easy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>
                          How engaging and informative were course materials?
                        </h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <CourseMaterialEngagementChart
                          feedbackData={feedback}
                        />
                        <div className="d-flex justify-content-between w-100">
                          <p>Not Enganging</p>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            3
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />{" "}
                            4
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            5
                          </label>
                          <p>Very Enganging</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>How would you rate the Coach ?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <CoachRatingChart feedbackData={feedback} />
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>Did you find the worksheets helpful?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <WorksheetsHelpfulChart feedbackData={feedback} />
                        <div className="d-flex justify-content-between w-100">
                          <p>Not Helpful</p>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            3
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />{" "}
                            4
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            5
                          </label>
                          <p>Very Helpful</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>How applicable was the course to you?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <CourseApplicabilityChart feedbackData={feedback} />
                        <div className="d-flex justify-content-between w-100">
                          <p>Not Applicable</p>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            3
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />{" "}
                            4
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            5
                          </label>
                          <p>Very Applicable</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>How affordable was the course?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <CourseAffordabilityChart feedbackData={feedback} />
                        <div className="d-flex justify-content-between w-100">
                          <p>Very affordable</p>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            3
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />{" "}
                            4
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="satisfaction"
                              disabled
                              className="px-2"
                            />
                            5
                          </label>
                          <p>Expensive</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-2">
                      <div className="card shadow p-3">
                        <h6>Would you recommend this course to a friend?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        <RecommendCourseChart feedbackData={feedback} />
                      </div>
                    </div>
                    <div className="col-12 p-2">
                      <div className="card shadow p-3">
                        <h6>Any other comments?</h6>
                        <div className="bg-light p-2">
                          <b>
                            <i>{feedback.length} responses</i>
                          </b>
                        </div>
                        {feedback.map((elem) => {
                          return (
                            <div className="p-2 bg-light my-2" key={elem.id}>
                              {elem.feedbackComment}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./CoursesPage.module.css";
import CourseBannerEl from "./CourseBannerEl";
import CourseInfoEl from "./CourseInfoEl";
// import LectureDetailsEl from "../lecturepage/LectureDetailsEl";
import { Spinner } from "react-bootstrap";
import axios from "axios";

export default function CourseDetailsEl() {
  const router = new useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const [modules, setModules] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [students, setStudents] = useState(0)

  const [qId, setQId] = useState("");

  async function fetchCourseHandler(props) {
    const courseResponse = await fetch("/api/courses/getCurrentCourse", {
      method: "POST",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());
    setCourse(courseResponse.data);
    setInstructor(courseResponse.instructor);
    setModules(courseResponse.modules);
    // setLoading(false);
  }

  const getCourseReviews = () => {
    axios
      .get(`/api/instructor/getCourseReview?${router.query.courseId}`)
      .then((res) => {
        let arr = [];        
        const response = []
        res.data.data.map(elem=>{
          if(elem.isPublished===true){
            response.push(elem)
          }
        })
        setReviews(response)
        if(response.length>0){
          response.map(elem => {
            arr.push(elem.rating)
          })
          const summation = arr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
          setRating(summation);
        }
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  const getStudents = () => {
    axios.get(`/api/user/getUsersOnCourse?${router.query.courseId}`).then((res) => {
      setStudents(res.data.data);
    });
  }

  useEffect(() => {
    const handleRouteChange = (url) => {
      const newQueryId = router.query.courseId;
      
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
    setQId(router.query.courseId);
    if (router.query.courseId) {
      fetchCourseHandler(router.query.courseId);
      getCourseReviews();
      getStudents()
    }       
    
  }, [router.query.courseId]);

  // useEffect(() => {
  //   const getCourseReviews = () => {
  //     axios
  //       .get(`/api/instructor/getCourseReview?${router.query.courseId}`)
  //       .then((res) => {
  //         let arr = [];
  //         setReviews(res.data.data)
  //         // res.data.data.map((elem) => {
  //         //   arr.push(elem.rating);
  //         // });
          
  //         // // setRatingCount(res.data.data.length);
  //         // const summation = arr.reduce((accumulator, currentValue) => {
  //         //   return accumulator + currentValue;
  //         // }, 0);
  //         // // setRating(summation);
  //         setTimeout(() => {
  //           setLoading(false);
  //         }, 3000);
  //         // setLoading(false);
  //       });
  //   };
  //   getCourseReviews();
  // },[router.query.courseId])

  // async function AirtelMoneyHandler() {
  //   const inputBody = {
  //     reference: "Testing transaction",
  //     subscriber: {
  //       country: "UG",
  //       currency: "UGX",
  //       msisdn: 9999999999,
  //     },
  //     transaction: {
  //       amount: 500,
  //       country: "UG",
  //       currency: "UGX",
  //       id: "6546513546876845315",
  //     },
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Accept: "*/*",
  //     "X-Country": "UG",
  //     "X-Currency": "UGX",
  //     Authorization: "Bearer  UCLcp1oeq44KPXr8X*******xCzki2w",
  //   };

  //   fetch("https://openapiuat.airtel.africa/merchant/v1/payments/", {
  //     method: "POST",
  //     body: inputBody,
  //     headers: headers,
  //     mode: "no-cors",
  //   })
  //     .then((f) => f.json())
  //     .then((body) => );
  // }

  // useEffect(() => {
  // }, [cart]);

  // useEffect(() => {
  //   numberWithCommas(CourseInfo?.price);
  // }, [CourseInfo]);

  return (
    <>
      <div className={classes.CourseDetails}>
        {loading ? (
          <div className="d-flex">
            <Spinner className="text-orange mx-auto" />
          </div>
        ) : (
          <CourseBannerEl modules={modules} />
        )}
      </div>
      {loading ? (
        <div className="d-flex">
          <Spinner className="text-orange mx-auto" />
        </div>
      ) : (
        <CourseInfoEl
          course={course}
          instructor={instructor}
          modules={modules}
          reviews={reviews}
          rating={rating}
          students={students}
        />
      )}
    </>
  );
}

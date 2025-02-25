import classes from "./CoursesPage.module.css";
import CourseBannerEl from "./CourseBannerEl";
import CourseInfoEl from "./CourseInfoEl";
// import LectureDetailsEl from "../lecturepage/LectureDetailsEl";

export default function CourseDetailsEl() {
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
  //     .then((body) => console.log(body));
  // }

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  // useEffect(() => {
  //   numberWithCommas(CourseInfo?.price);
  // }, [CourseInfo]);

  return (
    <>
      <div className={classes.CourseDetails}>
        <CourseBannerEl />
      </div>
      <CourseInfoEl />
    </>
  );
}

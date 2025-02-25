import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../lib/useUser";
import Head from "next/head";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import { Spinner, Modal, Button } from "react-bootstrap";
import PhoneInput, {
  formatPhoneNumberIntl,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function Certificates() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesWithFeedback, setCoursesWithFeedback] = useState([]);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => setShowInfoModal(true);
  const handleCloseInfoModal = () => setShowInfoModal(false);

  const getUser = async (id) => {
    try {
      const payload = { userId: id };
      axios.post("/api/user/getUser", payload).then((res) => {
        setFullNames(res.data.message.name);
        setEmail(res.data.message.email);
        setPhone(res.data.message.phone);
        setGender(res.data.message.gender);
        setDateOfBirth(res.data.message.dateOfBirth);
        if (
          !res.data.message.phone ||
          !res.data.message.gender ||
          !res.data.message.dateOfBirth
        ) {
          handleShowInfoModal();
        } else {
          handleCloseInfoModal();
        }
      });
    } catch (error) {}
  };

  const handleSaveChanges = async (e) => {
    try {
      e.preventDefault();
      setError("");

      if (!fullNames) return setError("Please enter full names");
      setError("");

      if (!email) return setError("Please enter email");
      setError("");

      if (!dateOfBirth) return setError("Please enter date of birth");
      setError("");

      if (!phone) return setError("Please enter phone number");
      if (!isValidPhoneNumber(phone)) {
        return setError("Invalid Phone Number");
      }
      setError("");

      if (!gender) return setError("Please enter gender");
      setError("");

      const payload = {
        name: fullNames,
        email,
        dateOfBirth,
        phone,
        gender,
        userId: user.user.id,
      };

      setIsSaving(true);
      axios.post("/api/user/editUserDetails", payload).then((res) => {
        setIsSaving(false);
        if (res.data.status === 200) {
          setSuccessMsg("User details updated successfully");
          setTimeout(() => {
            return router.reload();
          }, 500);
        } else {
          setIsSaving(false);
          return setError("Error updating user details");
        }
      });
    } catch (error) {
      setIsSaving(false);
      return setError("Error updating user details");
    }
  };

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");

    if (user && user.user && user.user.id) {
      const id = user.user.id;
      getUser(id);

      const payload = { userEmail: user.user.email };

      axios
        .post(`/api/user/getCompletedCourses`, payload)
        .then((res) => {
          setCourses(res.data.data);
          return;
        })
        .catch((err) => {
          setLoading(false);
        });
      const data = { stundentId: user.user.id };
      let arrCourses = [];
      axios
        .post(`/api/user/getFeedbackByUser`, data)
        .then((res) => {
          res.data.map((elem) => {
            return arrCourses.push(elem.courseId);
          });
          setCoursesWithFeedback([...new Set(arrCourses)]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
    // axios.post
  }, [session, user]);

  function formatDate(dateString) {
    if (!dateString) return ""; // Return empty string if date is not provided
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if necessary
    let day = date.getDate().toString().padStart(2, "0"); // Add leading zero if necessary
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <Head>
        <title>
          My Certificates | Uketa Learning - Unlock, Understand, Uplift
        </title>
        <meta
          name="settings"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="My Certificates | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/settings" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="mt-5">.</div>
      <div className="p-5 my-5">
        <h4>My Certificates</h4>
        <div>
          <h4>
            Attention Users: Fill Out Feedback Form to Access Certificates
          </h4>
          <div>
            <marquee>
              Hello, Your certificate may be pending due to an incomplete
              feedback form. Kindly fill it out to receive your certificate
              promptly. Thank you
            </marquee>
          </div>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Modules</th>
              <th>Date Started</th>
              <th>Date Completed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="text-center">
                <td colSpan={6}>
                  <Spinner className="text-orange" />
                </td>
              </tr>
            )}
            {!loading && courses.length < 1 ? (
              <tr className="text-center">
                <td colSpan={6}>No Course Certificates found</td>
              </tr>
            ) : (
              <>
                {courses.map((course) => {
                  return (
                    <tr key={course.id}>
                      <td>{course?.Course?.name}</td>
                      <td>{course?.Course?.Instructor?.instructor}</td>
                      <td>{course?.duration} modules</td>
                      <td>{moment(course?.createdAt).format("LLLL")}</td>
                      <td>{moment(course?.updatedAt).format("LLLL")}</td>
                      <td>
                        {/* Only show the button if courseId exists in coursesWithFeedback */}
                        {coursesWithFeedback.includes(course.courseId) ? (
                          <a
                            className="btn defaultButton"
                            target="_blank"
                            href={`/certificate/${course.id}`}
                          >
                            View Certificate
                          </a>
                        ) : (
                          <a
                            className="btn btn-warning"
                            href={`/lectures/${course.courseId}`}
                          >
                            Add Feedback
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </Table>

        <Modal
          show={showInfoModal}
          onHide={handleCloseInfoModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className="bg-warning">
            <Modal.Title>
              Please update the details the will show on your Certificate
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br />
            <form onSubmit={handleSaveChanges}>
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              {successMsg && (
                <div className="alert alert-success text-center">
                  {successMsg}
                </div>
              )}
              <div className="form-group mb-3">
                <label>FullNames</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={fullNames || ""}
                    onChange={(e) => setFullNames(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={email || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Date of Birth</label>
                <div className="input-group mb-3">
                  <input
                    type="date"
                    className="form-control"
                    value={formatDate(dateOfBirth) || ""}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Phone Number</label>
                <div className="input-group mb-3">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    withCountryCallingCode={true}
                    onChange={(e) => setPhone(e)}
                    international
                    defaultCountry="UG"
                    className="form-control w-100"
                    smartCaret={true}
                    countryCallingCodeEditable={true}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Gender</label>
                <div className="input-group mb-3">
                  <select
                    className="form-control"
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
              {isSaving ? (
                <div className="d-flex">
                  <Spinner className="text-waring mx-auto" />
                </div>
              ) : (
                <div className="d-flex justify-content-end">
                  <button className="btn btn-orange" type="submit">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
            <br />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

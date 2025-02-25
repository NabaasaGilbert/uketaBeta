import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import AdminCoursesEl from "../../../components/adminpages/AdminCoursesEl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import axios from "axios";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";

var Editor = dynamic(() => import("../../../components/editor"), {
  ssr: false,
});

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructors, setInstructors] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [shortDesc, setShortDesc] = useState("")
  const [longDesc, setLongDesc] = useState("")

  const courseNameInputRef = useRef();
  const courseImageInputRef = useRef();
  const shortDescInputRef = useRef();
  const longDescInputRef = useRef();
  const ratingInputRef = useRef();
  const ratingCountInputRef = useRef();
  const studentCountInputRef = useRef();
  const introductionInputRef = useRef();
  const moduleCountInputRef = useRef();
  const priceUGXInputRef = useRef();
  const priceUSDInputRef = useRef();
  const instructorInputRef = useRef();
  const creationDateInputRef = useRef();
  const courseIDInputRef = useRef();

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");

    const getCourses = async () => {
      try {
        axios.get("/api/admin/fetchAllInstructors").then((res) => {
          setLoading(false);
          return setInstructors(res.data);
        });
        axios.get(`/api/cloudinary`).then((res) => {
          setCloudinaryName(res.data.cloudinaryName);
          setCloudinaryPreset(res.data.cloudinaryPreset);
          return setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        return setError("Error getting courses");
      }
    };

    getCourses();
  }, [session, user]);

  const openWidget = () => {
    // create the widget
    setIsSaving(true);
    // setError('');
    // setSuccessMsg('');

    const widget = window.cloudinary.createUploadWidget(
      {
        // cloudName: process.env.CLOUDINARY_NAME,
        // uploadPreset: process.env.CLOUDINARY_PRESET
        cloudName: cloudinaryName,
        uploadPreset: cloudinaryPreset,
      },
      (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          // setImagePublicId(result.info.public_id);
          setIsSaving(false);
          console.log(result.info.secure_url);
          setImgURL(result.info.secure_url);
          //   setSuccessMsg('Image has been updated successfully.');
          //   setUserData(res.data.data);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const createNewCourse = async (event) => {
    event.preventDefault();
    try {
      setSuccessMsg("");
      setError("");
      // if (props.edit === true) {
      const enteredCourseID =
        courseIDInputRef.current?.value === ""
          ? ""
          : courseIDInputRef.current?.value;
      //   return enteredCourseID;
      // }

      const enteredCourseName =
        courseNameInputRef.current?.value === ""
          ? ""
          : courseNameInputRef.current?.value;
      const enteredImage =
        courseImageInputRef.current?.value === ""
          ? ""
          : courseImageInputRef.current?.value;
      const enteredShortDesc =
        shortDescInputRef.current?.value === ""
          ? ""
          : shortDescInputRef.current?.value;
      const enteredLongDesc =
        longDescInputRef.current?.value === ""
          ? ""
          : longDescInputRef.current?.value;
      const enteredRating =
        ratingInputRef.current?.value === ""
          ? "0"
          : ratingInputRef.current?.value;
      const enteredRatingCount =
        ratingCountInputRef.current?.value === ""
          ? "0"
          : ratingCountInputRef.current?.value;
      const enteredStudentCount =
        studentCountInputRef.current?.value === ""
          ? "0"
          : studentCountInputRef.current?.value;
      const enteredIntroduction =
        introductionInputRef.current?.value === ""
          ? ""
          : introductionInputRef.current?.value;
      const enteredModuleCount =
        moduleCountInputRef.current?.value === ""
          ? ""
          : moduleCountInputRef.current?.value;
      const enteredPriceUGX =
        priceUGXInputRef.current?.value === ""
          ? 0
          : parseInt(priceUGXInputRef.current?.value);
      const enteredPriceUSD =
        priceUSDInputRef.current?.value === ""
          ? 0
          : parseInt(priceUSDInputRef.current?.value);
      const enteredInstructor =
        instructorInputRef.current?.value === ""
          ? ""
          : instructorInputRef.current?.value;
      const enteredUpdateDate =
        creationDateInputRef.current?.value === ""
          ? ""
          : creationDateInputRef.current?.value;

      const addCourseData = {
        name: enteredCourseName,
        image: imgURL,
        // shortDesc: enteredShortDesc,
        shortDesc: shortDesc,
        // longDesc: enteredLongDesc,
        longDesc: longDesc,
        rating: enteredRating,
        ratingCount: enteredRatingCount,
        studentCount: enteredStudentCount,
        updateDate: enteredUpdateDate,
        introduction: enteredIntroduction,
        moduleCount: enteredModuleCount,
        priceUGX: enteredPriceUGX,
        priceUSD: enteredPriceUSD,
        tutor: enteredInstructor,
      };
      setLoading(true);

      axios
        .post(`/api/admin/addNewCourse`, addCourseData)
        .then((res) => {
          setLoading(false);
          if (res.data.status === 200) {
            setSuccessMsg("Course has been added successfully.");
            setTimeout(() => {
              router.push("/admin/courses");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleShortDescDataInput = (data) => {
    setShortDesc(data)
  };

  const handleLongDescDataInput = (data) => {
    setLongDesc(data)
  };

  return (
    <>
      <Head>
        <title>
          Create A Course | Uketa Learning - Unlock, Understand, Uplift
        </title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Create a Course | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Start teaching with us - Become an instructor and create change one module at a time on UKETA a Uganda based online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta
          property="og:url"
          content="https://uketalearning.com/admin/addCourse"
        />
        <meta name="robots" content="all" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div>
        <div className="py-5 mt-5 container">
          <h1 className="text-3xl font-bold text-gray-900">Add a New Course</h1>
          {error && <div className="alert alert-danger w-100">{error}</div>}
          {successMsg && (
            <div className="alert alert-success w-100">{successMsg}</div>
          )}
          {imgURL && (
            <div className="d-flex">
              <img
                src={imgURL}
                className="mx-auto"
                alt="img"
                height={150}
                width={150}
              />
            </div>
          )}
          <Form onSubmit={createNewCourse}>
            <Form.Group controlId="">
              <Form.Control ref={courseIDInputRef} type="text" hidden />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>
                <span>* </span>Course Name:
              </Form.Label>
              <Form.Control
                ref={courseNameInputRef}
                type="text"
                autoFocus
                required
              />
            </Form.Group>

            {isSaving ? (
              <div className="d-flex">
                <Spinner className="text-orange mx-auto p-2" />
              </div>
            ) : (
              <div className="w-100 d-flex p-2">
                <div
                  type="file"
                  required
                  className="defaultButton btn btn-primary"
                  name="image"
                  accept=" image/gif, image/jpeg,image/jpg, image/png"
                  onClick={openWidget}
                >
                  Add Course Profile Image
                </div>
              </div>
            )}            

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Short Description:</Form.Label>
              {/* <Form.Control as="textarea" ref={shortDescInputRef} rows={7} /> */}
              <Editor sendDataInput={handleShortDescDataInput} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Long Description:</Form.Label>
              {/* <Form.Control as="textarea" ref={longDescInputRef} rows={12} /> */}
              <Editor sendDataInput={handleLongDescDataInput} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Introduction:</Form.Label>
              <Form.Control as="textarea" ref={introductionInputRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Creation Date:</Form.Label>
              <Form.Control type="date" ref={creationDateInputRef} />
            </Form.Group>

            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Rating:</Form.Label>
                  {/* <Form.Control ref={ratingInputRef} type="number" /> */}
                  <Form.Select
                    ref={ratingInputRef}
                    aria-label="Default select rating"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Rating Count:</Form.Label>
                  <Form.Control ref={ratingCountInputRef} type="number" />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Student Count:</Form.Label>
                  <Form.Control ref={studentCountInputRef} type="number" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Module Count:</Form.Label>
                  <Form.Control ref={moduleCountInputRef} type="number" />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Price UGX:</Form.Label>
                  <Form.Control ref={priceUGXInputRef} type="number" />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Price USD:</Form.Label>
                  <Form.Control ref={priceUSDInputRef} type="number" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Instructor:</Form.Label>
              <Form.Select
                ref={instructorInputRef}
                aria-label="Default select example"
                required
              >
                <option>Select Instructor for this Course</option>
                {instructors &&
                  Object.values(instructors).map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.instructor}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            {error && <div className="alert alert-danger w-100">{error}</div>}
            {successMsg && (
              <div className="alert alert-success w-100">{successMsg}</div>
            )}

            {loading ? (
              <Spinner className="text-orange" />
            ) : (
              <Button className="defaultButton" type="submit">
                SUBMIT
              </Button>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

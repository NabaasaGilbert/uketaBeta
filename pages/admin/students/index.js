import { useEffect, useState } from "react";
import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import StudentListComponent from "../../../components/adminpage/StudentListComponent";
import AddCourseToStudentForm from "../../../components/adminpage/AddCourseToStudentForm";
import AddCompanyToStudentForm from "../../../components/adminpage/AddCompanyToStudentForm";
import useSWR from "swr";
import axios from "axios";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const [addCourseToStudentFormResponse, setAddCourseToStudentFormResponse] =
    useState({});
  const [addCompanyToStudentFormResponse, setAddCompanyToStudentFormResponse] =
    useState({});
  const { data: session } = useSession();
  const { user } = useUser();
  const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);
  const [students, setStudents] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [
    removeCourseFromStudentFormResponse,
    setRemoveCourseFromStudentFormResponse,
  ] = useState({});
  const [
    removeCompanyFromStudentFormResponse,
    setRemoveCompanyFromStudentFormResponse,
  ] = useState({});

  const getStudents = async () => {
    try {
      axios.get("/api/admin/adminDataCollectApi").then((res) => {
        setStudents(res.data.userData);
        setStudentList(res.data.userData);
        return setLoading(false);
      });
    } catch (error) {
      return;
    }
  };

  async function addCourseToUserHandler(passedData) {
    setLoading(true);
    try {
      const apiResponse = await fetch("/api/admin/addCourseToUser", {
        method: "POST",
        body: JSON.stringify(passedData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((f) => f.json());
      if (apiResponse.status === 501) {
        setAddCourseToStudentFormResponse(apiResponse);
      } else {
        setAddCourseToStudentFormResponse(apiResponse);
        router.reload();
      }
    } catch (error) {
      return;
    } finally {
      // setLoading(false);
      getStudents();
    }
  }

  async function addCompanyToUserHandler(passedData) {
    setLoading(true);
    try {
      const apiResponse = await fetch("/api/admin/addCompanyToUser", {
        method: "POST",
        body: JSON.stringify(passedData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((f) => f.json());
      if (apiResponse.status === 501) {
        setAddCompanyToStudentFormResponse(apiResponse);
      } else {
        setAddCompanyToStudentFormResponse(apiResponse);
        // router.reload();
        return
      }
    } catch (error) {
      return;
    } finally {
      // setLoading(false);
      getStudents();
    }
  }

  async function removeCompanyFromUserHandler(passedData) {
    setLoading(true);
    try {
      const apiResponse = await fetch("/api/admin/removeCompanyFromUser", {
        method: "POST",
        body: JSON.stringify(passedData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((f) => f.json());
      if (apiResponse.status === 501) {
        setRemoveCompanyFromStudentFormResponse(apiResponse);
      } else {
        setRemoveCompanyFromStudentFormResponse(apiResponse);
        // router.reload();
        return
      }
    } catch (error) {
      return;
    } finally {
      // setLoading(false);
      getStudents();
    }
  }

  async function removeCourseFromUserHandler(passedData) {
    setLoading(true);
    try {
      const apiResponse = await fetch("/api/admin/removeCourseFromUser", {
        method: "POST",
        body: JSON.stringify(passedData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((f) => f.json());
      //   if (apiResponse.status === 200)
      setRemoveCourseFromStudentFormResponse(apiResponse);
    } catch (error) {
      return;
    } finally {
      // setLoading(false);
      getStudents();
    }
  }

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");

    //

    getStudents();
  }, [session, user]);

  function filterArray(inputArray, searchTerm) {
    const filteredArray = [];

    for (const item of inputArray) {
      const itemName = item.name.toLowerCase();
      const itemEmail = item.email.toLowerCase();
      const filterValue = searchTerm.toLowerCase();

      if (itemName.includes(filterValue) || itemEmail.includes(filterValue)) {
        filteredArray.push(item);
      }
    }

    return setStudents(filteredArray);
  }

  const handleSearch = async (searchTerm) => {
    try {
      filterArray(studentList, searchTerm);
    } catch (error) {}
  };

  const handleDataDownload = async () => {
    try {
      setIsDownloading(true);

      // Make an Axios request to your API endpoint
      const response = await axios.get("/api/admin/fetchAllStudentsCSV", {
        responseType: "blob", // Specify responseType as blob to handle binary data
      });

      // Create a blob from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;

      setIsDownloading(false);

      // Set the filename for the downloaded file
      link.setAttribute("download", "uketaStudentsData.csv");

      // Append the link to the document body and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body after the download
      document.body.removeChild(link);
    } catch (error) {
      setIsDownloading(false);
      alert("Error occurred trying to Download payments Data");
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        {/* {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null} */}

        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <div className="">
            <Row className="mb-5">
              <Col sm={6} className="p-2">
                <div className="bg-light p-2 shadow-sm">
                  <div>
                    <h2 className="text-center">Manage Course Enrollment</h2>
                  </div>
                  <div className="d-flex ">
                    <div className="col-6 p-2">
                      <p className="sectionSubheader">
                        Enroll A Student to A Course
                      </p>
                      <AddCourseToStudentForm
                        onSubmit={addCourseToUserHandler}
                        response={addCourseToStudentFormResponse}
                        loading={loading}
                      />
                    </div>
                    <div className="col-6 p-2">
                      <p className="sectionSubheader">
                        Unenroll A Student from A Course
                      </p>
                      <AddCourseToStudentForm
                        onSubmit={removeCourseFromUserHandler}
                        response={removeCourseFromStudentFormResponse}
                        loading={loading}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6} className="p-2">
                <div className="bg-light p-2 shadow-sm">
                  <div>
                    <h2 className="text-center">Manage Company Enrollment</h2>
                  </div>
                  <div className="d-flex ">
                    <div className="col-6 p-2">
                      <p className="sectionSubheader">
                        Enroll A Student to A Company
                      </p>
                      <AddCompanyToStudentForm
                        onSubmit={addCompanyToUserHandler}
                        response={addCompanyToStudentFormResponse}
                        loading={loading}
                      />
                    </div>
                    <div className="col-6 p-2">
                      <p className="sectionSubheader">
                        Unenroll A Student to A Company
                      </p>
                      <AddCompanyToStudentForm
                        onSubmit={removeCompanyFromUserHandler}
                        response={removeCompanyFromStudentFormResponse}
                        loading={loading}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col sm={12}>
                <p className="sectionSubheader">
                  All Students ({students.length})
                </p>
                <div className="d-flex pt-3 pb-4">
                  <div className="d-flex flex-grow-1">
                    <span className="pt-2">Search by Name or Email:</span>
                    <span className="px-4 col-4">
                      {!loading && (
                        <input
                          className="form-control"
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                      )}
                    </span>
                  </div>
                  <div className="">
                    {isDownloading ? (
                      <Spinner />
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={handleDataDownload}
                      >
                        Download Data
                      </button>
                    )}
                  </div>
                </div>
                <StudentListComponent
                  studentData={students}
                  loading={loading}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

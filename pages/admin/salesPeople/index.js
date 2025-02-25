import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { useEffect, useState } from "react";
import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Link from "next/link";

import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function index() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [salesPeople, setSalesPeople] = useState([]);
  const [activities, setActivities] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [copied, setCopied] = useState(null);
  const [salesPersonData, setSalesPersonData] = useState({});

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000); // Clear the copied state after 2 seconds
    });
  };

  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();

  const URL = global?.window?.location?.host;
  const PROTOCOL = global?.window?.location?.protocol;

  const getSalesPeople = async () => {
    try {
      axios.get("/api/admin/fetchSalesPeople").then((res) => {
        setIsLoading(false);
        res.data.data;
        setSalesPeople(res.data.data);
        return;
      });
    } catch (error) {}
  };

  const getSalesPeopleActivity = async () => {
    try {
      axios.get("/api/admin/fetchAllSalesTrackingActivity").then((res) => {
        setIsLoading(false);
        setActivities(res.data.data);
        const salesData = countDataByMonthPerSalesPerson(res.data.data);
        setSalesPersonData(salesData);
        return;
      });
    } catch (error) {}
  };

  const countDataByMonthPerSalesPerson = (data) => {
    const salesPersonData = {};
    const currentYear = new Date().getFullYear();

    data.forEach((elem) => {
      const createdAt = new Date(elem.createdAt);
      const year = createdAt.getFullYear();
      const month = createdAt.getMonth(); // Get the month index (0-11)
      const salesPersonId = elem.salesPerson.id;
      const salesPersonName = elem.salesPerson.name;

      // Only count activities from the current year
      if (year === currentYear) {
        if (!salesPersonData[salesPersonId]) {
          salesPersonData[salesPersonId] = {
            name: salesPersonName,
            monthlyCounts: Array(12).fill(0), // Initialize array to store counts for each month
          };
        }

        // Increment count for the corresponding month
        salesPersonData[salesPersonId].monthlyCounts[month]++;
      }
    });

    return salesPersonData;
  };

  const datasets = Object.keys(salesPersonData).map((salesPersonId) => ({
    id: salesPersonId,
    label: salesPersonData[salesPersonId].name,
    data: salesPersonData[salesPersonId].monthlyCounts,
  }));

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    getSalesPeople();
    getSalesPeopleActivity();
  }, [session, user]);

  const handleCreateSalesPerson = async (e) => {
    try {
      e.preventDefault();
      if (!name) {
        return setError("Please add Full Names");
      }
      setError("");

      if (!email) {
        return setError("Please Email");
      }
      setError("");

      if (!phone) {
        return setError("Please add Phone Number");
      }
      setError("");

      const payload = { name, phone, email };

      setIsSubmitting(true);
      axios
        .post("/api/admin/createNewSalesPerson", payload)
        .then((res) => {
          setIsSubmitting(false);
          res.data.data;
          setSalesPeople(res.data.data);
          setIsSubmitting(false);
          setSuccessMessage("New Sales Person added succesfully");
          axios.get("/api/admin/fetchSalesPeople").then((res) => {
            setSalesPeople(res.data.data);
            return setShow(false);
          });
          return;
        })
        .catch((err) => {
          setError("Error creating Sales Person");
          return setIsSubmitting(false);
        });

      return;
    } catch (error) {
      setError("Error creating Sales Person");
      return setIsSubmitting(false);
    }
  };

  const countDataByMonth = (data) => {
    const monthlyCounts = Array(12).fill(0); // Initialize array to store counts for each month

    data.forEach((elem) => {
      const createdAt = new Date(elem.createdAt);
      const month = createdAt.getMonth(); // Get the month index (0-11)

      // Increment count for the corresponding month
      monthlyCounts[month]++;
    });

    return monthlyCounts;
  };

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <Col sm={12}>
            <div className="d-flex p-2">
              <p className="sectionSubheader">Sales People</p>
              <button
                className="btn btn-orange mx-4 py-1"
                onClick={() => setShow(true)}
              >
                Create New Sales Person
              </button>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Names</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Tracking Code</th>
                  <th>Tracking URL</th>
                  <th>Date Created</th>
                  <th>Date Updated</th>
                </tr>
              </thead>
              <tbody>
                {salesPeople?.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.trackingCode}</td>
                      <td>
                        <Link
                          target="_blank"
                          href={`${PROTOCOL}//${URL}?ref=${item?.trackingCode}&&email=${item?.email}`}
                        >{`${PROTOCOL}//${URL}?ref=${item?.trackingCode}&&email=${item?.email}`}</Link>
                        <button
                          onClick={() =>
                            handleCopy(
                              `${PROTOCOL}//${URL}?ref=${item?.trackingCode}&&email=${item?.email}`,
                              index
                            )
                          }
                          style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            background: copied === index ? "green" : "grey",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        >
                          {copied === index ? "Copied!" : "Copy"}
                        </button>
                      </td>
                      <td>{moment(item.createdAt).format("LLLL")}</td>
                      <td>{moment(item.updatedAt).format("LLLL")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col sm={12}>
            <div className="my-5 py-5">
              <h3>View and Track Sales Referals per user per month</h3>
              {isLoading ? (
                <Spinner className="text-warning" />
              ) : (
                <div className="m-2" style={{ height: "600px" }}>
                  <Bar
                    datasetIdKey="id"
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      datasets: datasets,
                    }}
                    options={{
                      maintainAspectRatio: false, // Set to false to allow manual adjustment of aspectRatio
                      aspectRatio: 100, // Set the desired aspect ratio (width:height)
                    }}
                  />
                </div>
              )}
            </div>
          </Col>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-warning text-center">
          <Modal.Title>Create New Sales Person</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 m-0">
          <div className="modal-dialog p-2 m-0">
            <div className="modal-content p-0 m-0 border-0">
              <div className="modal-body p-2">
                <form onSubmit={handleCreateSalesPerson}>
                  <div className="form-group my-3">
                    <div className="form-label">Full Names</div>
                    <input
                      type="text"
                      required
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div className="form-group my-3">
                    <div className="form-label">Email</div>
                    <input
                      type="email"
                      required
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div className="form-group my-3">
                    <div className="form-label">Phone</div>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div>
                    {error && (
                      <div className="alert alert-danger text-center">
                        {error}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success text-center">
                        {successMessage}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div
                      className="btn btn-default"
                      onClick={() => setShow(false)}
                    >
                      Dismiss Modal
                    </div>
                    <>
                      {isSubmitting ? (
                        <Spinner className="text-warning" />
                      ) : (
                        <button className="btn btn-dark">
                          Create New Sales Person
                        </button>
                      )}
                    </>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

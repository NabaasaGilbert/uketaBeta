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

import "chart.js/auto";

export default function index() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);

  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");

  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isLoadingCld, setIsLoadingCld] = useState("");
  const [companies, setCompanies] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [copied, setCopied] = useState(null);

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

  const getCompanies = async () => {
    try {
      axios.get("/api/admin/getCompanies").then((res) => {
        setIsLoading(false);
        setCompanies(res.data.message);
        return;
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    axios.get(`/api/cloudinary`).then((res) => {
      setCloudinaryName(res.data.cloudinaryName);
      setCloudinaryPreset(res.data.cloudinaryPreset);
      return;
    });
    getCompanies();
  }, [session, user]);

  const openWidget = () => {
    setIsLoadingCld(true);
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryName,
        uploadPreset: cloudinaryPreset,
      },
      (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          // setImagePublicId(result.info.public_id);
          setIsLoadingCld(false);
          setLogo(result.info.secure_url);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const handleCreateCompany = async (e) => {
    try {
      e.preventDefault();
      if (!name) {
        return setError("Please add Company Name");
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

      const payload = {
        name,
        phone,
        email,
        contactPerson,
        address,
        website,
        logo,
      };

      setIsSubmitting(true);
      axios
        .post("/api/admin/createCompany", payload)
        .then((res) => {
          setIsSubmitting(false);

          setCompanies(res.data.message);
          setIsSubmitting(false);
          setSuccessMessage("New Company added succesfully");
          setTimeout(() => {
            return setShow(false);
          }, 2000);
        })
        .catch((err) => {
          setError("Error creating Company");
          return setIsSubmitting(false);
        });

      return;
    } catch (error) {
      setError("Error creating Company");
      return setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Create Blog | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Create Blog | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Start teaching with us - Become an instructor and create change one module at a time on UKETA a Uganda based online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/blogs" />
        <meta name="robots" content="all" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div>
        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <Col sm={12}>
            <div className="d-flex p-2">
              <p className="sectionSubheader">Companies({companies.length})</p>
              <button
                className="btn btn-orange mx-4 py-1"
                onClick={() => setShow(true)}
              >
                Create New Company
              </button>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Contact Person</th>
                  <th>Address</th>
                  <th>Website</th>
                  <th>Date Created</th>
                  <th>Date Updated</th>
                </tr>
              </thead>
              <tbody>
                {companies?.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img width={50} height={50} src={item.logo} />
                      </td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.contactPerson}</td>
                      <td>{item?.address}</td>
                      <td>{item?.website}</td>
                      <td>{moment(item.createdAt).format("LLLL")}</td>
                      <td>{moment(item.updatedAt).format("LLLL")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
          <Modal.Title>Create New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 m-0">
          <div className="modal-dialog p-2 m-0">
            <div className="modal-content p-0 m-0 border-0">
              <div className="modal-body p-2">
                <form onSubmit={handleCreateCompany}>
                  <div className="form-group my-3">
                    <div className="form-label">Add Company Logo</div>
                    {!isLoadingCld ? (
                      <div
                        type="file"
                        required
                        className="form-control"
                        name="image"
                        accept=" image/gif, image/jpeg,image/jpg, image/png"
                        onClick={openWidget}
                      >
                        Upload Logo Image
                      </div>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                  <div className="w-100">
                    {logo && <img className="w-100" src={logo} />}
                  </div>
                  <div className="form-group my-3">
                    <div className="form-label">Company Names</div>
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
                  <div className="form-group my-3">
                    <div className="form-label">Contact Person Details</div>
                    <input
                      type="text"
                      required
                      className="form-control"
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div className="form-group my-3">
                    <div className="form-label">Address</div>
                    <input
                      type="address"
                      required
                      className="form-control"
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div className="form-group my-3">
                    <div className="form-label">Website</div>
                    <input
                      type="website"
                      required
                      className="form-control"
                      onChange={(e) => setWebsite(e.target.value)}
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
                          Create New Company
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

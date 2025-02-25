import { Col, Row, Button, Form, Table } from "react-bootstrap";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import axios from "axios";
import moment from "moment/moment";
import { Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
var Editor = dynamic(() => import("../../../components/editor"), {
  ssr: false,
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [userData, setUserData] = useState({});
  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    if (user) {
      const id = user?.user?.id;
      if (id) {
        axios
          .get(`/api/instructor/getInstructor?${user.user.id}`)
          .then((res) => {
            setUserData(res.data.data);
            setInstructor(res.data.data.instructor);
            setShortDesc(res.data.data.shortDesc);
            setDesc(res.data.data.desc);
            setWebsite(res.data.data.website);
            setLinkedin(res.data.data.linkedin);
            setYoutube(res.data.data.youtube);
            return;
          })
          .catch((err) => {
            return setError("Error loading Instructor Details");
          });
      }
      axios.get(`/api/cloudinary`).then((res) => {
        setCloudinaryName(res.data.cloudinaryName);
        setCloudinaryPreset(res.data.cloudinaryPreset);
        return setLoading(false);
      });
    }
  }, [session, user]);

  const openWidget = () => {
    // create the widget
    setIsSaving(true);
    setError("");
    setSuccessMsg("");

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
          const payload = {
            image: result.info.secure_url,
            email: userData.email,
            id: userData.id,
          };

          axios
            .post(`/api/instructor/updateInstructorImage`, payload)
            .then((res) => {
              setIsSaving(false);
              setSuccessMsg("Image has been updated successfully.");
              setUserData(res.data.data);
              setTimeout(() => {
                setSuccessMsg("");
                router.push("/coach/profile");
              }, 2500);
            })
            .catch((err) => {
              setError("Failed to upload Image. Please try again.");
            });
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const handleUpdateDetails = async (e) => {
    try {
      e.preventDefault();
      if (!instructor) return setError("Please add Instructor Name");

      setIsSaving(true);
      setError("");
      setSuccessMsg("");

      const payload = {
        instructor,
        website,
        linkedin,
        youtube,
        desc,
        shortDesc,
        id: userData.id,
        email: userData.email,
      };

      axios
        .post(`/api/instructor/updateInstructorDetails`, payload)
        .then((res) => {
          setIsSaving(false);
          setSuccessMsg("Details has been updated successfully.");
          setUserData(res.data.data);
          setTimeout(() => {
            setSuccessMsg("");
            router.push("/coach/profile");
          }, 2500);
        })
        .catch((err) => {
          setError("Failed to update details. Please try again.");
        });
    } catch (err) {
      setIsSaving(false);
      return setError("Error updating details");
    }
  };

  const handleTextInput = (data) => {
    setDesc(data);
  };

  return (
    <>
      <Head>
        <title>Settings | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Home | Uketa Learning - Unlock, Understand, Uplift"
        />
        {/* <meta property="og:type" content="article" /> */}
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform for Uganda with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com" />
        <meta name="robots" content="all" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div>
        {loading ? (
          <div className="p-5">
            <div className="d-flex p-5">
              <Spinner className="text-orange mx-auto" />
            </div>
          </div>
        ) : (
          <div className="py-5 mt-5 container">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <div>Update your profile</div>
            <div>
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              {successMsg && (
                <div className="alert alert-success text-center">
                  {successMsg}
                </div>
              )}
            </div>
            <div className="d-lg-flex d-xl-flex d-md-flex d-block p-2">
              <span className="col-lg-3 col-xl-3 col-md-4 col-12 p-2">
                <img
                  className="img-fluid rounded-circle"
                  src={userData?.image}
                />
                {isSaving ? (
                  <div className="d-flex">
                    <Spinner className="text-orange mx-auto" />
                  </div>
                ) : (
                  <div className="w-100 d-flex p-4">
                    <div
                      type="file"
                      required
                      className="defaultButton btn btn-primary mx-auto"
                      name="image"
                      accept=" image/gif, image/jpeg,image/jpg, image/png"
                      onClick={openWidget}
                    >
                      Change Profile Photo
                    </div>
                  </div>
                )}
                <div className="d-flex">
                  <img
                    src={userData?.signature}
                    className="mx-auto w-100 p-3"
                  />
                </div>
              </span>
              <span className="col-lg-9 col-xl-9 col-md-8 col-12 p-4">
                <h2>{userData?.instructor}</h2>
                <hr />
                <form onSubmit={handleUpdateDetails}>
                  <div className="p-1">
                    <h5 className="bg-light w-100 p-1">Bio-Data</h5>
                    <div className="form-group mb-3">
                      <div className="label">Name</div>
                      <input
                        className="form-control"
                        defaultValue={instructor}
                        onChange={(e) => setInstructor(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <div className="label">Short Description</div>
                      <input
                        className="form-control"
                        defaultValue={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <div className="label">Description</div>
                      <Editor
                        props={desc}
                        sendDataInput={handleTextInput}
                        style={{ minHeight: 300 }}
                        cols={30}
                        rows={15}
                      />
                      {/* <textarea
                        className="form-control"
                        defaultValue={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        rows={20}
                        cols={20}
                      ></textarea> */}
                    </div>
                  </div>
                  <div className="p-1">
                    <h5 className="bg-light w-100 p-1">Socials</h5>
                    <div className="form-group mb-3">
                      <div className="label">Youtube</div>
                      <input
                        className="form-control"
                        defaultValue={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <div className="label">Linkedin</div>
                      <input
                        className="form-control"
                        defaultValue={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <div className="label">Website</div>
                      <input
                        className="form-control"
                        defaultValue={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <div>
                      {error && (
                        <div className="alert alert-danger text-center">
                          {error}
                        </div>
                      )}
                      {successMsg && (
                        <div className="alert alert-success text-center">
                          {successMsg}
                        </div>
                      )}
                    </div>
                    {isSaving ? (
                      <div className="d-flex w-100">
                        <Spinner className="mx-auto text-orange" />
                      </div>
                    ) : (
                      <div className="form-group mb-3">
                        <input
                          className="defaultButton btn btn-primary"
                          value="Update Details"
                          type="submit"
                        />
                      </div>
                    )}
                  </div>
                </form>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

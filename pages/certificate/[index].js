import { useEffect, useState, useRef } from "react";
// import UserCoursesEl from "../components/userpages/UserCoursesEl";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../lib/useUser";
import Head from "next/head";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import CustomBarSpinner from "../../components/CustomBarSpinner";
import Celebration from "../../components/Celebration";

export default function Certificates() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const certificateRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(global?.window?.innerWidth);
  const [imageSrc, setImageSrc] = useState("");

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downLoading, setDownLoading] = useState(false);
  const certificateID = router.query.index;
  const [successDownLoadMessage, setSuccessDownLoadMessage] = useState("");
  const [isCelebrating,setIsCelebrating]= useState(false)

  useEffect(() => {
    if (certificateID) {
      const payload = { id: router.query.index };
      axios
        .post(`/api/user/getCertificate`, payload)
        .then((res) => {
          setCourse(res.data.data);
          axios
            .post(`/api/user/downloadCertificate`, payload, {
              responseType: "blob",
            })
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              setImageSrc(url); // Set image source

              return setLoading(false);
            })
            .catch((err) => {
              alert("Error downloading Certificate");
              setDownLoading(false);
            });
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    setScreenWidth(global?.window?.innerWidth);
  }, [session, user, certificateID, screenWidth]);


  const handleDownloadCertificate = async () => {
    if (certificateID) {
      const payload = { id: router.query.index };
      setDownLoading(true);
      axios
        .post(`/api/user/downloadCertificate`, payload, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;

          const docName = `UKETA ${course.Course.name} Certificate - ${course.User.name}.png`;
          link.setAttribute("download", docName);
          document.body.appendChild(link);
          link.click();          
          setSuccessDownLoadMessage(
            "Your Certificate has been successfully downloaded. Please check your downloads folder for your Certificate"
          );
          setIsCelebrating(true)
          setTimeout(() => {
            setIsCelebrating(false)
          }, 10000);
          setTimeout(() => {
            setSuccessDownLoadMessage("");
          }, 15000);
          return setDownLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          alert("Error downloading Certificate");
          setDownLoading(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Certificate | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="certificate"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Certificate | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/settings" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {isCelebrating && <Celebration />}
      <div className="mt-5">.</div>
      <div className="p-5 my-5">
        <h4 className="text-center">Certificate of Completion</h4>
        <div>
          {successDownLoadMessage && (
            <div className="alert alert-success text-center">
              <h3>{successDownLoadMessage}</h3>
            </div>
          )}
        </div>
        <div>
          {loading && (
            <div className="d-flex_">
              {/* <Spinner className="text-orange mx-auto" /> */}
              <CustomBarSpinner className="text-orange mx-auto" />
            </div>
          )}
          {!loading && (
            <div>
              <div className="d-flex justify-content-end py-3">
                {downLoading ? (
                  <>
                    <span className="py-2">Downloading</span>{" "}
                    <CustomBarSpinner />
                  </>
                ) : (
                  <button
                    className="btn defaultButton"
                    onClick={handleDownloadCertificate}
                  >
                    Download Certificate
                  </button>
                )}
              </div>
              <div>
                <div className="w-100 d-flex" ref={certificateRef}>
                  <div className="mx-auto position-relative">
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt="Certificate"
                        className="img-fluid shadow"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="w-100 d-flex" ref={certificateRef}>
                <div className="mx-auto position-relative">
                  <div className="position-absolute w-100">
                    <div className="d-flex justify-content-end text-orange certificate-text-id">
                      <p>{course.id}</p>
                    </div>

                    <div className="certificate-name w-100 text-center">
                      <p className="text-center">{course.User.name}</p>
                    </div>
                    <div className="certificate-text w-100 text-center">
                      <div>For Completing the the Uketa Learning</div>
                      <div> {course.Course.name} </div>
                      <div>on {moment(course.updatedAt).format("LL")}</div>
                    </div>
                    <div className="d-flex py-5 justify-content-between">
                      <div className="coach-signature-details">
                        <img
                          src={course?.Course?.Instructor?.signature}
                          width={150}
                          className="coach-img-signature"
                        />
                        <div className="py-4 text-center">
                          <h4 className="fw-bold">
                            {course?.Course?.Instructor?.instructor}
                          </h4>
                          <h5>Uketa Coach</h5>
                        </div>
                      </div>

                      <div className="prof-signature-details">
                        <img
                          src="https://res.cloudinary.com/daecbszah/image/upload/v1695625955/uketa/Prof._Samson_James_Opolot_basrnt.png"
                          width={150}
                          className="coach-img-signature"
                        />
                      </div>
                    </div>
                  </div>
                  <img
                    src="/defaults/certificate.jpg"
                    className="certificate"
                    id="certificate"
                  />
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

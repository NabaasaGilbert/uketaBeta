import { Col, Row, Button, Form, Table } from "react-bootstrap";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import axios from "axios";
import moment from "moment/moment";
// import { BiLogoYoutube } from "react-icons/bi";
import parser from "html-react-parser";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const { data } = useSWR("/api/admin/adminDataCollectApi", fetcher);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/coach/login");
    if (user) {
      const id = user?.user?.id;
      if (id) {
        axios
          .get(`/api/instructor/getInstructor?${user.user.id}`)
          .then((res) => {
            setUserData(res.data.data);
          })
          .catch((err) => {
            return;
          });
      }
    }
  }, [session, user]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <div className="py-5 mt-5 container">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <div className="d-lg-flex d-xl-flex d-md-flex d-block p-2">
            <span className="col-lg-3 col-xl-3 col-md-4 col-12 p-2">
              <img className="img-fluid rounded-circle" src={userData?.image} />
              <div className="d-flex">
                <img src={userData?.signature} className="mx-auto w-100 p-3" />
              </div>
            </span>
            <span className="col-lg-9 col-xl-9 col-md-8 col-12 p-2">
              <h2>{userData?.instructor}</h2>
              <hr />
              <div className="p-1">
                <h5 className="bg-light w-100 p-1">Uketa Data</h5>
                <p>
                  <strong>Reviews:</strong> {userData?.reviews}
                </p>
                <p>
                  <strong>Rating: </strong>
                  {userData?.rating}
                </p>
                <p>
                  <strong>Students: </strong>
                  {userData?.students}
                </p>
                <p>
                  <strong>Courses: </strong>
                  {userData?.courses}
                </p>
              </div>
              <div className="p-1">
                <h5 className="bg-light w-100 p-1">Bio-Data</h5>
                <p>
                  <strong>Intro:</strong> {userData?.shortDesc}
                </p>
                <p>
                  <strong>Bio-data: </strong>
                  {userData.desc && parser(userData?.desc)}
                </p>
              </div>
              <div className="p-1">
                <h5 className="bg-light w-100 p-1">Socials</h5>
                <a href={userData?.youtube} target="_blank">
                  {" "}
                  <p>
                    {/* <BiLogoYoutube /> */}
                    {userData?.youtube}
                  </p>
                </a>
                <a href={userData?.linkedin} target="_blank">
                  {" "}
                  <p>{userData?.linkedin}</p>
                </a>
                <a href={`mailto:${userData?.email}`} target="_blank">
                  {" "}
                  <p>{userData?.email}</p>
                </a>
                <a href={userData?.website} target="_blank">
                  {" "}
                  <p>{userData?.website}</p>
                </a>
              </div>
              <div className="p-1">
                <h5 className="bg-light w-100 p-1">Tracking Data</h5>
                <p>
                  <strong>Account Creation Date: </strong>
                  {moment(userData?.createdAt).format("LLLL")}
                </p>
                <p>
                  <strong>Last Updated On: </strong>
                  {moment(userData?.updatedAt).format("LLLL")}
                </p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

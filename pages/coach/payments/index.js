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

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    if (user) {
      const id = user?.user?.id;
      if (id) {
        axios
          .get(`/api/instructor/getInstructor?${user.user.id}`)
          .then((res) => {
            setLoading(false);
            setUserData(res.data.data);
            return;
          })
          .catch((err) => {
            setLoading(false);
            return setError("Error loading Instructor Details");
          });
      }
    }
  }, [session, user]);

  return (
    <>
      <Head>
        <title>Payments | Uketa Learning - Unlock, Understand, Uplift</title>
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
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
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
            <div className="table-responsive">
              <table className="table table-stripped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Payment ID</th>
                    <th>Date</th>
                    <th>Payee</th>
                    <th>Amount</th>
                    {/* <th>Payment Gateway</th> */}
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ye6271</td>
                        <td>23rd March 2023</td>
                        <td>John Doe</td>
                        <td>100,000</td>
                        {/* <td>Pesapal</td> */}
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>yw6780</td>
                        <td>30th March 2023</td>
                        <td>Jane Doe</td>
                        <td>250,000</td>
                        {/* <td>Pesapal</td> */}
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

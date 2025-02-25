import AdminDashboardEl from "../../../components/adminpage/AdminDashboardEl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";
import CommentsListEl from "../../../components/adminpage/CommentsListEl";

import useSWR from "swr";
import axios from "axios";
import { Spinner, Table } from "react-bootstrap";
import moment from "moment";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllReviews = async () => {
    try {
      setLoading(true);
      axios.get("/api/admin/getAllReviews").then((res) => {
        setReviews(res.data.data);
        return setLoading(false);
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    getAllReviews();
  }, [session, user]);

  const publishReview = async (id) => {
    try {
      setLoading(true);
      axios.post("/api/admin/publishReview", { id }).then((res) => {
        getAllReviews();
      });
    } catch (error) {}
  };

  const unPublishReview = async (id) => {
    try {
      setLoading(true);
      axios.post("/api/admin/unPublishReview", { id }).then((res) => {
        getAllReviews();
      });
    } catch (error) {}
  };

  const deleteReview = async (id) => {
    try {
      setLoading(true);
      axios.post("/api/admin/deleteReview", { id }).then((res) => {
        getAllReviews();
      });
    } catch (error) {}
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
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="sectionSubheader">Manage Reviews</p>
          {/* <CommentsListEl /> */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Course</th>
                <th>Coach</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Date Created</th>
                <th>Date Updated</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center my-5 py-5">
                    <Spinner className="text-warning mx-auto" />
                  </td>
                </tr>
              ) : (
                <>
                  {reviews &&
                    reviews.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <p className="fw-bold m-0">{item.User.name}</p>
                          </td>
                          <td>{item.Course.name}</td>
                          <td>{item.Course.Instructor.instructor}</td>
                          <td>{item.review}</td>
                          <td>{item.rating}</td>
                          <td>{moment(item.createdAt).format("LLL")}</td>
                          <td>{moment(item.updatedAt).format("LLL")}</td>
                          {item.isPublished ? (
                            <td className="text-success">Approved</td>
                          ) : (
                            <td className="text-danger">Pending</td>
                          )}
                          <td>
                            {item.isPublished ? (
                              <button
                                className="btn btn-warning"
                                onClick={() => unPublishReview(item.id)}
                              >
                                Reject
                              </button>
                            ) : (
                              <button
                                className="btn btn-success"
                                onClick={() => publishReview(item.id)}
                              >
                                Approve
                              </button>
                            )}

                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => deleteReview(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
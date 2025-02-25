import React from "react";
import { Modal, Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import Head from "next/head";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import axios from "axios";
import { Spinner } from "react-bootstrap";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  // Get userId and courseId from the query parameters
  const { feedbackId } = router.query;

  const { data: session } = useSession();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState({});
  const [showConfirmDeleteFeedbackModal, setShowConfirmDeleteFeedbackModal] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState("");
  const [messageDeleting, setMessageDeleting] = useState("");

  const handleShowConfirmDeleteFeedbackModal = () =>
    setShowConfirmDeleteFeedbackModal(true);
  const handleCloseConfirmDeleteFeedbackModal = () =>
    setShowConfirmDeleteFeedbackModal(false);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    // if (user && user.user?.email !== "admin@uketa.online") router.push("/");
    if (feedbackId) {
      axios
        .post("/api/admin/getFeedbackById", { feedbackId })
        .then((res) => {
          setLoading(false);
          setFeedbackData(res.data);
        })
        .catch((error) => {
          console.log({ error });
          return setLoading(false);
        });
    }
  }, [session, user, feedbackId]);

  const handleDeleteFeedback = async (id) => {
    try {
      if (!id) return alert("Feedback ID not found");
      const payload = { feedbackId: id };
      console.log(payload);
      setIsDeleting(true);
      axios
        .post("/api/admin/deleteFeedbackById", payload)
        .then((res) => {
          console.log({ res });
          setIsDeleting(false);
          setMessageDeleting("You have successfully deleted the Feedback");
          setTimeout(() => {
            router.push("/admin/feedback")
          }, 2000);
        })
        .catch((err) => {
          console.log({ err });
          setErrorDeleting("Error deleting Feedback");
          setIsDeleting(false);
        });
    } catch (error) {
      console.log({ error });
      setIsDeleting(false);
      setErrorDeleting("Error deleting Feedback");
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        <div className="p-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Feedback Details</h1>
          <div>
            {loading ? (
              <div className="d-flex">
                <Spinner className="mx-auto text-warning" />
              </div>
            ) : (
              <div className="p-2">
                <div>
                  <h4>{feedbackData?.User?.name}</h4>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>What course did you take?</h6>
                  <p className="bg-light">{feedbackData?.Course?.name}</p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>How satisfied are you with the course?</h6>
                  <p className="bg-light">{feedbackData?.satisfactionRating}</p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>How easy or difficult was it to access the platform?</h6>
                  <p className="bg-light">
                    {feedbackData?.platformAccessibilityRating}
                  </p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>How engaging and informative were course materials?</h6>
                  <p className="bg-light">
                    {feedbackData?.courseMaterialEngagement}
                  </p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>How would you rate the Coach ?</h6>
                  <p className="bg-light">{feedbackData?.coachRating}</p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>Did you find the worksheets helpful ?</h6>
                  <p className="bg-light">
                    {feedbackData?.worksheetsHelpfulRating}
                  </p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>How applicable was the course to you?</h6>
                  <p className="bg-light">
                    {feedbackData?.courseApplicability}
                  </p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>How affordable was the course?</h6>
                  <p className="bg-light">
                    {feedbackData?.courseAffordability}
                  </p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>Would you recommend this course to a friend?</h6>
                  <p className="bg-light">
                    {feedbackData.recommendToFriend ? "YES" : "NO"}
                  </p>
                </div>
                <div className="p-3 card shadow my-2">
                  <h6>Any other comments?</h6>
                  <p className="bg-light">{feedbackData?.feedbackComment}</p>
                </div>
                <div className="p-3">
                  <button
                    className="btn btn-danger"
                    onClick={handleShowConfirmDeleteFeedbackModal}
                  >
                    Delete Feedback
                  </button>
                </div>
                <Modal
                  show={showConfirmDeleteFeedbackModal}
                  onHide={handleCloseConfirmDeleteFeedbackModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>CONFIRM DELETE FEEDBACK</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-center">
                    <h4>
                      Please not the this action is irreversible. Once performed
                      cannot be undone
                    </h4>
                    {messageDeleting && (
                      <div className="alert alert-success w-100">
                        {messageDeleting}
                      </div>
                    )}
                    {errorDeleting && (
                      <div className="alert alert-danger w-100">
                        {errorDeleting}
                      </div>
                    )}
                  </Modal.Body>
                  {isDeleting ? (
                    <div className="d-flex">
                      <Spinner className="text-warning mx-auto" />
                    </div>
                  ) : (
                    <Modal.Footer className="d-flex justify-content-between">
                      <Button
                        variant="secondary"
                        onClick={handleCloseConfirmDeleteFeedbackModal}
                      >
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteFeedback(feedbackData.id)}
                      >
                        PROCEED TO DELETE FEEDBACK
                      </Button>
                    </Modal.Footer>
                  )}
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

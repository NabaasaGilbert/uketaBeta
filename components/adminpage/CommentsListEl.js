import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./AdminPage.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function CommentsListEl() {
  const router = new useRouter();
  const [formResponse, setFormResponse] = useState({});

  const { data: CommentData } = useSWR("/api/admin/fetchAllComments", fetcher);

  async function commentStatusHandler(commentData) {
    const commentStatusResponse = await fetch(
      "/api/admin/commentStatusHandler",
      {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((f) => f.json());

    setFormResponse(commentStatusResponse);
    router.reload();
  }

  async function commentDeleteHandler(commentID) {
    const commentDeleteResponse = await fetch("/api/admin/deleteComment", {
      method: "POST",
      body: JSON.stringify(commentID),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((f) => f.json());

    setFormResponse(commentDeleteResponse);
    router.reload();
  }

  return (
    <>
      {formResponse.status === 200 ? (
        <Badge key={formResponse.status} className="mb-3" bg="success" pill>
          {formResponse.response}
        </Badge>
      ) : (
        <Badge key={formResponse.status} className="mb-3" bg="danger" pill>
          {formResponse.response}
        </Badge>
      )}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {CommentData &&
            CommentData.map((item, index) => {
              return index <= 10 ? (
                <tr key={item.id}>
                  <td>
                    <p className="fw-bold m-0">{item.username}</p>
                  </td>
                  <td>{item.text}</td>
                  <td>{item.date}</td>
                  <td
                    className={
                      item.status === "Approved"
                        ? classes.CommentStatusApproved
                        : classes.CommentStatus
                    }
                  >
                    {item.status}
                  </td>
                  <td className="d-flex">
                    {item.status === "Approved" ? (
                      <Button
                        className={classes.RejectButton}
                        onClick={() =>
                          commentStatusHandler({
                            commentId: item.id,
                            status: "Rejected",
                          })
                        }
                      >
                        Reject
                      </Button>
                    ) : (
                      <Button
                        className={classes.ApproveButton}
                        onClick={() =>
                          commentStatusHandler({
                            commentId: item.id,
                            status: "Approved",
                          })
                        }
                      >
                        Approve
                      </Button>
                    )}
                    {/* <Button
                      className={classes.ApproveButton}
                      onClick={() =>
                        commentStatusHandler({
                          commentId: item.id,
                          status: "Approved",
                        })
                      }
                    >
                      Approve
                    </Button> */}
                    {/* <Button
                      className={classes.RejectButton}
                      onClick={() =>
                        commentStatusHandler({
                          commentId: item.id,
                          status: "Rejected",
                        })
                      }
                    >
                      Reject
                    </Button> */}
                    <Button
                      className={classes.DeleteButton}
                      onClick={() => commentDeleteHandler(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ) : null;
            })}
        </tbody>
      </Table>
    </>
  );
}

export default CommentsListEl;

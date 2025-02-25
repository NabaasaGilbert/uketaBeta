import { Card, Spinner } from "react-bootstrap";
import { signIn, useSession } from "next-auth/react";
import useUser from "../../../lib/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CommentsEl() {
  const router = new useRouter();
  const index = router.query.courseId;
  const { user } = useUser();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      setUserData(session?.user);
    }
    if (user?.isLoggedIn === true) {
      setUserData(user?.user);
    }

    if (index) {
      axios
        .get(`/api/instructor/getCourseComments?${index}`)
        .then((res) => {
          setLoading(false);
          return setComments(res.data.data);
        })
        .catch((err) => {
          setError("Error getting my course comments");
          return setLoading(false);
        });
    }
  }, [index, session, user]);

  return (
    <>
      <div className="mb-5">
        <p className="sectionSubheader">Comments</p>

        {error && <div className="text-center">{error}</div>}

        {loading ? (
          <div className="d-flex">
            <Spinner className="mx-auto text-orange" />{" "}
          </div>
        ) : (
          <>
            {comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <Card key={comment.id} className="bg-light my-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <Card.Title>{comment.username}</Card.Title>
                        <h6>
                          <i>{comment.date}</i>
                        </h6>
                      </div>
                      <p>{comment.text}</p>
                    </Card.Body>
                  </Card>
                ))}
              </>
            ) : (
              <div>
                {" "}
                <p>No comments posted yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

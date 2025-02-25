import { Form, Button, Card } from 'react-bootstrap';
import { signIn, useSession } from 'next-auth/react';
import useUser from '../../lib/useUser';
import { useRecoilValue } from 'recoil';
import { currentCourseState } from '../../atoms/atoms';
import { useEffect, useRef, useState } from 'react';
import Badge from 'react-bootstrap/Badge';

export default function CommentsEl(props) {
  const { user } = useUser();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [commentData, setCommentData] = useState({});
  const CurrentCourse = useRecoilValue(currentCourseState);
  const commentInputRef = useRef();
  const formResponse = props.reponse;

  async function fetchCommentsHandler(commentData) {
    const commentApiResponse = await fetch('/api/comments/fetchComments', {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((f) => f.json());
    //   if (apiResponse.status === 200)
    setCommentData(commentApiResponse.data);
    // router.reload();
  }

  useEffect(() => {
    fetchCommentsHandler(CurrentCourse?.id);
  }, [CurrentCourse]);

  function commentSubmitHandler(event) {
    event.preventDefault();

    const enteredComment =
      commentInputRef.current?.value === ''
        ? ''
        : commentInputRef.current?.value;

    const addCommentData = {
      text: enteredComment,
      username: userData?.name,
      userEmail: userData?.email,
      courseId: CurrentCourse?.id,
    };

    props.onAddComment(addCommentData);
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setUserData(session?.user);
    }
    if (user?.isLoggedIn === true) {
      setUserData(user?.user);
    }
  }, [session, user]);

  return (
    <>
      <div className="mb-5">
        <p className="sectionSubheader">Comments</p>
        {Object.values(commentData).length === 0 ? (
          <p className='alert alert-danger text-center'>No comments posted yet.</p>
        ) : (
          commentData &&
          Object.values(commentData).map((comment) => (
            <Card key={comment.id}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title>{comment.username}</Card.Title>
                  <h6>{comment.date}</h6>
                </div>
                <p>{comment.text}</p>
              </Card.Body>
            </Card>
          ))
        )}
        {status != 'unauthenticated' || user?.isLoggedIn === true ? (
          <>
            {/* <Form onSubmit={commentSubmitHandler} className="mt-5">
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Say something..."
                  ref={commentInputRef}
                />
              </Form.Group>
              {formResponse.status === 200 ? (
                <Badge
                  key={formResponse.status}
                  className="mb-3"
                  bg="success"
                  pill
                >
                  {formResponse.response}
                </Badge>
              ) : (
                <Badge
                  key={formResponse.status}
                  className="mb-3"
                  bg="danger"
                  pill
                >
                  {formResponse.response}
                </Badge>
              )}
              <br />
              <Button className="defaultButton" type="submit">
                Submit
              </Button>
            </Form> */}
          </>
        ) : (
          <Button
            className="mt-2 defaultButton"
            onClick={() => {
              signIn();
            }}
          >
            Login to Comment
          </Button>
        )}
      </div>
    </>
  );
}

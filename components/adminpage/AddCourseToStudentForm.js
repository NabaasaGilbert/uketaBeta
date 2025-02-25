import Form from "react-bootstrap/Form";
import { useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import { Button, Spinner } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { courseDataState } from "../../atoms/atoms";

export default function AddCourseToStudentForm(props) {
  const formResponse = props.response;
  const loading = props.loading;
  const CourseData = useRecoilValue(courseDataState);
  const courseInputRef = useRef();
  const emailInputRef = useRef();

  async function courseAddSubmitHandler(event) {
    event.preventDefault();
    const enteredCourse =
      courseInputRef.current?.value === null
        ? ""
        : courseInputRef.current?.value;
    const enteredEmail =
      emailInputRef.current?.value === null ? "" : emailInputRef.current?.value;

    const enteredData = {
      courseId: enteredCourse,
      email: enteredEmail,
    };
    props.onSubmit(enteredData);
  }

  return (
    <Form onSubmit={courseAddSubmitHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>User Email</Form.Label>
        <Form.Control
          ref={emailInputRef}
          type="text"
          placeholder="user@email.com"
          //   autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Course</Form.Label>
        <Form.Select ref={courseInputRef} aria-label="Default select example">
          <option>Open this select menu</option>
          {CourseData &&
            Object.values(CourseData).map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        {formResponse.status === 200 ? (
          <Badge key={formResponse.status} bg="success" pill>
            {formResponse.response}
          </Badge>
        ) : (
          <Badge key={formResponse.status} bg="danger" pill>
            {formResponse.response}
          </Badge>
        )}
      </Form.Group>

      {loading ? (
        <div className="p-2">
          <Spinner className="text-warning" />
        </div>
      ) : (
        <Button className="defaultButton" type="submit">
          Submit
        </Button>
      )}
    </Form>
  );
}

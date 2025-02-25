import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";
import { courseDataState } from "../../atoms/atoms";

export default function StudentListModal(props) {
  const StudentData = props.studentData;
  const CourseData = useRecoilValue(courseDataState);
  return (
    <Modal {...props} size="xl" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>All Students</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {StudentData?.map((item, index) => {
              return (
                <tr key={item.email}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="fw-bold m-0">{item.name}</p>
                    <p>{item.email}</p>
                  </td>
                  <td>
                    {CourseData &&
                      Object.values(CourseData).map((course) =>
                        item.courses.map((userCourse) =>
                          userCourse.courseId === course.id ? (
                            <Badge
                              key={course.id}
                              bg="warning"
                              className="text-dark"
                              pill
                            >
                              {course.name}
                            </Badge>
                          ) : null
                        )
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

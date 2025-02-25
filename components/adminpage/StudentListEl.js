import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";
import { courseDataState } from "../../atoms/atoms";
import { Button } from "react-bootstrap";
import StudentListModal from "./StudentListModal";
import { useState } from "react";

function StudentListEl(props) {
  const StudentData = props.studentData;
  const CourseData = useRecoilValue(courseDataState);
  const [studentListModalShow, setStudentListModalShow] = useState(false);

  return (
    <>
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
            return index <= 4 ? (
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
            ) : null;
          })}
        </tbody>
      </Table>
      <Button
        className="defaultButton"
        onClick={() => setStudentListModalShow(true)}
      >
        View All
      </Button>
      <StudentListModal
        show={studentListModalShow}
        onHide={() => setStudentListModalShow(false)}
        studentData={StudentData}
      />
    </>
  );
}

export default StudentListEl;

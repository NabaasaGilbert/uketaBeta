import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";
import { courseDataState } from "../../atoms/atoms";
import moment from "moment";
import { Spinner } from "react-bootstrap";

function StudentListComponent(props) {
  const StudentData = props.studentData;
  const CourseData = useRecoilValue(courseDataState);
  const loading = props.loading;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Student Phone Number</th>
            <th>Student Gender</th>
            <th>Company</th>
            <th>Student Date of Birth</th>
            <th>Age</th>
            <th>Date Created</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="d-flex w-100" colSpan={8}>
                <Spinner className="text-warning mx-auto" />
              </td>
            </tr>
          ) : (
            <>
              {StudentData.length === 0 ? (
                <tr className="text-center p-5">
                  <td colSpan={8} className="p-5">
                    No Students found
                  </td>
                </tr>
              ) : (
                <>
                  {StudentData?.map((item, index) => {
                    return (
                      <tr key={item.email}>
                        <td>{index + 1}</td>
                        <td>
                          <p className="fw-bold m-0">{item.name}</p>
                        </td>
                        <td>
                          <p>{item.email}</p>
                        </td>
                        <td>
                          <p>{item.phone}</p>
                        </td>
                        <td>
                          <p>{item.gender}</p>
                        </td>
                        <td>
                          <p>{item?.company?.name}</p>
                        </td>
                        <td>
                          <p>
                            {item.dateOfBirth &&
                              moment(item.dateOfBirth).format("LL")}
                          </p>
                        </td>
                        <td>
                          <p>{item.age}</p>
                        </td>
                        <td>
                          <p>{moment(item.createdAt).format("LLLL")}</p>
                        </td>
                        <td>
                          {CourseData &&
                            Object.values(CourseData).map((course) =>
                              item.courses.map((userCourse) =>
                                userCourse.courseId === course.id ? (
                                  <Badge
                                    key={course.id}
                                    bg="warning"
                                    className="text-dark mx-1 my-1"
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
                </>
              )}
            </>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default StudentListComponent;

import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import Badge from "react-bootstrap/Badge";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";

export default function index(props) {
  const formResponse = props.response;
  const loading = props.loading;
  const companyInputRef = useRef();
  const emailInputRef = useRef();
  const [companies, setCompanies] = useState([]);

  async function companyAddSubmitHandler(event) {
    event.preventDefault();
    const enteredCompany =
      companyInputRef.current?.value === null
        ? ""
        : companyInputRef.current?.value;
    const enteredEmail =
      emailInputRef.current?.value === null ? "" : emailInputRef.current?.value;

    const enteredData = {
      companyId: enteredCompany,
      email: enteredEmail,
    };
    props.onSubmit(enteredData);
  }
  useEffect(() => {
    const getCompaniesData = async () => {
      try {
        axios.get(`/api/admin/getCompanies`).then((res) => {
          console.log(res.data.message);
          setCompanies(res.data.message);
        });
      } catch (error) {
        console.log("Error getting companies data");
        return;
      }
    };

    getCompaniesData();
  }, []);

  return (
    <Form onSubmit={companyAddSubmitHandler}>
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
        <Form.Label>Company</Form.Label>
        <Form.Select ref={companyInputRef} aria-label="Default select example">
          <option>Open this select menu</option>
          {companies &&
            Object.values(companies).map((course) => (
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

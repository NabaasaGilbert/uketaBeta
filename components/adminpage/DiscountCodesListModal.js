import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DiscountListModal(props) {
  //   const { data: DiscountCodes } = useSWR(
  //     "/api/courses/allDiscountCodes",
  //     fetcher
  //   );
  const DiscountCodes = props.discountData;
  function handleDiscountDelete(discountId) {
    props.onDelete(discountId);
  }

  return (
    <Modal {...props} size="xl" centered aria-labelledby="AddCourseFormModal">
      <Modal.Header closeButton>
        <Modal.Title>All Discount Codes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Discount Code</th>
              <th>Percent</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {DiscountCodes?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <p className="fw-bold m-0">{item.code}</p>
                  </td>
                  <td>
                    <p>{item.percent}</p>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDiscountDelete(item.id)}
                    >
                      Delete
                    </Button>
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

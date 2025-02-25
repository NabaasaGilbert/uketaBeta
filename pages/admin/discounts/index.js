import { Col, Row, Button, Form, Table, Spinner, Modal } from 'react-bootstrap';
import useSWR from 'swr';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useUser from '../../../lib/useUser';
import Head from 'next/head';
import AddDiscountForm from '../../../components/adminpage/AddDiscountForm';
import axios from 'axios';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function index() {
  const router = new useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const { data } = useSWR('/api/admin/adminDataCollectApi', fetcher);
  const [newDiscountModalShow, setNewDiscountModalShow] = useState(false);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const discountCodeInputRef = useRef();
  const discountValueInputRef = useRef();
  const [discountError, setDiscountError] = useState('');

  const getDiscountCodes = async () => {
    try {
      axios.post('/api/admin/adminDataCollectApi').then((res) => {
        setDiscountCodes(res.data.discountCodes);
        return setLoading(false);
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push('/login');
    // if (user && user.user?.email != "admin@uketa.online") router.push("/");
    getDiscountCodes();
  }, [session, user]);

  const handleAddDiscount = async (event) => {
    event.preventDefault();

    const enteredDiscountCode =
      discountCodeInputRef.current?.value === ''
        ? ''
        : discountCodeInputRef.current?.value;
    const enteredDiscountValue =
      discountValueInputRef.current?.value === ''
        ? ''
        : discountValueInputRef.current?.value;

    if (!enteredDiscountCode || !enteredDiscountValue)
      return setDiscountError('Please fill out the required fields ');

    const addDiscountCodeData = {
      code: enteredDiscountCode,
      percent: enteredDiscountValue,
    };

    setDiscountError('');
    try {
      setLoading(true);
      axios
        .post('/api/admin/addDiscountCode', addDiscountCodeData)
        .then((res) => {
          setNewDiscountModalShow(false);
          getDiscountCodes();
          return;
        });
    } catch (error) {
      setLoading(true);
      setDiscountError('Error creating discount');
      return;
    }
  };

  const handleDiscountDelete = async (id) => {
    try {
      setLoading(true);
      axios.post('/api/admin/deleteDiscountCode', { id }).then((res) => {
        if (res.data.status === 200) {
          alert('Discount Code deleted successfully');
          getDiscountCodes();
        } else {
          alert('Error deleting discount code');
        }
      });
    } catch (error) {
      setLoading(false);
      alert('Error deleting discount code');
    }
  };

  async function __handleDiscountDelete(passedData) {
    const apiResponse = await fetch('/api/admin/deleteDiscountCode', {
      method: 'POST',
      body: JSON.stringify(passedData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((f) => f.json());
    if (apiResponse.status === 200)
      // setViewDiscountModalShow(false);
      // setFormResponse(apiResponse);
      router.reload();
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div>
        {/* {user?.user?.email === "admin@uketa.online" ? (
          <AdminDashboardEl />
        ) : null} */}

        <div className="py-5 mt-5 container-fluid container-custom-uketa_">
          <h1 className="text-3xl font-bold text-gray-900">Discounts</h1>
          <Row>
            <Col>
              <p className="sectionSubheader m-0">Manage Discounts</p>
              <br />
              {!loading && (
                <Button
                  className="defaultButton m-2"
                  onClick={() => setNewDiscountModalShow(true)}
                >
                  Add New Discount
                </Button>
              )}
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Percentage Discount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr colSpan={4}>
                  <td>
                    <Spinner className="text-warning" />
                  </td>
                </tr>
              ) : (
                <>
                  {discountCodes?.map((discount, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{discount.code}</td>
                      <td>{discount.percent}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDiscountDelete(discount.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </div>
        {/* <AddDiscountForm
          show={newDiscountModalShow}
          onHide={() => setNewDiscountModalShow(false)}
          // onadddiscount={addDiscountHandler}
          adddiscountcode={addDiscountHandler}
          // loading={loading}
        /> */}

        <Modal
          // {...props}
          show={newDiscountModalShow}
          size="lg"
          centered
          aria-labelledby="AddCourseFormModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Discount Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddDiscount}>
              <Form.Group controlId="">
                <Form.Label>Discount Code*:</Form.Label>
                <Form.Control
                  ref={discountCodeInputRef}
                  type="text"
                  autoFocus
                  //   defaultValue={currentLectureData?.lectureId}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Discount Value*:</Form.Label>
                <Form.Control
                  type="number"
                  ref={discountValueInputRef}
                  //   defaultValue={currentModuleData?.videoUrl}
                />
              </Form.Group>
              {discountError && (
                <div className="alert alert-danger text-center">
                  {discountError}
                </div>
              )}
              {loading ? (
                <div className="d-flex">
                  <Spinner className="mx-auto text-warning" />
                </div>
              ) : (
                <div className="d-flex justify-content-between">
                  <Button
                    variant="light"
                    onClick={() => setNewDiscountModalShow(false)}
                  >
                    Close
                  </Button>
                  <Button className="defaultButton" type="submit">
                    Create Discount Code
                  </Button>
                </div>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

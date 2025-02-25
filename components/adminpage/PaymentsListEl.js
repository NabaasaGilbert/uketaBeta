// import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";
// import { useRecoilValue } from "recoil";
// import { courseDataState } from "../../atoms/atoms";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function PaymentsListEl(props) {
  const [cartTotal, setCartTotal] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  //   const CourseData = useRecoilValue(courseDataState);

  let cartTotalArray = [];

  const getPayments = async () => {
    try {
      axios.get("/api/pesapal/fetchAllPayments").then((res) => {
        setLoading(false);
        res.data.data.map((elem) => {
          if (elem.status === "successful") {
            addToArray(elem.amount);
          }
        });
        const paymentData = res.data.data.reverse();
        calculateTotal();
        setPayments(paymentData);
        setPaymentsList(paymentData);
        return;
      });
    } catch (error) {}
  };
  useEffect(() => {
    getPayments();
  }, []);

  function addToArray(price) {
    const value = parseInt(price);
    cartTotalArray.push(value);
  }

  async function calculateTotal() {
    const sum = cartTotalArray.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setCartTotal(sum);
  }

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleDataDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch("/api/pesapal/downloadAllPayments"); // Replace with your API endpoint
      const data = await response.blob();
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      setIsDownloading(false);
      link.setAttribute("download", "uketaPaymentsData.csv"); // Set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setIsDownloading(false);
      alert("Error occurred trying to Download payments Data");
      console.error("Error downloading data:", error);
    }
  };

  function filterArray(inputArray, searchTerm) {
    const filteredArray = [];

    for (const item of inputArray) {
      const itemName = item.User.name.toLowerCase();
      const itemEmail = item.User.email.toLowerCase();
      const filterValue = searchTerm.toLowerCase();

      if (itemName.includes(filterValue) || itemEmail.includes(filterValue)) {
        filteredArray.push(item);
      }
    }

    return setPayments(filteredArray);
  }

  const handleSearch = async (searchTerm) => {
    try {
      filterArray(paymentsList, searchTerm);
    } catch (error) {}
  };

  return (
    <>
      {loading ? (
        <div className="d-flex">
          <Spinner className="mx-auto text-orange" />
        </div>
      ) : (
        <div>
          <div>
            {isDownloading ? (
              <div className="d-flex">
                <Spinner className="text-orange mx-auto" />
              </div>
            ) : (
              <div className="d-flex justify-content-between pb-3">
                <div className="d-flex pt-3">
                  <span className="pt-2">Search by Name or Email:</span>
                  <span className="px-4">
                    {!loading && (
                      <input
                        className="form-control"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    )}
                  </span>
                </div>
                <button
                  className="btn btn-success"
                  onClick={handleDataDownload}
                >
                  Download Data
                </button>
              </div>
            )}
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>User Names</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Courses</th>
                <th>Pesapal Tracking ID</th>
                <th>Pesapal Merchant Reference</th>
                <th>Transaction Date</th>
                <th>Discount Code</th>
                <th>Status</th>
                <th>Sales Person</th>
                <th>Amount(UGX)</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((item, index) => {
                // return item.status === 'successful' ? (
                return (
                  <tr key={item.createdAt}>
                    {/* <td>{index + 1}</td> */}
                    <td>{moment(item.createdAt).format("LLLL")}</td>
                    <td>{item?.User?.name}</td>
                    <td>{item?.User?.email}</td>
                    <td>{item?.User?.phone}</td>
                    <td>{item?.User?.gender}</td>
                    <td>
                      {item?.User?.dateOfBirth ? (
                        moment(item?.User?.dateOfBirth).format("LL")
                      ) : (
                        <span className="text-danger">Not Added Yet</span>
                      )}
                    </td>
                    <td>
                      {item.courses ? (
                        item.courses
                      ) : (
                        <p className="text-danger">Course Data not supplied</p>
                      )}
                    </td>
                    <td>{item.pesapalOrderTrackingId}</td>
                    <td>{item.pesapalMerchantReference}</td>
                    <td>{moment(item.createdAt).format("LLLL")}</td>
                    <td>{item.discountCode}</td>
                    <td>
                      {item.status === "pending" && (
                        <p className="alert alert-danger">{item.status}</p>
                      )}
                      {item.status === "successful" && (
                        <p className="alert alert-success">{item.status}</p>
                      )}
                    </td>
                    <td>{item?.SalesPerson?.name}</td>
                    <td>
                      <p className="fw-bold m-0 text-right">
                        {addToArray(item.amount)}
                        {numberWithCommas(item.amount)}
                        {/* {item.amount + " Shs"} */}
                      </p>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={7}>
                  <p className="fw-bold m-0 h4">Total:</p>
                </td>
                {/* <td></td> */}
                <td colSpan={2}>
                  <p className="fw-bold m-0 h4 text-right">
                    {"UGX  " + numberWithCommas(cartTotal)}
                  </p>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default PaymentsListEl;

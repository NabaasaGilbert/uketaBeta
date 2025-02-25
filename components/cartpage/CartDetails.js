import classes from "./Cart.module.css";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { cartState, courseDataState } from "../../atoms/atoms";
import { useState, useEffect, useRef } from "react";
// import { FaGlobeAfrica } from "react-icons/fa";
// import { BiCheck, BiLock } from "react-icons/bi";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import useSWR from "swr";
import axios from "axios";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CartDetails() {
  const { user } = useUser();
  const { data: session, status } = useSession();
  const [cart, setCart] = useRecoilState(cartState);
  const [cartTotal, setCartTotal] = useState(null);
  const [enteredCode, setEnteredCode] = useState("");
  const [discountResponse, setDiscountResponse] = useState({
    status: 400,
    message: "",
  });
  const [error, setError] = useState("");
  const discountCodeInputRef = useRef();
  const [randomItemId, setRandomItemId] = useState(0);
  const CourseData = useRecoilValue(courseDataState);
  const router = useRouter();
  const resetCartState = useResetRecoilState(cartState);
  const [userData, setUserData] = useState({});
  const [refererEmail, setRefererEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: DiscountCodes } = useSWR("/api/user/allDiscountCodes", fetcher);

  let cartTotalArray = [];

  useEffect(() => {
    if (discountResponse.status === 400 || discountResponse.status === 401)
      calculateTotal();
  }, [cartTotalArray]);

  useEffect(() => {
    handleDiscount();
  }, [enteredCode]);

  function randomNumber() {
    const item = Math.random() * (4 - 1) + 1;
    return item;
  }

  useEffect(() => {
    const value = randomNumber();
    setRefererEmail(localStorage.getItem("refererEmail"));
    Object.entries(cart).map(([id]) =>
      CourseData[value]?.id != id ? setRandomItemId(parseInt(value)) : null
    );
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      setUserData(session.user);
    }
    if (user?.isLoggedIn === true) {
      setUserData(user?.user);
    }
  }, [session, user]);

  function addToArray(price) {
    const value = parseInt(price);
    cartTotalArray.push(value);
  }

  function removeFromArray(price) {
    const index = cartTotalArray.indexOf(price);
    if (index !== -1) {
      cartTotalArray.splice(index, 1);
    }
    return cartTotalArray;
  }

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calculateTotal() {
    const sum = cartTotalArray.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setCartTotal(sum);
  }

  const handleDiscount = async () => {
    try {
      if (DiscountCodes.data.length > 0 && enteredCode !== "") {
        calculateTotal();
        let arrDiscountCodes = [];
        DiscountCodes.data.map((elem) => arrDiscountCodes.push(elem.code));
        if (arrDiscountCodes.includes(enteredCode)) {
          // get discount code value
          const discountCodeValue = DiscountCodes.data.filter(
            (elem) => elem.code === enteredCode
          )[0].percent;
          const calculateDiscount = (cartTotal * discountCodeValue) / 100;
          const newCartTotal = cartTotal - calculateDiscount;
          await setCartTotal(newCartTotal);
          setDiscountResponse({ status: 200, message: "Promo Code Active" });
        } else {
          calculateTotal();
          setDiscountResponse({
            status: 400,
            message: "Invalid discount code",
          });
        }
      } else {
        calculateTotal();
      }
    } catch (error) {
      return
    }
  };

  const config = {
    public_key: "FLWPUBK-fdc034bf5dffb130abbf42c5682d2f40-X",
    tx_ref: Date.now(),
    amount: cartTotal,
    currency: "UGX",
    payment_options: "card,mobilemoney",
    customer: {
      email: userData.email,
      name: userData.name,
    },
    customizations: {
      title: "Course payment",
      description: "Payment for courses in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  /**
   * Handles posting payment settlements
   * @param data
   */
  const submitPaymentHandler = async (data) => {
    // Getting the course Ids
    const courseIds = [];

    let payload;

    const courseIdArray = Object.keys(cart);

    for (let i = 0; i < courseIdArray.length; i++) {
      courseIds.push(courseIdArray[i]);
    }

    const courseIdObj = Object.assign({}, courseIds);

    // http://localhost:3000/successCoursePaymentCallback?OrderTrackingId=dcacad2c-e2ae-48a5-9ba9-de6e7fd0500f&OrderMerchantReference=21c5485d-5625-4e32-a6c5-430f020be062

    payload = { ...data, courseIdObj };

    if (payload.status === "successful") {
      await fetch("api/courses/paymentSettlement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          resetCartState();
          router.push("/mycourses");
        })
        .catch((error) => {
          return
        });
    }
  };

  // const handleFlutterPayment = useFlutterwave(config);
  // handle Add to Cart button Action
  const handleAddToCart = async (randomItemId) => {
    await setCart({
      ...cart,
      [CourseData[randomItemId].id]: CourseData[randomItemId].name,
    });

    let tempCart = {
      ...cart,
      [CourseData[randomItemId].id]: CourseData[randomItemId].name,
    };

    let pricesArray = [];

    Object.keys(tempCart).forEach((key) => {
      CourseData.map((elem) => {
        if (elem.id === key) {
          pricesArray.push(elem.priceUGX);
        }
      });
    });

    cartTotalArray = [...pricesArray];

    if (DiscountCodes.data.length > 0 && enteredCode !== "") {
      let arrDiscountCodes = [];
      DiscountCodes.data.map((elem) => arrDiscountCodes.push(elem.code));
      if (arrDiscountCodes.includes(enteredCode)) {
        // get discount code value
        const discountCodeValue = DiscountCodes.data.filter(
          (elem) => elem.code === enteredCode
        )[0].percent;
        const sum = cartTotalArray.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        // setCartTotal(sum);
        const calculateDiscount = (sum * discountCodeValue) / 100;
        const newCartTotal = sum - calculateDiscount;
        await setCartTotal(newCartTotal);
        setDiscountResponse({ status: 200, message: "Promo Code Active" });
      } else {
        const sum = cartTotalArray.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        setCartTotal(sum);
        setDiscountResponse({
          status: 400,
          message: "Invalid discount code",
        });
      }
    } else {
      const sum = cartTotalArray.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      setCartTotal(sum);
    }

    // calculateTotal();
    // handleDiscount();

  };

  // handle Remove from Cart button Action
  const handleRemoveFromCart = async (product) => {
    const tempCart = { ...cart };
    await delete tempCart[product.id];
    setCart(tempCart);

    let pricesArray = [];

    Object.keys(tempCart).forEach((key) => {
      CourseData.map((elem) => {
        if (elem.id === key) {
          pricesArray.push(elem.priceUGX);
        }
      });
    });

    cartTotalArray = [...pricesArray];

    if (DiscountCodes.data.length > 0 && enteredCode !== "") {
      let arrDiscountCodes = [];
      DiscountCodes.data.map((elem) => arrDiscountCodes.push(elem.code));
      if (arrDiscountCodes.includes(enteredCode)) {
        // get discount code value
        const discountCodeValue = DiscountCodes.data.filter(
          (elem) => elem.code === enteredCode
        )[0].percent;
        const sum = cartTotalArray.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        // setCartTotal(sum);
        const calculateDiscount = (sum * discountCodeValue) / 100;
        const newCartTotal = sum - calculateDiscount;
        await setCartTotal(newCartTotal);
        setDiscountResponse({ status: 200, message: "Promo Code Active" });
      } else {
        const sum = cartTotalArray.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        setCartTotal(sum);
        setDiscountResponse({
          status: 400,
          message: "Invalid discount code",
        });
      }
    } else {
      const sum = cartTotalArray.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      setCartTotal(sum);
    }
  };

  const handlePesapalPayment = async () => {
    try {
      setLoading(true);
      const hostURL = window.location.origin;
      const callbackUrl = `${hostURL}/successCoursePaymentCallback`;
      const courseIDS = [];
      const courseNamesArray = [];
      Object.keys(cart).map((elem) => courseIDS.push(elem));
      Object.values(cart).map((elem) => courseNamesArray.push(elem));
      setError("");
     
      // return

      const courseIds = courseIDS.join(", ");

      let discountCodeText = "";

      DiscountCodes.data.map((elem) => {
        if (elem.code === enteredCode) {
          discountCodeText = elem.code;
        }
      });

      const payload = {
        courseIds: courseIds,
        amount: cartTotal,
        currency: "UGX",
        userId: userData.id,
        callbackUrl: callbackUrl,
        discountCode: discountCodeText,
        description: "UKETA COURSE PAYMENT",
        courses: courseNamesArray.join(", "),
        courseIds: courseIds,
        refererEmail
      };

      // Send payment request to backend API
      await axios
        .post("/api/pesapal/initiateCustomerPayment", payload)
        .then(async (res) => {
          if (res.status === 200) {
            const redirectURL = res.data.data.redirect_url;
            setLoading(false);
            // Redirect to Pesapal Payment Page
            window.location.href = redirectURL;
          } else {
            setLoading(false);
            setError(
              "Error Occured retrieving payments page, Please try again"
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          setError("Error Occured retrieving payments page, Please try again");
        });
    } catch (error) {
      setError("Error Occured retrieving payments page, Please try again");
    }
  };

  return (
    <>
      {Object.entries(userData).length === 0 ? (
        <div className={classes.cartContainer1}>
          <div>
            <img
              src="https://res.cloudinary.com/daecbszah/image/upload/v1677774564/Login-Checkout_ewm5vj.png"
              alt=""
            />
          </div>
          <div>
            <p className="sectionHeader">Please</p>
            <div className="d-flex justify-content-center align-items-center">
              <Link href="/signup" passHref>
                <Button className="defaultButton me-3">Sign-Up</Button>
              </Link>
              <p className="sectionHeader">OR</p>
              <Link href="/login" passHref>
                <Button className="defaultButton ms-3">Login</Button>
              </Link>
            </div>
            <p className="sectionHeader">to proceed to checkout.</p>
          </div>
        </div>
      ) : (
        <div className={classes.cartContainer}>
          <p className="sectionHeader text-center">Cart</p>
          <p className="sectionSubheader">Your Shopping Bag</p>
          {/* <p>{userData.email}</p>
          <p>{userData.name}</p> */}
          <Row>
            <Col sm={8}>
              <div className={classes.cartData}>
                {Object.entries(cart).length === 0 ? (
                  <>
                    <p>
                      Your bag is currently empty, would you like to{" "}
                      <Link href="/courses/" passHref>
                        <p className={classes.continueLink}>FIND COURSES</p>
                      </Link>
                      ?
                    </p>
                  </>
                ) : (
                  Object.entries(cart).map(([id]) =>
                    CourseData?.map((product) =>
                      product.id === id ? (
                        <Row key={id}>
                          <div className={classes.cartItem}>
                            <img
                              src={product.image}
                              className={classes.cartImage}
                              alt=""
                            />
                            <div className={classes.cartItemDetails}>
                              <p className="sectionSubheader">{product.name}</p>
                              <p className={classes.cartItemPrice}>
                                {addToArray(product.priceUGX)}
                                {numberWithCommas(product.priceUGX) + " UGX"}
                              </p>
                              <Button
                                className={classes.cartItemRemoveButton}
                                onClick={(oldCart) => {
                                  handleRemoveFromCart(product);
                                  // const copy = { ...cart };
                                  // delete copy[product.id];
                                  // setCart(copy);
                                  // removeFromArray(product.priceUGX);

                                  // discountCodeInputRef.current.value = '';
                                  // setEnteredCode('');
                                  // handleDiscount();
                                }}
                              >
                                Remove from cart
                              </Button>
                            </div>
                          </div>
                        </Row>
                      ) : null
                    )
                  )
                )}
                {!CourseData ? null : (
                  <Row key="promotion">
                    <p className="sectionSubheader mt-3">Suggested Item</p>
                    <div className={classes.cartItemSuggested}>
                      <img
                        src={CourseData[randomItemId]?.image}
                        className={classes.cartImage}
                        alt=""
                      />
                      <div className={classes.cartItemDetails}>
                        <p className={classes.cartItemName}>
                          {CourseData[randomItemId]?.name}
                        </p>
                        <p>{CourseData[randomItemId]?.shortDesc}</p>
                        <p>{CourseData[randomItemId]?.product_description}</p>
                        <div className={classes.cartItemSuggestedPrice}>
                          <p>
                            {numberWithCommas(
                              CourseData[randomItemId]?.priceUGX
                            ) + " UGX"}
                            {/* {location.location === "UG"
                            ? numberWithCommas(
                                CourseData[randomItemId]?.product_price_ugx
                              ) + "shs"
                            : "£" +
                              CourseData[randomItemId]?.product_price_gbp} */}
                          </p>

                          {cart &&
                          Object.keys(cart).includes(
                            CourseData[randomItemId].id
                          ) ? (
                            <p className="text-success small">
                              <small>Already added</small>
                            </p>
                          ) : (
                            <Button
                              onClick={() => {
                                // setCart({
                                //   ...cart,
                                //   [CourseData[randomItemId].id]:
                                //     CourseData[randomItemId].name,
                                // });
                                handleAddToCart(randomItemId);
                               
                                // handleDiscount();
                              }}
                              className={classes.cartItemSuggestedButton}
                            >
                              Add To Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Row>
                )}
              </div>
            </Col>
            <Col sm={4}>
              <div className={classes.checkoutSection}>
                <div className={classes.checkoutSubsection}>
                  <p>Subtotal:</p>
                  <p className={classes.checkoutFinalPrice}>
                    {numberWithCommas(cartTotal) + " UGX"}
                    {/* {location.location === "UG"
                    ? numberWithCommas(cartTotal) + "shs"
                    : "£" + cartTotal} */}
                  </p>
                </div>
                {/* {Object.entries(userData).length === 0 ? (
                  <Link href="/login" passHref>
                    <Button className={classes.checkoutButton}>Login</Button>
                  </Link>
                ) : ( */}
                <Form className="text-center">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    {/* <Form.Label>Promo Code</Form.Label> */}
                    <Form.Control
                      ref={discountCodeInputRef}
                      type="text"
                      placeholder="Enter Promo Code"
                      onChange={(e) => setEnteredCode(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {discountResponse.status === 200 ? (
                      <Badge key={discountResponse.status} bg="success" pill>
                        {discountResponse.message}
                      </Badge>
                    ) : (
                      <Badge key={discountResponse.status} bg="danger" pill>
                        {discountResponse.message}
                      </Badge>
                    )}
                  </Form.Group>
                </Form>
                {loading ? (
                  <div className="d-flex">
                    <Spinner className="mx-auto text-orange" />
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      handlePesapalPayment();
                    }}
                    className={classes.checkoutButton}
                  >
                    Checkout Now
                  </Button>
                )}

                {error && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}

                {/* <Button
                  onClick={() => {
                    handleFlutterPayment({
                      callback: (response) => {
                        submitPaymentHandler(response);
                        closePaymentModal(); // this will close the modal programmatically
                      },
                      onClose: () => {},
                    });
                  }}
                  className={classes.checkoutButton}
                >
                  Checkout Now
                </Button> */}
                {/* )} */}
                <div className={classes.checkoutSubsection}></div>
              </div>
            </Col>
          </Row>
          {/* <Link href="/shop/" passHref>
          <p className={classes.continueLink}>
            Continue Shopping
          </p>
        </Link> */}
        </div>
      )}
    </>
  );
}

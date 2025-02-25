import classes from './Cart.module.css';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { cartState, courseDataState } from '../../atoms/atoms';
import { useState, useEffect, useRef } from 'react';
// import { FaGlobeAfrica } from "react-icons/fa";
// import { BiCheck, BiLock } from "react-icons/bi";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useRouter } from 'next/router';
import useUser from '../../lib/useUser';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CartDetails() {
  const { user } = useUser();
  const { data: session, status } = useSession();
  const [cart, setCart] = useRecoilState(cartState);
  const [cartTotal, setCartTotal] = useState(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [discountResponse, setDiscountResponse] = useState({
    status: 400,
    message: '',
  });
  const discountCodeInputRef = useRef();
  const [discountTextValue, setDiscountTextValue] = useState('');
  const [randomItemId, setRandomItemId] = useState(0);
  const CourseData = useRecoilValue(courseDataState);
  const router = useRouter();
  const resetCartState = useResetRecoilState(cartState);
  const [userData, setUserData] = useState({});
  const [discountCodeData, setDiscountCodeData] = useState([]);
  const [cartTotalArray, setCartTotalArray] = useState([]);

  const { data: DiscountCodes } = useSWR('/api/user/allDiscountCodes', fetcher);

  async function initiatePayment(amount, description, reference) {
    try {
      const paymentOptions = {
        amount,
        description,
        type: 'MERCHANT', // For merchant payments
        reference,
        callback: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`, // Replace with your callback URL
      };

      const payment = await pesapal.getPaymentURL(paymentOptions);
      return payment;
    } catch (error) {
      console.error('Error initiating Pesapal payment:', error);
      throw error;
    }
  }

  // let cartTotalArray = [];

  function addToArray(price) {
    const value = parseInt(price);
    let arr = [];
    arr.push(value);
    setCartTotalArray(arr);
    // cartTotalArray.push(value);
  }

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function randomNumber() {
    const item = Math.random() * (4 - 1) + 1;
    return item;
  }

  useEffect(() => {
    const getDiscoutCodes = async () => {
      try {
        axios.get('/api/user/allDiscountCodes').then(async (res) => {
          if (res.status === 200) {
            await setDiscountCodeData(res.data.data);
          } else {
            console.log('Error getting discout codes');
          }
        });
      } catch (error) {
        console.log('Error getting discout codes');
      }
    };

    getDiscoutCodes();
  }, [discountCodeData]);

  function calculateTotal() {
    const sum = cartTotalArray.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setCartTotal(sum);
  }

  useEffect(() => {
    const runCalculateTotal = async () => {
      return await calculateTotal();
    };
    // calculateTotal();
    // runCalculateTotal();
    // if (discountResponse.status === 400 || discountResponse.status === 401)
    //   calculateTotal();
  }, []);

  useEffect(() => {
    const value = randomNumber();
    Object.entries(cart).map(([id]) =>
      CourseData[value]?.id != id ? setRandomItemId(parseInt(value)) : null
    );
  }, [randomItemId]);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserData(session.user);
    }
    if (user?.isLoggedIn === true) {
      setUserData(user?.user);
    }
  }, [session, user]);

  const handleDiscount = async (discountText) => {
    try {
      setDiscountTextValue(discountText);

      if (discountCodeData.length > 0 && discountText !== '') {
        let arrDiscountCodes = [];
        discountCodeData.map((elem) => arrDiscountCodes.push(elem.code));
        if (arrDiscountCodes.includes(discountText)) {
          // get discount code value
          const discountCodeValue = discountCodeData.filter(
            (elem) => elem.code === discountText
          )[0].percent;

          const calculateDiscount = (cartTotal * discountCodeValue) / 100;
          const newCartTotal = cartTotal - calculateDiscount;
          console.log({
            discountText,
            cartTotal,
            discountCodeValue,
            newCartTotal,
          });
          await setCartTotal(newCartTotal);
          setDiscountResponse({ status: 200, message: 'Promo Code Active' });
        } else {
          setDiscountResponse({
            status: 400,
            message: 'Invalid discount code',
          });
        }
      } else {
        console.log('No discount codes available');
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const config = {
    public_key: 'FLWPUBK-fdc034bf5dffb130abbf42c5682d2f40-X',
    tx_ref: Date.now(),
    amount: cartTotal,
    currency: 'UGX',
    payment_options: 'card,mobilemoney',
    customer: {
      email: userData.email,
      name: userData.name,
    },
    customizations: {
      title: 'Course payment',
      description: 'Payment for courses in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
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

    payload = { ...data, courseIdObj };

    if (payload.status === 'successful') {
      await fetch('api/courses/paymentSettlement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Reponse:', data);
          resetCartState();
          router.push('/mycourses');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePesapalPayment = async () => {
    try {
      
      const hostURL = window.location.host;
      const callbackUrl = `${hostURL}/successCoursePaymentCallback`;
      const courseIDS = [];
      Object.keys(cart).map((elem) => courseIDS.push(elem));

      const courseIds = courseIDS.join(', ');

      const payload = {
        courseIDS: courseIds,
        amount: cartTotal,
        currency: 'UGX',
        name: userData.name,
        email: userData.email,
        callbackUrl: callbackUrl,
      };

      console.log({ payload, cart, courseIds });

      // Send payment request to backend API
      await axios
        .post('/api/pesapal/initiateCustomerPayment', payload)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            const redirectURL = res.data.data.redirect_url;
            console.log({ redirectURL });
            setTimeout(() => {
              window.location.href = redirectURL;
            }, 1000);
          } else {
            console.log('Error', res.data);
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    } catch (error) {
      console.log(error);
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
                      Your bag is currently empty, would you like to{' '}
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
                                {numberWithCommas(product.priceUGX) + ' UGX'}
                              </p>
                              <Button
                                className={classes.cartItemRemoveButton}
                                onClick={(oldCart) => {
                                  const copy = { ...cart };
                                  delete copy[product.id];
                                  setCart(copy);
                                  // discountCodeInputRef.current.value = '';
                                  handleDiscount('');
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
                            ) + ' UGX'}
                            {/* {location.location === "UG"
                            ? numberWithCommas(
                                CourseData[randomItemId]?.product_price_ugx
                              ) + "shs"
                            : "£" +
                              CourseData[randomItemId]?.product_price_gbp} */}
                          </p>
                          <Button
                            onClick={() => {
                              setCart({
                                ...cart,
                                [CourseData[randomItemId].id]:
                                  CourseData[randomItemId].name,
                              });
                              // discountCodeInputRef.current.value = '';
                              // setEnteredCode('');
                            }}
                            className={classes.cartItemSuggestedButton}
                          >
                            Add To Cart
                          </Button>
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
                    {numberWithCommas(cartTotal) + ' UGX'}
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
                      // ref={discountCodeInputRef}
                      value={discountTextValue}
                      type="text"
                      placeholder="Enter Promo Code"
                      onChange={(e) => handleDiscount(e.target.value)}
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
                <Button
                  onClick={() => {
                    handlePesapalPayment();
                    // submitPaymentHandler({some: "value"});
                    // handleFlutterPayment({
                    //   callback: (response) => {
                    //     submitPaymentHandler(response);
                    //     closePaymentModal(); // this will close the modal programmatically
                    //   },
                    //   onClose: () => {},
                    // });
                  }}
                  className={classes.checkoutButton}
                >
                  Checkout Now
                </Button>
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

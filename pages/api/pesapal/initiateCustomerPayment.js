const axios = require("axios");
import prisma from "../prisma";
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const {
  PESAPAL_CONSUMER_KEY,
  PESAPAL_CONSUMER_SECRET,
  PESAPAL_REQUEST_TOKEN_URL,
  PESAPAL_IPN_REGISTRATION_URL,
  PESAPAL_GET_IPN_LIST_URL,
  PESAPAL_SUBMIT_ORDER_REQUEST_URL,
} = process.env;

async function initiateCustomerPayment(req, res) {
  try {
    const data = await req.body;

    let referer = "";
    if (data.refererEmail) {
      referer = await prisma.SalesPerson.findFirst({
        where: { email: data.refererEmail },
      });
    }

    let coursesArray = [];

    data.courseIds.split(",").map((item) => {
      coursesArray.push(item);
    });

    const token_payload = {
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET,
    };
    var tokenConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: PESAPAL_REQUEST_TOKEN_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: token_payload,
    };

    const tokenData = await axios(tokenConfig);
    const serverUrl = req.headers.origin;

    var ipnPayload = {
      url: `${serverUrl}/api/pesapal/ipnCallback`,
      ipn_notification_type: "GET",
    };

    var ipnConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: PESAPAL_IPN_REGISTRATION_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.data.token}`,
      },
      data: ipnPayload,
    };

    const ipnData = await axios(ipnConfig);

    const ipnListData = await axios({
      method: "get",
      maxBodyLength: Infinity,
      url: PESAPAL_GET_IPN_LIST_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.data.token}`,
      },
    });

    const uniqueId = uuidv4();

    var customerData = JSON.stringify({
      // id: ipnData.data.id,
      id: uniqueId,
      currency: data.currency,
      amount: data.amount,
      description: data.description,
      callback_url: data.callbackUrl,
      notification_id: ipnData.data.ipn_id,
      billing_address: {
        email_address: data?.email,
        phone_number: null,
        country_code: "",
        first_name: data?.name,
        middle_name: "",
        last_name: "",
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        postal_code: null,
        zip_code: null,
      },
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PESAPAL_SUBMIT_ORDER_REQUEST_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.data.token}`,
      },
      data: customerData,
    };
    const paymentData = await axios(config);

    if (paymentData.status === 200) {
      const payment = await prisma.payment.create({
        data: {
          userId: data.userId,
          currency: data.currency,
          amount: data.amount,
          narrative: data.description,
          discountCode: data.discountCode,
          status: "pending",
          pesapalRedirectURL: paymentData.data.redirect_url,
          pesapalMerchantReference: paymentData.data.merchant_reference,
          pesapalOrderTrackingId: paymentData.data.order_tracking_id,
          courses: data.courses,
          courseIds: data.courseIds,
          salesPersonId: referer? referer.id: null,
        },
      });

      if (payment) {
        return res.send(
          JSON.stringify({
            status: 200,
            data: paymentData.data,
            message: "Payment initiation successful",
          })
        );
      } else {
        return res.send(
          JSON.stringify({
            status: 500,
            error: "Failed to create payment",
            message: "Failed to create payment",
          })
        );
      }
    } else {
      return res.send(
        JSON.stringify({
          status: 500,
          error: "Failed to connect to Pesapal API",
          message: "Payment initation failed",
        })
      );
    }
  } catch (error) {
    console.log({error})
    return res.send(
      JSON.stringify({
        status: 500,
        error: error,
        message: "Payment initiation failed",
      })
    );
  }
}

export default initiateCustomerPayment;

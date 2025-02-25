const axios = require('axios');
const xml2js = require('xml2js');
import prisma from '../prisma';
require('dotenv').config();
const oauthSignature = require('oauth-signature');

const {
  PESAPAL_API_URL,
  PESAPAL_CONSUMER_KEY,
  PESAPAL_CONSUMER_SECRET,
  PESAPAL_SIGNATURE_METHOD,
  PESAPAL_TIMESTAMP,
  PESAPAL_NONCE,
  PESAPAL_VERSION,
  PESAPAL_SIGNATURE,
} = process.env;

//  Function to generate the OAuth signature
const generateSignature = (consumerSecret) => {
  const method = 'POST';
  const url = process.env.PESAPAL_API_URL;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce(); // Implement your function to generate a unique nonce

  const baseString = `${method}&${encodeURIComponent(
    url
  )}&oauth_consumer_key=${encodeURIComponent(
    process.env.PESAPAL_CONSUMER_KEY
  )}&oauth_nonce=${encodeURIComponent(
    nonce
  )}&oauth_signature_method=${encodeURIComponent(
    process.env.PESAPAL_SIGNATURE_METHOD
  )}&oauth_timestamp=${encodeURIComponent(timestamp)}&oauth_version=1.0`;

  const signature = oauthSignature.generate(
    baseString,
    consumerSecret,
    '', // No token secret
    { encodeSignature: false }
  );

  return signature;
};

const generateNonce = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nonceLength = 16; // Length of the nonce string

  let nonce = '';
  for (let i = 0; i < nonceLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }

  return nonce;
};

const extractRedirectUrl = (responseData) => {
  let redirectUrl = '';

  // Parse the XML response data
  xml2js.parseString(responseData, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    // Extract the redirection URL from the parsed XML
    if (result && result.Response && result.Response.RedirectURL) {
      redirectUrl = result.Response.RedirectURL[0];
    }
  });

  return redirectUrl;
};

async function initiatePayment(req, res) {
  try {
    const data = await req.body;
    console.log({
      PESAPAL_API_URL,
      PESAPAL_CONSUMER_KEY,
      PESAPAL_CONSUMER_SECRET,
      PESAPAL_SIGNATURE_METHOD,
      PESAPAL_TIMESTAMP,
      PESAPAL_NONCE,
      PESAPAL_VERSION,
      PESAPAL_SIGNATURE,
    });
    try {
      const xmlPayload = req.body.xmlPayload;
      const apiUrl = process.env.PESAPAL_API_URL;
      const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
      const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
      const signatureMethod = process.env.PESAPAL_SIGNATURE_METHOD;
      const callbackUrl = process.env.PESAPAL_CALLBACK_URL;

      // Generate OAuth signature
      const oauthSignature = generateSignature(consumerSecret);

      // Send payment request to Pesapal API
      const response = await axios.post(apiUrl, xmlPayload, {
        headers: {
          'Content-Type': 'application/xml',
          Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_signature_method="${signatureMethod}", oauth_signature="${oauthSignature}"`,
        },
      });

      // Extract the redirection URL from the response
      const redirectUrl = extractRedirectUrl(response.data);

      console.log({ response: response.data });

      res.status(200).json({ redirectUrl });

      // const orderRef = req.body.orderRef;
      // const amount = req.body.amount;
      // const currency = req.body.currency;
      // const callbackUrl = req.body.callbackUrl;

      // const signature = generateSignature();

      // // Generate XML payload for Pesapal payment request
      // const xmlPayload = `
      //         <PesapalDirectOrderInfo xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      //           <Amount>${amount}</Amount>
      //           <Description>Payment for order ${orderRef}</Description>
      //           <Type>MERCHANT</Type>
      //           <Reference>${orderRef}</Reference>
      //           <PhoneNumber></PhoneNumber>
      //           <Email></Email>
      //           <Currency>${currency}</Currency>
      //           <FirstName></FirstName>
      //           <LastName></LastName>
      //           <LineItems>
      //             <LineItem>
      //               <UniqueId>${orderRef}</UniqueId>
      //               <Particulars>Payment for order ${orderRef}</Particulars>
      //               <Quantity>1</Quantity>
      //               <UnitCost>${amount}</UnitCost>
      //               <SubTotal>${amount}</SubTotal>
      //             </LineItem>
      //           </LineItems>
      //         </PesapalDirectOrderInfo>`;

      // // Send payment request to Pesapal API
      // const response = await axios.post(
      //   'https://www.pesapal.com/API/PostPesapalDirectOrderV4',
      //   xmlPayload,
      //   {
      //     headers: {
      //       'Content-Type': 'application/xml',
      //       Authorization: `OAuth oauth_consumer_key="${PESAPAL_CONSUMER_KEY}", oauth_signature_method="${PESAPAL_SIGNATURE_METHOD}", oauth_timestamp="${PESAPAL_TIMESTAMP}", oauth_nonce="${PESAPAL_NONCE}", oauth_version="${PESAPAL_VERSION}", oauth_signature="${signature}"`,

      //       // Authorization:
      //       //   'OAuth oauth_consumer_key="[YOUR_CONSUMER_KEY]", oauth_signature_method="HMAC-SHA1", oauth_timestamp="[TIMESTAMP]", oauth_nonce="[NONCE]", oauth_version="1.0", oauth_signature="[SIGNATURE]"',
      //     },
      //   }
      // );

      // console.log({ response: response.data });

      // // Extract the redirection URL from the response
      // const xmlResponse = await xml2js.parseStringPromise(response.data);
      // const redirectUrl = xmlResponse.PesapalDirectOrderInfo[0].URL[0];

      // res.json({ redirectUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to initiate payment' });
    }
  } catch (error) {}
}

export default initiatePayment;

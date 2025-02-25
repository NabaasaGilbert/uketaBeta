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

async function authenticate(req, res) {
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
    // const consumerKey = 'YOUR_CONSUMER_KEY';
    // const consumerSecret = 'YOUR_CONSUMER_SECRET';

    const response = await axios.post(
      'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
      {
        consumer_key: PESAPAL_CONSUMER_KEY,
        consumer_secret: PESAPAL_CONSUMER_SECRET,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const { token, expiryDate, error, status, message } = response.data;
    const pesapalResponse = {
        token,
        expiryDate,
        error,
        status,
        message,

    }
    if (error) {
      console.error(`Error: ${status} - ${message}`);
      return;
    }
    res.send(
        JSON.stringify({
          status: 200,
          message: pesapalResponse,
        })
      );

    console.log('Access Token:', token);
    console.log('Expiry Date:', expiryDate);
  } catch (error) {}
}

export default authenticate;

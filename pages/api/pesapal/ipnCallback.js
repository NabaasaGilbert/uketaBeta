const axios = require('axios');
import prisma from '../prisma';

async function ipnCallback(req, res) {
  try {
    const data = await req.body;
    // Handle the callback response here
    console.log('Payment callback received');
    console.log(req.body);

    // Return a response to Pesapal to acknowledge the callback
    res.send('OK');
  } catch (error) {}
}

export default ipnCallback;

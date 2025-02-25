import prisma from '../prisma';
const { URL } = require('url');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

async function resetPassword(req, res) {
  const data = await req.body;

  try {
    console.log(data);

    const userData = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    // Check if user exists
    if (!userData) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: 'User not found with email: ' + data.email,
        })
      );
    }

    // Check if token is valid
    if (userData.passwordResetToken !== data.token) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: 'You are not authorised  to perform this operation. Invalid Token.',
        })
      );
    }

    // Check if token has expired
    const currentDate = new Date();
    if (userData.passwordResetTokenExpiry < currentDate) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: 'You are not authorised  to perform this operation. Token has expired.',
        })
      );
    }

    console.log({ userData });

    if (data.secret === data.confirmSecret) {
      data.secret = await bcrypt.hash(data.secret, 12);
    }

    console.log(data);

    await prisma.user.updateMany({
      where: {
        email: data.email,
      },
      data: {
        secret: data.secret,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        message: 'Password has been updated successfully',
      })
    );
   
  } catch (e) {
    console.log(e);
    res.send(
      JSON.stringify({
        status: 500,
        error: 'In generating token data ' + e,
        data: null,
      })
    );
  }
}

export default resetPassword;

import prisma from '../prisma';
const bcrypt = require('bcrypt');

async function resetPassword(req, res) {
  const data = await req.body;

  try {
    const userData = await prisma.instructor.findFirst({
      where: {
        email: data.email,
      },
    });

    // Check if instructor exists
    if (!userData) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: 'Coach not found with email: ' + data.email,
        })
      );
    }

    console.log({userData: userData.passwordResetToken})
    console.log({token: data.token})

    // Check if token is valid
    if (userData.passwordResetToken !== data.token) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: 'You are not authorised  to perform this operation.',
        })
      );
    }

    // Check if token has expired
    const currentDate = new Date();
    if (userData.passwordResetTokenExpiry < currentDate) {
      return res.send(
        JSON.stringify({
          status: 400,
          message:
            'You are not authorised  to perform this operation. Token has expired.',
        })
      );
    }

    if (data.secret === data.confirmSecret) {
      data.secret = await bcrypt.hash(data.secret, 12);
    }

    await prisma.instructor.updateMany({
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

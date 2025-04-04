import prisma from "../prisma";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
var postmark = require("postmark");

async function generateResetPasswordToken(req, res) {
  const data = await req.body;

  try {
    const userData = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!userData) {
      console.log("User not found");
      res.send(
        JSON.stringify({
          status: 404,
          message: "No User found with email: " + data.email,
        })
      );
      return;
    }

    // Check if a token has been generated within the last hour
    if (
      userData.passwordResetTokenExpiry &&
      new Date() < userData.passwordResetTokenExpiry
    ) {
      // Token has not expired, send a message indicating the time remaining
      const remainingTime = Math.ceil(
        (userData.passwordResetTokenExpiry - new Date()) / (1000 * 60)
      );
      res.send(
        JSON.stringify({
          status: 429,
          message: `A password reset token was generated less than an hour ago. Please wait ${remainingTime} minutes before requesting a new one.`,
        })
      );
      return;
    }

    // const token = await bcrypt.genSalt(10);
    // Generate a random token without a full stop
    const token = crypto.randomBytes(32).toString("hex").replace(/\./g, "");

    // Set the expiration time for the token
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 60); // Expires in 1 hour
    // expiresIn.setHours(expiresIn.getHours() + 12); // Add 12 hours to the current time

    // Save the reset token and expiration in the user table
    await prisma.user.updateMany({
      where: {
        email: data.email,
      },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpiry: expiresIn,
      },
    });

    // Send token and email to the user
    var client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);
    const host = req.headers.origin;

    const resetPasswordLink = `${host}/resetPassword?email=${data.email}&&token=${token}`;
    const message = `Click the following link to reset your password: ${resetPasswordLink}`;

    client.sendEmail({
      From: "admin@uketa.online",
      To: data.email,
      Subject: "UKETA PASSWORD RESET LINK!",
      HtmlBody: `<p> ${message}</p>.`,
      TextBody:
        "If you received this email by mistake please reach out to us at info@uketa.online. This message is valid for 12 hour",
      MessageStream: "outbound",
    });

    return res.send(
      JSON.stringify({
        status: 200,
        message:
          "Please check your email for a password reset link. This may take upto 2 minutes. Remember to check your spam folder if you do not see the email",
      })
    );
  } catch (e) {
    console.log(e);
    res.send(
      JSON.stringify({
        status: 500,
        error: "In generating token data " + e,
        data: null,
      })
    );
  }
}

export default generateResetPasswordToken;

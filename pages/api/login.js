import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
const bcrypt = require("bcrypt");
import prisma from "./prisma";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const data = req.body;

  const userData = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      name: true,
      email: true,
      secret: true,
      role: true,
      gender: true,
      phone: true,
      dateOfBirth:true,
    },
  });

  if (!userData) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "No user found with email: " + data.email,
      })
    );
    return;
  }

  var valid = await bcrypt.compare(data.secret, userData.secret);

  if (!valid) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "Incorrect password entered.",
      })
    );
    return;
  }

  delete userData.secret;
  const user = { isLoggedIn: true, userData };
  req.session.user = user;
  await req.session.save();
  res.send(
    JSON.stringify({
      status: 200,
      user,
      message: "Login Successful.",
    })
  );
}, sessionOptions);

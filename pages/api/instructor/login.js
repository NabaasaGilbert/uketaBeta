import { withIronSessionApiRoute } from "iron-session/next";
// import { sessionOptions } from "../../lib/session";
import { sessionOptions } from "../../../lib/session";
const bcrypt = require("bcrypt");
// import prisma from "./prisma";
import prisma from "../prisma";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const data = req.body;

  //   console.group(data);
  //   res.send("complete");
  const userData = await prisma.instructor.findFirst({
    where: { email: data.email },
    select: {
      id: true,
      instructor: true,
      role:true,
      email: true,
      secret: true,
    },
  });

  if (!userData) {
    res.send(
      JSON.stringify({
        status: 404,
        message: "No Instructor found with email: " + data.email,
      })
    );
    return;
  }

  // const userSecret = await prisma.users.findUnique({
  //   where: { username: data.username },
  //   select: {
  //     secret: true,
  //   },
  // });

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
      message: "Login Successful.",
    })
  );
}, sessionOptions);

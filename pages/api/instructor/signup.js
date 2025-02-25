import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
const bcrypt = require("bcrypt");
// import prisma from "./prisma";
import prisma from "../prisma";

export default withIronSessionApiRoute(async function signupRoute(req, res) {
  const data = req.body;

  // **********************************************************************
  // if (data.secret === data.confirmSecret) {
  //   data.secret = await bcrypt.hash(data.secret, 12);
  // }

  // const userData = await prisma.instructor.create({
  //   data: {
  //     instructor: data.name,
  //     email: data.email,
  //     secret: data.secret,
  //   },
  //   select: {
  //     id: true,
  //     instructor: true,
  //     email: true,
  //   },
  // });

  // const user = { isLoggedIn: true, userData };
  // console.log({"Message": "Saving Coach ..."})
  // req.session.user = user;
  // await req.session.save();

  // return res.send(
  //   JSON.stringify({
  //     status: 200,
  //     message: "Sign-Up Successful.",
  //   })
  // );

  // **********************************************************************

  //   console.group(data);
  //   res.send("complete");

  // const checkUser = await prisma.instructor.findUnique({
  //   where: { email: data.email },
  // });

  const checkUser = await prisma.Instructor.findFirst({
    where: { email: data.email },
  });

  // res.send(
  //   JSON.stringify({
  //     status: 200,
  //     message: "Sign-Up Successful.",
  //   })
  // );

  if (!checkUser) {
    if (data.secret === data.confirmSecret) {
      data.secret = await bcrypt.hash(data.secret, 12);
    }

    const userData = await prisma.Instructor.create({
      data: {
        instructor: data.name,
        email: data.email,
        role: data.role,
        secret: data.secret,
      },
      select: {
        id: true,
        instructor: true,
        email: true,
      },
    });

    // const user = { isLoggedIn: true, userData };
    const user = { isLoggedIn: false, userData };
    // req.session.user = user;
    // await req.session.save();

    res.send(
      JSON.stringify({
        status: 200,
        message: "Sign-Up Successful.",
      })
    );
  } else {
    res.send(
      JSON.stringify({
        status: 400,
        message: "Coach already exists with email: " + data.email,
      })
    );
  }

  // return;

  // const userSecret = await prisma.users.findUnique({
  //   where: { username: data.username },
  //   select: {
  //     secret: true,
  //   },
  // });

  // valid = "";
}, sessionOptions);

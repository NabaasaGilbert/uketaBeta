import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
const bcrypt = require("bcrypt");
import prisma from "./prisma";

export default withIronSessionApiRoute(async function signupRoute(req, res) {
  const data = req.body;

  //   console.group(data);
  //   res.send("complete");
  const checkUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!checkUser) {
    if (data.secret === data.confirmSecret) {
      data.secret = await bcrypt.hash(data.secret, 12);
    }

    // var valid = await bcrypt.compare(data.secret, data.confirmSecret);
    // if (!valid) {
    //   res.send(
    //     JSON.stringify({
    //       status: 404,
    //       message: "Passwords do not match.",
    //     })
    //   );
    //   return;
    // }

    const userData = await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        secret: data.secret,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // console.log(newUser);
    //   delete newUser.secret;
    // const user = { isLoggedIn: true, userData };
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
        message: "User already exists with email: " + data.email,
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

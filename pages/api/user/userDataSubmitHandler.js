import prisma from "../prisma";
const bcrypt = require("bcrypt");

async function submitUserData(req, res) {
  const data = await req.body;
  //   console.log(data);
  if (data.secret === data.confirmSecret) {
    data.secret = await bcrypt.hash(data.secret, 12);
  }

  try {
    // console.log("password: ", data.secret);
    await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        name: data.name,
        secret: data.secret,
      },
    });

    res.send(JSON.stringify({ status: 200, error: null, response: user.id }));
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In create user " + e,
        response: null,
      })
    );
  }
}

export default submitUserData;

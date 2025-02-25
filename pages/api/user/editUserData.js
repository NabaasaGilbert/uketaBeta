import prisma from "../prisma";
const bcrypt = require("bcrypt");

async function editUserData(req, res) {
  const data = await req.body;
  //   console.log(data);

  //   try {
  const userSecret = await prisma.user.findUnique({
    where: { id: data.userId },
    select: {
      secret: true,
      name: true,
    },
  });
  //   console.log(userSecret);
  if (data.oldSecret != "") {
    var valid = await bcrypt.compare(data.oldSecret, userSecret.secret);
    if (!valid) {
      res.send(
        JSON.stringify({
          status: 404,
          response: "Incorrect password entered.",
        })
      );
      return;
    }

    if (data.newSecret === data.re_newSecret) {
      data.newSecret = await bcrypt.hash(data.newSecret, 12);
    }

    const userData = await prisma.user.update({
      where: { id: data.userId },
      data: {
        name: data.name === userSecret.name ? undefined : data.name,
        secret: data.newSecret,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "User data updated successfully.",
      })
    );
  } else {
    const userData = await prisma.user.update({
      where: { id: data.userId },
      data: {
        name: data.name === userSecret.name ? undefined : data.name,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "User data updated successfully.",
      })
    );
  }
  //   } catch (e) {
  //     res.send(
  //       JSON.stringify({
  //         status: 500,
  //         error: "In update user data " + e,
  //         response: "Error updating user info.",
  //       })
  //     );
  //   }
}

export default editUserData;

import prisma from "../prisma";
const bcrypt = require("bcrypt");

async function editUserData(req, res) {
  try {
    const data = await req.body;

    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isoDateTime = new Date(data.dateOfBirth).toISOString();

    const userData = await prisma.user.update({
      where: { id: data.userId },
      data: {
        name: data.name,
        dateOfBirth: isoDateTime,
        phone: data.phone,
        gender: data.gender,
      },
    });

    console.log(userData);

    res.send(
      JSON.stringify({
        status: 200,
        message: userData,
        error: null,
        response: "User data updated successfully.",
      })
    );
  } catch (error) {
    console.log(error)
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update user data " + error,
        response: "Error updating user info.",
      })
    );
  }
}

export default editUserData;

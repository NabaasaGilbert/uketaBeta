import prisma from "../prisma";

async function editUserData(req, res) {
  try {
    const data = await req.body;

    console.log({data})

    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    res.send(
      JSON.stringify({
        status: 200,
        message: userData,
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update user data " + error,
        response: "Error getting user info.",
      })
    );
  }
}

export default editUserData;

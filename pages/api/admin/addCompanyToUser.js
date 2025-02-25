import prisma from "../prisma";

async function addCompanyToUser(req, res) {
  try {
    const data = await req.body;
    const { companyId, email } = data;

    if (!companyId) {
      return res.status(400).json({
        status: 400,
        error: "Company Id is a required field",
        response: "Company Id is a required field",
      });
    }

    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "Email is a required field",
        response: "Email is a required field",
      });
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!userExists) {
      return res.status(404).json({
        status: 404,
        error: "User does not exist",
        response: "User does not exist",
      });
    }

    // Update the user with the companyId
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { companyId },
    });

    return res.status(200).json({
      status: 200,
      error: null,
      response: "Company added to user successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error adding company to user:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal server error",
      response: error.message,
    });
  }
}

export default addCompanyToUser;

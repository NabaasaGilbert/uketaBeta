import prisma from "../prisma";

async function removeCompanyFromUser(req, res) {
  try {
    const data = await req.body;
    const { email, companyId } = data;

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
      select: { id: true, companyId: true },
    });

    if (!userExists) {
      return res.status(404).json({
        status: 404,
        error: "User does not exist",
        response: "User does not exist",
      });
    }

    // Check if the user is already not associated with any company
    if (!userExists.companyId) {
      return res.status(400).json({
        status: 400,
        error: "User is not associated with any company",
        response: "User is not associated with any company",
      });
    }

    // Check if the user is associated with the passed companyId
    if (userExists.companyId !== companyId) {
      return res.status(400).json({
        status: 400,
        error: "User is not associated with the specified company",
        response: "User is not associated with the specified company",
      });
    }

    // Remove the companyId from the user
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { companyId: null }, // Set companyId to null
    });

    return res.status(200).json({
      status: 200,
      error: null,
      response: "Company removed from user successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error removing company from user:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal server error",
      response: error.message,
    });
  }
}

export default removeCompanyFromUser;

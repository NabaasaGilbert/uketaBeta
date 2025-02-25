import prisma from "../prisma";

async function updateInstructorSignature(req, res) {
  const data = await req.body;

  try {

    const userData = await prisma.instructor.findFirst({
      where: { id: data.id },
    });

    // Check if instructor exists
    if (!userData) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: "Coach not found with email: " + data.email,
        })
      );
    }

    await prisma.instructor.update({
      where: {
        id: data.id,
      },
      data: {
        signature: data.signature,
      },
    });   

    return res.send(
      JSON.stringify({
        status: 200,
        data: userData,
        message: "Signature has been updated successfully",
      })
    );
  } catch (e) {
    console.log({e});
    res.send(
      JSON.stringify({
        status: 500,
        error: "In generating token data " + e,
        data: null,
      })
    );
  }
}

export default updateInstructorSignature;

import prisma from "../prisma";

async function activateInstructor(req, res) {
  try {
    const data = await req.body;

    const checkExistance = await prisma.instructor.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!checkExistance) {
      return res.send(
        JSON.stringify({
          status: 404,
          error: "Instructor not found",
        })
      );
    }

    const instructor = await prisma.instructor.update({
      where: {
        id: data.id,
      },
      data: {
        isActivated: true,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        message: "Instructor activated successfully.",
        error: null,
        response: instructor,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update instructor " + e,
        response: "Error updating instructor.",
      })
    );
  }
}

export default activateInstructor;

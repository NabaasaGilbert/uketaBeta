import prisma from "../prisma";

async function getInstructor(req, res) {
  try {
    const queryKeys = Object.keys(req.query);
    const id = queryKeys[0];

    const instructorData = await prisma.instructor.findUnique({
      where: {
        id: id,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        data: instructorData,
        // modules: moduleData,
        // instructor: instructorData,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In get data " + e,
        data: null,
      })
    );
  }
}

export default getInstructor;

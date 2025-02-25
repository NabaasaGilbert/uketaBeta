import prisma from "../prisma";

async function getActivatedInstructors(req, res) {
  try {

    const instructors = await prisma.instructor.findMany({
      where: {
        isActivated: true,
      },
    });
    
    res.send(
      JSON.stringify({
        status: 200,
        data: instructors,
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

export default getActivatedInstructors;

import prisma from "../prisma";

async function getMyCourse(req, res) {
  try {
    const queryKeys = Object.keys(req.query);
    const course = queryKeys[0];

    const courseData = await prisma.course.findUnique({
      where: {
        id: course,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        data: courseData,
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

export default getMyCourse;

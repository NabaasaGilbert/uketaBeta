import prisma from "../prisma";

async function getMyCourses(req, res) {
  try {
    const queryKeys = Object.keys(req.query);
    const instructor = queryKeys[0];

    const courseData = await prisma.course.findMany({
      where: {
        tutor: instructor,
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

export default getMyCourses;

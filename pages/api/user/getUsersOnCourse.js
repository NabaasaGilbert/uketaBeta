import prisma from "../prisma";

async function getUsersOnCourse(req, res) {
  try {
   
    const queryKeys = Object.keys(req.query);
    const id = queryKeys[0];

    const userCourses = await prisma.CoursesOnUser.findMany({
      where: {
        courseId: id,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        data: userCourses,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update user " + e,
        response: null,
      })
    );
  }
}

export default getUsersOnCourse;

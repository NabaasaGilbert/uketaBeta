import prisma from "../prisma";

async function fetchUserCourses(req, res) {
  const data = await req.body;
  let result = data.includes("@");
  try {
    if (result === false) {
      const userCourses = await prisma.CoursesOnUser.findMany({
        where: {
          userId: data,
        },
        select: {
          courseId: true,
        },
      });

      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          data: userCourses,
        })
      );
    }

    if (result === true) {
      const userData = await prisma.user.findUnique({
        where: { email: data },
        select: {
          id: true,
        },
      });

      const userEmailCourses = await prisma.CoursesOnUser.findMany({
        where: {
          userId: userData.id,
        },
        select: {
          courseId: true,
        },
      });
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          data: userEmailCourses,
        })
      );
    }
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

export default fetchUserCourses;

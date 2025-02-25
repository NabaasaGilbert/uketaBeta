import prisma from "../prisma";

async function removeCourseFromUser(req, res) {
  const data = await req.body;

  const userId = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
    },
  });

  try {
    const recordId = await prisma.CoursesOnUser.findMany({
      where: {
        userId: userId.id,
        courseId: data.courseId,
      },
      select: { id: true },
    });

    //   console.log(recordId[0].id);

    if (!recordId[0].id) {
      res.send(
        JSON.stringify({
          status: 400,
          error: null,
          response: "Enrollment not found.",
        })
      );
    }
    const response = await prisma.CoursesOnUser.delete({
      where: {
        id: recordId[0].id,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Course unenrolled successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update user " + e,
        response: "Error unenrolling course from user: " + data.email,
      })
    );
  }
}

export default removeCourseFromUser;

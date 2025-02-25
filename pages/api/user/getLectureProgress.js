import prisma from "../prisma";

async function getLectureProgress(req, res) {
  try {
    const data = await req.body;
    const courseId = data.courseId

    if (!courseId) {
      return res.status(400).json({
        status: 400,
        error: "Course ID is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.userEmail,
      },
      select: { id: true },
    });

    if (!user) {
      return res.send(
        JSON.stringify({
          status: 404,
          error: "User not found",
        })
      );
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    }); 

    if (!course) {
      return res.send(
        JSON.stringify({
          status: 404,
          error: "Course not found",
        })
      );
    }

    const lecturesInProgress = await prisma.lectureProgress.findMany({
      where: {
        courseId: courseId,
        userId: user.id,
      },
    });

    return res.status(200).send(
      JSON.stringify({
        status: 200,
        error: null,
        data: lecturesInProgress,
      })
    );
  } catch (error) {

    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}

export default getLectureProgress;

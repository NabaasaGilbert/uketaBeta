import prisma from "../prisma";

async function getCoursesProgressData(req, res) {
  const instructorId = req.body.instructorId;

  const coursesProgress = await prisma.courseProgress.findMany({
    where: {
      Course: {
        Instructor: {
          id: instructorId,
        },
      },
    },
    include: {
      Course: {
        include: {
          Instructor: true, // To include the related Instructor data inside the Course
        },
      }, // To include the related Course data
      User: true, // To include the related User data
    },
  });

  res.send(
    JSON.stringify({
      status: 200,
      error: null,
      data: coursesProgress,
    })
  );
}

export default getCoursesProgressData;

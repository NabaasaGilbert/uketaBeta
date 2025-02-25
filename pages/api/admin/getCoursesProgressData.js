import prisma from "../prisma";

async function getCoursesProgressData(req, res) {
  const coursesProgress = await prisma.courseProgress.findMany({
    include: {
      Course: {
        include: {
          Instructor: true, // To include the related Instructor data inside the Course
          Review: true, // To include Review data for each Course
          Feedback: true, // To include Feedback data for each Course
        },
      }, // To include the related Course data
      User: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc", // Order by dateTime in descending order
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

import prisma from "../prisma";

async function getCompletedCourses(req, res) {
  const data = await req.body;

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

  const courses = await prisma.courseProgress.findMany({
    where: { userId: user.id },
    include: {
      Course: {
        include: {
          Instructor: true, // To include the related Instructor data inside the Course
        },
      }, // To include the related Course data
      User: true,   // To include the related User data
    },
  });

  // Filter the courses to include only objects where 'progress' is equal to 'duration'
  const coursesCompleted = courses.filter(
    (item) => item.progress === item.duration
  );

  res.send(
    JSON.stringify({
      status: 200,
      error: null,
      data: coursesCompleted,
    })
  );
}

export default getCompletedCourses;

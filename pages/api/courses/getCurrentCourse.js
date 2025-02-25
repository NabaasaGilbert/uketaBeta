import prisma from "../prisma";

async function fetchCourse(req, res) {
  const data = await req.body;

  try {
    const courseData = await prisma.course.findUnique({
      where: {
        id: data,
      },
      include: {
        Lecture: {
          include: {
            Quiz: true
          }
        }
      },
    });
    const moduleData = await prisma.lecture.findMany({
      where: {
        courseId: data,
      },
    });
    //   if (courseData) {
    const instructorData = await prisma.instructor.findUnique({
      where: {
        id: courseData.tutor,
      },
    });
    //     return instructorData;
    //   }

    res.send(
      JSON.stringify({
        status: 200,
        data: courseData,
        modules: moduleData,
        instructor: instructorData,
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

export default fetchCourse;

import prisma from "../prisma";

async function fetchCourse(req, res) {
  const data = await req.body;
  try {
    const courseData = await prisma.Course.findUnique({
      where: {
        id: data.id,
      },
      include: {
        Lecture: {
          include: {
            Quiz: true
          }
        }
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        data: courseData,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "Error fetching data " + e,
        e,
        data: null,
      })
    );
  }
}

export default fetchCourse;

import prisma from "../prisma";

async function courseDeleteHandler(req, res) {
  const data = await req.body;
  //   console.log(data);

  try {
    const deleteCourseResponse = await prisma.course.delete({
      where: {
        id: data,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Course Deleted Successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In deleting course." + e,
        response: "Error deleting course.",
      })
    );
  }
}

export default courseDeleteHandler;

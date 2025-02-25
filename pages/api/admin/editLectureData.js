import prisma from "../prisma";

async function editLectureData(req, res) {
  const data = await req.body;
  //   console.log(data);

  try {
    const editLectureResponse = await prisma.lecture.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        // activity: data.activity,
        description: data.description,
        videoUrl: data.videoUrl,
        // courseId: data.courseId,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Lecture updated successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update lecture " + e,
        response: "Error updating lecture.",
      })
    );
  }
}

export default editLectureData;

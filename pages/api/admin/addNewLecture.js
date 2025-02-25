import prisma from "../prisma";

async function addNewLecture(req, res) {
  const data = await req.body;
    // console.log(data);

  try {
    const newLectureResponse = await prisma.lecture.create({
      data: {
        title: data.title,
        activity: data.activity,
        description: data.description,
        videoUrl: data.videoUrl,
        courseId: data.courseId,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Lecture added successfully.",
      })
    );
  } catch (e) {
    console.log(e)
    res.send(
      JSON.stringify({
        status: 500,
        error: "In create lecture " + e,
        response: "Error creating new lecture.",
      })
    );
  }
}

export default addNewLecture;

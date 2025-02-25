import prisma from "../prisma";

async function lectureDeleteHandler(req, res) {
  const data = await req.body;
  console.log(data);

  try {
    const lecture = await prisma.lecture.findUnique({ where: { id: data }, 
      include: { LectureProgress: true }, // Include related LectureProgress
     });

    if (!lecture) {
      return { status: 404, error: "Lecture not found" };
    }

    const lectureProgress = await prisma.lectureProgress.findMany({
      where: { lectureId: data },
      
    });

    console.log("Deleting in progress");

    // Delete the LectureProgress objects
    // await Promise.all(
    //   lectureProgress.map((progress) =>
    //     prisma.lectureProgress.delete({ where: { lectureId: progress.id } })
    //   )
    // );

    console.log({lectureProgress: lecture.LectureProgress });

    // await prisma.lectureProgress.deleteMany({
    //   where: {
    //     lectureId: data
    //   }
    // })

    // Delete the Lecture object
    await prisma.lecture.delete({ where: { id: data } });

    console.log("Completed deleting content");

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Lecture Deleted Successfully.",
      })
    );
  } catch (e) {
    console.log({ e });
    res.send(
      JSON.stringify({
        status: 500,
        error: "In deleting lecture." + e,
        response: "Error deleting lecture.",
      })
    );
  }
}

export default lectureDeleteHandler;

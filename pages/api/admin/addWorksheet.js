import prisma from "../prisma";

async function addNewWorksheet(req, res) {
  const data = await req.body;
    console.log(data);

  try {
    const lecture = await prisma.lecture.findUnique({
      where: {
        id: data.lectureId,
      },
      select: { title: true },
    });

    // Check if lecture exists
    if(!lecture){
      return res.send(
        JSON.stringify({
          status: 400,
          error: "Lecture not found",
          response: null,
        })
      );
    }

    // Check if worksheet already exists
    const checkExistance = await prisma.quiz.findUnique({
      where: {
        lectureId: data.lectureId,
      },
      select: { id: true },
    });

    // If worksheet exists, update it
    console.log(checkExistance)

    if (checkExistance || checkExistance !== null) {
      const updateQuiz = await prisma.quiz.update({
        where: { id: checkExistance.id },
        data: { file: data.file },
      });

      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: "Worksheet updated successfully.",
        })
      );
    } else {
      // if(checkExistance)
      const newWorksheetResponse = await prisma.quiz.create({
        data: {
          title: lecture.title,
          file: data.file,
          lectureId: data.lectureId,
        },
      });

      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: "Worksheet added successfully.",
        })
      );
    }
  } catch (e) {
    console.log(e)
    res.send(
      JSON.stringify({
        status: 500,
        error: "In create worksheet " + e,
        response: "Error creating new worksheet.",
      })
    );
  }
}

export default addNewWorksheet;

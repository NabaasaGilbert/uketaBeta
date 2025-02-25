import prisma from "../prisma";

async function fetchQuiz(req, res) {
  const data = await req.body;
  //   console.log(data);
  try {
    const quizData = await prisma.quiz.findUnique({
      where: {
        lectureId: data,
      },
      select: {
        file: true,
      },
    });
    if (quizData === null) {
      res.send(
        JSON.stringify({
          status: 400,
          error: "Quiz not found",
          data: null,
        })
      );
    } else {
      // console.log(quizData.file);
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          data: quizData.file,
        })
      );
    }
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In get quiz data " + e,
        data: null,
      })
    );
  }
}

export default fetchQuiz;

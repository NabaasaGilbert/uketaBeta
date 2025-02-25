import prisma from "../prisma";

async function fetchLectureData(req, res) {
  const data = await req.body;
  //   console.log(data);
  // try {
  const lectureData = await prisma.lecture.findMany({
    where: {
      courseId: data,
    },
  });
  // if (quizData === null) {
  //   res.send(
  //     JSON.stringify({
  //       status: 400,
  //       error: "Quiz not found",
  //       data: null,
  //     })
  //   );
  // } else {
  //   // console.log(quizData.file);
  res.send(
    JSON.stringify({
      status: 200,
      error: null,
      data: lectureData,
    })
  );
  // }
  //   } catch (e) {
  //     res.send(
  //       JSON.stringify({
  //         status: 500,
  //         error: "In get quiz data " + e,
  //         data: null,
  //       })
  //     );
  //   }
}

export default fetchLectureData;

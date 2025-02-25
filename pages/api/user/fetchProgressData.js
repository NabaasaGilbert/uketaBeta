import prisma from "../prisma";

async function fetchProgressData(req, res) {
  const data = await req.body;
  // console.log(data);
  //   try {
  const user = await prisma.user.findUnique({
    where: {
      email: data,
    },
    select: {
      id: true,
    },
  });
  const progressData = await prisma.courseProgress.findMany({
    where: {
      userId: user.id,
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
  // console.log(progressData);
  res.send(
    JSON.stringify({
      status: 200,
      error: null,
      data: progressData,
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

export default fetchProgressData;

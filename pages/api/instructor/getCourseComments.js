import prisma from "../prisma";

async function fetchComments(req, res) {
  const data = await req.body;
  const queryKeys = Object.keys(req.query);
    const courseId = queryKeys[0];

  try {
    const commentData = await prisma.comment.findMany({
      where: {
        courseId: courseId,
        status: "Approved",
      },
    });
    //     return instructorData;
    //   }

    res.send(
      JSON.stringify({
        status: 200,
        data: commentData,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In get comments " + e,
        data: null,
      })
    );
  }
}

export default fetchComments;

import prisma from "../prisma";

async function fetchComments(req, res) {
  const data = await req.body;

  try {
    const commentData = await prisma.comment.findMany({
      where: {
        courseId: data,
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

import prisma from "../prisma";

async function commentStatusHandler(req, res) {
  const data = await req.body;
  //   console.log(data);

  try {
    const editCommentResponse = await prisma.comment.update({
      where: {
        id: data.commentId,
      },
      data: {
        status: data.status,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Comment " + data.status + " Successfully",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update comment status " + e,
        response: "Error updating comment status.",
      })
    );
  }
}

export default commentStatusHandler;

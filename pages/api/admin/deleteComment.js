import prisma from "../prisma";

async function commentDeleteHandler(req, res) {
  const data = await req.body;
  //   console.log(data);

  try {
    const deleteCommentResponse = await prisma.comment.delete({
      where: {
        id: data,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Comment Deleted Successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In deleting comment." + e,
        response: "Error deleting comment.",
      })
    );
  }
}

export default commentDeleteHandler;

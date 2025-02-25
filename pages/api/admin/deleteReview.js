import prisma from "../prisma";

async function deleteReview(req, res) {
  try {
    const data = await req.body;
    const deleteReview = await prisma.review.delete({
      where: {
        id: data.id,
      }
    });

    res.send(
      JSON.stringify({
        status: 200,
        data: deleteReview,
        message: "Review has been Deleted",
      })
    );
  } catch (e) {
    console.log(e);
    return res.send(
      JSON.stringify({
        status: 500,
        error: "In get data " + e,
        data: null,
      })
    );
  }
}

export default deleteReview;

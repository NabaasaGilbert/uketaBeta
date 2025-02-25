import prisma from "../prisma";

async function unPublishReview(req, res) {
  try {
    const data = await req.body;
    const editReview = await prisma.review.update({
      where: {
        id: data.id,
      },
      data: {
        isPublished: false,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        data: editReview,
        message: "Review is UnPublished",
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

export default unPublishReview;

import prisma from "../prisma";

async function getUserCourseReview(req, res) {
  const data = req.body;

  try {  
    const review = await prisma.review.findMany({
      where: {
        courseId: data.course,
        userId: data.user,
      },
    });

    if (review.length < 1) {
      return res.send(
        JSON.stringify({
          status: 500,
          error: null,
          response: "Review not found.",
        })
      );
    }

    res.send(
      JSON.stringify({
        status: 200,
        data: review,
      })
    );
  } catch (e) {
    console.log(e)
    return res.send(
      JSON.stringify({
        status: 500,
        error: "In get data " + e,
        data: null,
      })
    );
  }
}

export default getUserCourseReview;

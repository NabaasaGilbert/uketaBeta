import prisma from "../prisma";

async function getUserCourseReview(req, res) {
  const data = await req.body;

  try {
    // Check if a review with the same courseId and userId already exists
    const review = await prisma.review.findFirst({
      where: {
        courseId: data.courseId,
        userId: data.userId,
      },
    });

    if (!review) {
      return res.send(
        JSON.stringify({
          status: 500,
          error: null,
          message: null,
          response: "Review not found.",
        })
      );
    }

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        message: review,
        response: review,
      })
    );
  } catch (e) {
    return res.send(
      JSON.stringify({
        status: 500,
        error: "In getting review " + e,
        response: "Error getting review.",
      })
    );
  }
}

export default getUserCourseReview;

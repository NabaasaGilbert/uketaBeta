import prisma from "../prisma";

async function addNewReview(req, res) {
  const data = await req.body;

  try {

    // Check if a review with the same courseId and userId already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        courseId: data.course,
        userId: data.user,
      },
    });

    if (existingReview) {
      return res.send(
        JSON.stringify({
          status: 500,
          error: null,
          response: "Review for this course and user already exists.",
        })
      );
    }

    const newReview = await prisma.review.create({
      data: {
        review: data.review,
        courseId: data.course,
        rating: data.rating,
        userId: data.user,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Review added successfully.",
      })
    );
  } catch (e) {
    return res.send(
      JSON.stringify({
        status: 500,
        error: "In create review " + e,
        response: "Error creating new review.",
      })
    );
  }
}

export default addNewReview;

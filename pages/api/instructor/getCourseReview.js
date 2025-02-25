import prisma from "../prisma";

async function getCourseReview(req, res) {
//   const data = req.body;

  try {  
    const queryKeys = Object.keys(req.query);
    const id = queryKeys[0];

    const reviews = await prisma.review.findMany({
      where: {
        courseId: id,
      },
      include: {
        User: true, // This includes the user information
      },
    });    

    res.send(
      JSON.stringify({
        status: 200,
        data: reviews,
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

export default getCourseReview;

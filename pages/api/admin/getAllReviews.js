import prisma from "../prisma";

async function getAllReviews(req, res) {

  try {  

    const reviews = await prisma.review.findMany({      
      include: {
        User: true, // This includes the user information
        Course: {
            include: {
              Instructor: true, // Include the instructor information nested inside the course
            },
          },
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

export default getAllReviews;

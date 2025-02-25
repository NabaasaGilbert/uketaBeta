import prisma from "../prisma";

async function addNewCoach(req, res) {
  const data = await req.body;

  try {
    const newCoachResponse = await prisma.instructor.create({
      data: {
        instructor: data.instructor,
        image: data.image,
        shortDesc: data.shortDesc,
        desc: data.longDesc,
        rating: data.rating,
        reviews: data.reviews,
        students: data.students,
        courses: data.courses,
        website: data.website,
        youtube: data.youtube,
        linkedin: data.linkedin,
      },
    });

    //     //   console.log(response);

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Coach added successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In create coach " + e,
        response: "Error creating new coach.",
      })
    );
  }
}

export default addNewCoach;

import prisma from "../prisma";

async function editCoach(req, res) {
  const data = await req.body;
  //   console.log(data);
  try {
    const editCoachResponse = await prisma.instructor.update({
      where: {
        id: data.id,
      },
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
        response: "Coach updated successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update coach " + e,
        response: "Error updating coach.",
      })
    );
  }
}

export default editCoach;

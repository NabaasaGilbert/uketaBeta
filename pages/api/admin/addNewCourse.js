import prisma from "../prisma";

async function addNewCourse(req, res) {
  const data = await req.body;

  try {
    const newCourseResponse = await prisma.course.create({
      data: {
        name: data.name,
        image: data.image,
        shortDesc: data.shortDesc,
        longDesc: data.longDesc,
        rating: data.rating,
        ratingCount: data.ratingCount,
        studentCount: data.studentCount,
        updateDate: data.updateDate,
        introduction: data.introduction,
        moduleCount: data.moduleCount,
        priceUGX: data.priceUGX,
        priceUSD: data.priceUSD,
        tutor: data.tutor,
      },
    });

    //     //   console.log(response);

    res.send(
      JSON.stringify({
        status: 200,
        data: newCourseResponse,
        error: null,
        response: "Course added successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In create course " + e,
        response: "Error creating new course.",
      })
    );
  }
}

export default addNewCourse;

import prisma from "../prisma";

async function editCourse(req, res) {
  const data = await req.body;
  //   console.log(data);
  try {
    const editCourseResponse = await prisma.course.update({
      where: {
        id: data.id,
      },
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
        priceUGX: parseInt(data.priceUGX),
        priceUSD: parseInt(data.priceUSD),
        tutor: data.tutor,
      },
    });

    //     //   console.log(response);

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Course updated successfully.",
      })
    );
  } catch (e) {
    console.log(e)
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update course " + e,
        response: "Error updating course.",
      })
    );
  }
}

export default editCourse;

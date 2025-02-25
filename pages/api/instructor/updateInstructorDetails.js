import prisma from "../prisma";

async function updateInstructorDetails(req, res) {
  const data = await req.body;

  try {
    console.log(data);

    const userData = await prisma.instructor.findFirst({
      where: {
        email: data.email,
        id: data.id,
      },
    });

    // Check if instructor exists
    if (!userData) {
      return res.send(
        JSON.stringify({
          status: 400,
          message: "Coach not found with email: " + data.email,
        })
      );
    }

    await prisma.instructor.updateMany({
      where: {
        email: data.email,
      },
      data: {
        desc: data.desc,
        website:data.website,
        linkedin:data.linkedin,
        instructor:data.instructor,
        shortDesc: data.shortDesc,
        youtube:data.youtube
      },
    });

    const user = await prisma.instructor.findFirst({
      where: {
        email: data.email,
        id: data.id,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        data: user,
        message: "Image has been updated successfully",
      })
    );
  } catch (e) {
    console.log(e);
    res.send(
      JSON.stringify({
        status: 500,
        error: "In generating token data " + e,
        data: null,
      })
    );
  }
}

export default updateInstructorDetails;

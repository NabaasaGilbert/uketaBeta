import prisma from "../prisma";

async function addCourseToUser(req, res) {
  const data = await req.body;

  const userId = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
    },
  });

  // console.log({ userId: userId.id, courseId: data.courseId });

  const checkExistance = await prisma.coursesOnUser.findMany({
    where: {
      userId: userId.id,
      courseId: data.courseId,
    },
  });

  // console.log(checkExistance);

  if (checkExistance.length >= 1) {
    // console.log("Found");
    res.send(
      JSON.stringify({
        status: 501,
        error: null,
        response: "User already enrolled!",
      })
    );
  } else {
    try {
      console.log({userId}, userId.id);

      const createdRecord = await prisma.coursesOnUser.create({
        data: {
          userId: userId.id,
          courseId: data.courseId,
        },
      });

      // const response = await prisma.coursesOnUser.create({
      //   data: {
      //     users: {
      //       connect: {
      //         email: data.email,
      //       },
      //     },
      //     courses: {
      //       connect: {
      //         id: data.courseId,
      //       },
      //     },
      //   },
      // });

      //   console.log(response);

      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          message:createdRecord ,
          response: "Course enrolled successfully.",
        })
      );
    } catch (e) {
      console.log({ e });

      res.send(
        JSON.stringify({
          status: 500,
          error: "In update user " + e,
          response: "Error assigning course to user: " + data.email,
        })
      );
    }
  }
}

export default addCourseToUser;

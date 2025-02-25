import prisma from "../prisma";

async function getFeedbackByUserCourse(req, res) {
  const data = req.body;
  try {
    const feedback = await prisma.feedback.findFirst({
      where: {
        studentId: data.userId,
        courseId: data.courseId,
      },
      include: {
        User: true,
        Course: true,
      },
    });

    return res.send(feedback);
  } catch (error) {
    console.log(error);
  }
}

export default getFeedbackByUserCourse;

import prisma from "../prisma";

async function getFeedbackByUser(req, res) {
  const data = req.body;
  try {
    const feedback = await prisma.feedback.findMany({
      where: {
        studentId: data.studentId,
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

export default getFeedbackByUser;

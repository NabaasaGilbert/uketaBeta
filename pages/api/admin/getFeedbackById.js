import prisma from "../prisma";

async function getFeedbackById(req, res) {
  const data = req.body;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: data.feedbackId,
      },
      include: {
        User: true,
        Course: true,
      },
    });

    return res.status(200).send(feedback);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}

export default getFeedbackById;

import prisma from "../prisma";

async function getAllFeedback(req, res) {
  try {
    const data = await prisma.feedback.findMany({
      include: {
          User: true,
          Course: true,
        },
    });

    return res.send(data);
  } catch (error) {
    console.log(error);
  }
}

export default getAllFeedback;

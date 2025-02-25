import prisma from "../prisma";

async function deleteFeedbackById(req, res) {
    
  const data = req.body;

  try {
    // Check if feedback exists
      const existingFeedback = await prisma.feedback.findUnique({
        where: {
          id: data.feedbackId,
        },
      });

      if (!existingFeedback) {
        return res.status(404).send("Feedback not found");
      }

    // Delete feedback
      await prisma.feedback.delete({
        where: {
          id: data.feedbackId,
        },
      });

    return res.status(200).send("Feedback deleted successfully");
  } catch (error) {
    console.log({error});
    res.status(500).send("Internal Server Error");
  }
}

export default deleteFeedbackById;
import prisma from '../prisma';

async function addFeedback(req, res) {
  try {
    const data = await req.body;

    const feedbackExists = await prisma.feedback.findFirst({
      where: {
        studentId: data.student,
        courseId: data.course,
      },
      include: {
        User: true,
        Course: true,
      },
    });

    if(feedbackExists){
      return res.send(
        JSON.stringify({
          status: 400,
          error: 'Feedback already exists.',
          response:null ,
        })
      );

    }

    console.log({
      satisfactionRating: parseInt(data.satisfactionRating),
      platformAccessibilityRating: parseInt(data.platformAccessibilityRating),
      courseMaterialEngagement: parseInt(data.courseMaterialEngagement),
      coachRating: data.coachRating,
      worksheetsHelpfulRating: parseInt(data.worksheetsHelpfulRating),
      courseApplicability: parseInt(data.courseApplicability),
      courseAffordability: parseInt(data.courseAffordability),
      recommendToFriend: data.recommendToFriend,
      feedbackComment: data.feedbackComment,
      studentId: data.student,
      courseId: data.course,
      isPublished: true,
    });

    await prisma.feedback.create({
      data: {
        satisfactionRating: parseInt(data.satisfactionRating),
        platformAccessibilityRating: parseInt(data.platformAccessibilityRating),
        courseMaterialEngagement: parseInt(data.courseMaterialEngagement),
        coachRating: data.coachRating,
        worksheetsHelpfulRating: parseInt(data.worksheetsHelpfulRating),
        courseApplicability: parseInt(data.courseApplicability),
        courseAffordability: parseInt(data.courseAffordability),
        recommendToFriend: data.recommendToFriend,
        feedbackComment: data.feedbackComment,
        studentId: data.student,
        courseId: data.course,
        isPublished: true,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: 'Feedback added successfully.',
      })
    );
  } catch (error) {
    return res.send(
      JSON.stringify({
        status: 500,
        error,
        message: 'Error creating feedback.',
      })
    );
  }
}

export default addFeedback;

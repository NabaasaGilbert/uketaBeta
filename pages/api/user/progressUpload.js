import prisma from "../prisma";
var postmark = require("postmark");

async function addProgressData(req, res) {
  try {
    const data = await req.body;
    var client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

    const user = await prisma.user.findUnique({
      where: {
        email: data.userEmail,
      },
      select: { id: true },
    });

    const userDetails = await prisma.user.findUnique({
      where: {
        email: data.userEmail,
      },
    });

    const checkExistance = await prisma.lectureProgress.findMany({
      where: {
        lectureId: data.lectureId,
        userId: user.id,
      },
    });

    const course = await prisma.lecture.findUnique({
      where: {
        id: data.lectureId,
      },
      select: { courseId: true },
    });    

    const courseDetails = await prisma.lecture.findUnique({
      where: {
        id: data.lectureId,
      },
      select: { Course: true },
    });

    if (checkExistance.length >= 1) {
      if (data.progress >= checkExistance[0].progress) {
        // update lecture  progress instance
        await prisma.lectureProgress.update({
          where: { id: checkExistance[0].id },
          data: { progress: data.progress.toString() },
        });
      }
    } else {
      // create new lecture  progress instance
      await prisma.lectureProgress.create({
        data: {
          User: {
            connect: {
              email: data.userEmail,
            },
          },
          Lecture: {
            connect: {
              id: data.lectureId,
            },
          },
          Course: {
            connect: {
              id: course.courseId,
            },
          },
          progress: data.progress.toString(),
          duration: data.duration.toString(),
        },
      });
    }

    if (data.progress === "Completed") {
      const checkCourseExistance = await prisma.courseProgress.findMany({
        where: {
          courseId: course.courseId,
          userId: user.id,
        },
        select: { id: true, progress: true, duration: true },
      });

      if (checkCourseExistance.length >= 1) {
        const completedLectureCount = await prisma.lectureProgress.count({
          where: {
            courseId: course.courseId,
            userId: user.id,
            progress: "Completed",
          },
        });

        await prisma.courseProgress.update({
          where: { id: checkCourseExistance[0].id },
          data: {
            progress: completedLectureCount.toString(),
          },
        });

        const lectureCount = await prisma.lecture.count({
          where: {
            courseId: course.courseId,
          },
        });

        // Send Email if with Google form link if Student has completed all modules
        if (lectureCount === completedLectureCount) {
          const emailSubject = `🎊🥳Thank You and Congratulations for Completing Your UKETA Learning Course🎊🥳`;

          const HtmlBody =
            '<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">' +
            '<p style="font-size: 18px; font-weight: bold;">Dear ' +
            userDetails?.name +
            " ,</p>" +
            "<p>We hope this email finds you well. We noticed that you have completed the <strong>" +
            courseDetails?.Course?.name +
            "</strong> on UKETA Learning.</p>" +
            '<p>Please take some time to fill out our survey <a href="https://forms.gle/AK137CY3WC5aUW3M8">Link</a>.</p>' +
            "<p>Thank you for choosing UKETA Learning.</p> <br />" +
            "<p>Best regards,</p>" +
            '<p style="font-weight: bold;">Rhea </p>' +
            '<p style="font-weight: bold;">Customer Support Team</p>' +
            '<p style="font-weight: bold;">UKETA Learning</p>' +
            '<a style="font-weight: bold;" href="www.uketalearning.com">www.uketalearning.com</a></div>';

          const response = await client.sendEmail({
            From: `admin@uketa.online`,
            To: `${userDetails?.email}`,
            Subject: `${emailSubject}`,
            HtmlBody: `${HtmlBody}`,
            MessageStream: "outbound",
          });
          console.log(response);
          console.log(
            `Email sent to  ${userDetails.name} ${userDetails.email} for ${courseDetails.Course.name} course.`
          );
          return res.status(200).json({
            status: 200,
            error: null,
            response: "Course completion email sent.",
            showGoogleFormModal: true,
            showReviewModal: true,
          });
        }
      } else {
        const lectureCount = await prisma.lecture.count({
          where: {
            courseId: course.courseId,
          },
        });

        const newProgress = await prisma.courseProgress.create({
          data: {
            User: {
              connect: {
                email: data.userEmail,
              },
            },
            Course: {
              connect: {
                id: course.courseId,
              },
            },
            // Lecture: {
            //   connect: {
            //     id: data.lectureId,
            //   },
            // },
            progress: "1",
            duration: lectureCount.toString(),
          },
        });

        return res.status(200).json({
          status: 200,
          error: null,
          response: "Course progress recorded.",
          message: newProgress,
          showGoogleFormModal: false,
          showReviewModal: false,
        });
      }
    }

    return res.status(200).json({
      status: 200,
      error: null,
      response: "Course progress recorded.",
      showGoogleFormModal: false,
      showReviewModal: false,
    });
  } catch (error) {
    console.error("Error in addProgressData:", error);

    // Send an error response if an exception occurs
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      response: null,
      showGoogleFormModal: false,
      showReviewModal: false,
    });
  }
}

export default addProgressData;

var postmark = require("postmark");
import prisma from "./prisma";

module.exports = async (req, res) => {
  try {
    console.log("Running the cron function...");

    var client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

    const coursesProgress = await prisma.courseProgress.findMany({
      include: {
        Course: {
          include: {
            Instructor: true, // To include the related Instructor data inside the Course
          },
        }, // To include the related Course data
        User: true, // To include the related User data
      },
    });
    const coursesOnUser = await prisma.coursesOnUser.findMany({
      include: {
        Course: true,
        User: true,
      },
    });

    function filterCoursesInProgress(coursesProgress, coursesOnUser) {
      const coursesNotInProgress = [];

      for (const userCourse of coursesOnUser) {
        const match = coursesProgress.find(
          (progress) =>
            progress.userId === userCourse.userId &&
            progress.courseId === userCourse.courseId
        );
        if (!match) {
          coursesNotInProgress.push(userCourse);
        }
      }
      return coursesNotInProgress;
    }

    const filterCoursesNotInProgress = filterCoursesInProgress(
      coursesProgress,
      coursesOnUser
    );

    // Remove duplicates
    const uniqueObjects = [];
    const seenObjects = new Set();

    for (const obj of filterCoursesNotInProgress) {
      const uniqueKey = JSON.stringify(obj);

      if (!seenObjects.has(uniqueKey)) {
        uniqueObjects.push(obj);
        seenObjects.add(uniqueKey);
      }
    }

    // return uniqueObjects;

    console.log(uniqueObjects.length);

    for (let i = 0; i < uniqueObjects.length; i++) {
      const userName = uniqueObjects[i].User.name;
      const userEmail = uniqueObjects[i].User.email;
      const courseName = uniqueObjects[i].Course.name;
      const emailSubject = `Support and Assistance for Your UKETA Learning Course`;
      const HtmlBody =
        '<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">' +
        '<p style="font-size: 18px; font-weight: bold;">Dear ${userName},</p>' +
        "<p>We hope this email finds you well. We noticed that you have purchased the <strong>${courseName}</strong> on UKETA Learning, but it seems you have not started your learning journey yet. We are here to help and ensure you have a smooth experience with our platform.</p>" +
        "<p>We understand that life can get busy, and sometimes it might take a little while to dive into your chosen course. However, we want to make sure you are getting the most out of your investment. If you are facing any challenges or have questions about how to get started, please do not hesitate to reach out to us.</p>" +
        "<p>Our dedicated support team is ready to assist you with any technical issues, navigation concerns, or questions you may have about the course content. Your success is important to us, and we are committed to helping you achieve your learning goals.</p>" +
        "<br> <br> <p><strong>Here are a few ways you can get in touch:</strong></p> <ul>" +
        "<li><strong>Email:</strong> You can reply directly to this email, and one of our team members will promptly assist you.</li>" +
        '<li><strong>Phone:</strong> If you prefer speaking to someone over the phone, you can call our support hotline at <a href="tel:+256706939150" style="color: #007BFF; font-weight: bold; text-decoration: none;">+256 706 939 150</a> .</li>' +
        "<li><strong>FAQs:</strong> Before reaching out, you might find the answer to your question in our frequently asked questions section on the website</li>" +
        "</ul>" +
        "<p>We want to ensure you have the best learning experience possible, and we are excited to help you embark on this educational journey. Remember, our team is here to support you every step of the way.</p>" +
        "<p>Thank you for choosing UKETA Learning. We look forward to assisting you and seeing you thrive in your course.</p>" +
        "<br> <br>" +
        "<p>Best regards,</p>" +
        '<p style="font-weight: bold;">Rhea </p>' +
        '<p style="font-weight: bold;">Customer Support Team</p>' +
        '<p style="font-weight: bold;">UKETA Learning</p>' +
        "</div>";

      try {
        await client.sendEmail({
          From: "admin@uketa.online",
          To: userEmail,
          Subject: emailSubject,
          HtmlBody: HtmlBody,
          // MessageStream: "broadcast",
          MessageStream: "notifications-stream",
        });

        console.log(
          `Email sent to  ${userName} ${userEmail} for ${courseName} course.`
        );
      } catch (error) {
        console.error(`Error sending email to ${userEmail}:`);
      }
    }

    return res.status(200).send("Cron function executed.");
  } catch (error) {
    console.log({ error });
  }
};

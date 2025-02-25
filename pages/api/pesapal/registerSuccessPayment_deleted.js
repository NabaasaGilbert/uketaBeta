const axios = require("axios");
import prisma from "../prisma";
var postmark = require("postmark");

async function registerSuccessPayment(req, res) {
  try {
    const data = await req.body;

    const paymentData = await prisma.payment.findMany({
      where: {
        pesapalMerchantReference: data.OrderMerchantReference,
        pesapalOrderTrackingId: data.OrderTrackingId,
      },
    });
    if (paymentData.length === 0) {
      return res.send(
        JSON.stringify({
          status: 500,
          error: "Failed to find payment",
          message: "Failed to find payment",
        })
      );
    }
    const payment = paymentData[0];

    const user = await prisma.user.findUnique({
      where: {
        id: payment.userId,
      },
    });

    if (!user)
      return res.send(
        JSON.stringify({
          status: 500,
          error: "User not found",
          message: "User not found",
        })
      );

    var client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

    client.sendEmail({
      From: "admin@uketa.online",
      To: user.email,
      Subject: "Hello from Uketa! - Welcome to your course!",
      HtmlBody: `<strong>Hey ${user.name}!,</strong><br/><br/>Welcome to the Uketa Community!<br/><br/>If you are female, please click the link below to join our HER Working Women’s Private Facebook Group if you haven’t joined already.<br/><br/><a href="https://www.facebook.com/groups/HERWorkingWomen/?ref=share">Click here to join us now!</a><br/><br/>My name is Rhea Hirani and I am the HER Working Women’s Group Community Manager, I am here to help you get through your course!<br/><br/>Thank you for your support and we look forward to going on your personal development journey along side you.<br/><br/>To be able to access your course, you will need to log in on our learning portal, you will only need your name, email and password. (Please use the email and password you used to register.)<br/><br/><a href="https://www.uketalearning.com/login">Click here to Log-In to your account.</a><br/><br/>You will now receive access to your first lesson of the course! This course is made up of different modules, we recommend that you go week by week, you will receive a topic video and a worksheet which goes with the video. Be sure to do the exercises and take the week to practice your new skills!<br/><br/>Let us know how you are getting on with the course. We are here if you have any questions or comments.<br/><br/>If you have any issues getting into your course, don’t hesitate to ask us for help. You can send an email to <a href="mailto:info@uketa.online">info@uketa.online<a/> or give us a call on <a href="tel:+256772202190">+256772202190</a>.<br/><br/>We believe in you!<br/><br/>Thanks,<br/><br/>Rhea Hirani,<br/><a href="mailto:info@uketa.online">info@uketa.online<a/>,<br/>Administrator, Uketa Learning.`,
      TextBody: "Hello from Uketa! - Welcome to your course!",
      MessageStream: "outbound",
    });
    console.log({ payment: payment.courseIds });

    const courseIds = payment.courseIds.split(", ");

    console.log({ courseIds });

    if (courseIds.length === 1) {
      const courseId = courseIds[0];

      const existingRecord = await prisma.coursesOnUser.findFirst({
        where: {
          userId: user.id,
          courseId: courseId,
        },
      });

      if (!existingRecord) {
        const createdRecord = await prisma.coursesOnUser.create({
          data: {
            userId: user.id,
            courseId: courseId,
          },
        });

        const updatedPayment = await prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "successful",
          },
        });

        if (updatedPayment) {
          return res.send(
            JSON.stringify({
              status: 200,
              data: updatedPayment,
              response: createdRecord,
              message: "Payment updated and course added successfully",
            })
          );
        } else {
          return res.send(
            JSON.stringify({
              status: 500,
              error: "Failed to update payment",
              message: "Failed to update payment",
            })
          );
        }
      } else {
        console.log("Record already exists");
        return res.send(
          JSON.stringify({
            status: 200,
            message: "Record already exists",
          })
        );
      }
    } else {
      const coursesObj = courseIds.map((courseId) => ({
        userId: user.id,
        courseId: courseId,
      }));

      let response = [];

      // for (const courseData of coursesObj) {
      //   const { userId, courseId } = courseData;

      //   try {
      //     const existingRecord = await prisma.coursesOnUser.findFirst({
      //       where: {
      //         userId: userId,
      //         courseId: courseId,
      //       },
      //     });

      //     if (!existingRecord) {
      //       const createdRecord = await prisma.coursesOnUser.create({
      //         data: courseData,
      //       });

      //       response.push(createdRecord);
      //     } else {
      //       console.log('Record already exists');
      //     }
      //   } catch (error) {
      //     console.error(
      //       `Error creating record for userId:${userId} and courseId:${courseId}`,
      //       error
      //     );
      //   }
      // }

      await Promise.all(
        coursesObj.map(async (courseData) => {
          const { userId, courseId } = courseData;

          try {
            const existingRecord = await prisma.coursesOnUser.findFirst({
              where: {
                userId: userId,
                courseId: courseId,
              },
            });

            if (!existingRecord) {
              const createdRecord = await prisma.coursesOnUser.create({
                data: courseData,
              });

              response.push(createdRecord);
            } else {
              console.log("Record already exists");
            }
          } catch (error) {
            console.error(
              `Error creating record for userId:${userId} and courseId:${courseId}`,
              error
            );
          }
        })
      );

      const updatedPayment = await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: "successful",
        },
      });

      if (updatedPayment) {
        return res.send(
          JSON.stringify({
            status: 200,
            data: updatedPayment,
            response: response,
            message: "Payment updated and course added successfully",
          })
        );
      } else {
        return res.send(
          JSON.stringify({
            status: 500,
            error: "Failed to update payment",
            message: "Failed to update payment",
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
    return res.send(
      JSON.stringify({
        status: 200,
        error: error,
        message: "Payment callback failed",
      })
    );
  }
}

export default registerSuccessPayment;

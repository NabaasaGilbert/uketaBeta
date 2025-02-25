import prisma from "../prisma";
var postmark = require("postmark");

async function paymentSettlement(req, res) {
  if (req.method !== "POST") {
    res.status(403).json({
      message: "Method is not supported",
    });
  }

  const { body } = req;
  var client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);
  //   console.log(body);
  //   if (body.status != "successful") {
  //     res.status(500).json({
  //       message: "Payment failed",
  //     });
  //   }

  //   try {

  const user = await prisma.user.findUnique({
    where: {
      email: body.customer.email,
    },
  });

  if (!user)
    res.status(400).json({
      message: "User not found",
    });

  if (body.status === "successful") {
    client.sendEmail({
      From: "admin@uketa.online",
      To: body.customer.email,
      Subject: "Hello from Uketa! - Welcome to your course!",
      HtmlBody: `<strong>Hey ${user.name}!,</strong><br/><br/>Welcome to the Uketa Community!<br/><br/>If you are female, please click the link below to join our HER Working Women’s Private Facebook Group if you haven’t joined already.<br/><br/><a href="https://www.facebook.com/groups/HERWorkingWomen/?ref=share">Click here to join us now!</a><br/><br/>My name is Rhea Hirani and I am the HER Working Women’s Group Community Manager, I am here to help you get through your course!<br/><br/>Thank you for your support and we look forward to going on your personal development journey along side you.<br/><br/>To be able to access your course, you will need to log in on our learning portal, you will only need your name, email and password. (Please use the email and password you used to register.)<br/><br/><a href="https://www.uketalearning.com/login">Click here to Log-In to your account.</a><br/><br/>You will now receive access to your first lesson of the course! This course is made up of different modules, we recommend that you go week by week, you will receive a topic video and a worksheet which goes with the video. Be sure to do the exercises and take the week to practice your new skills!<br/><br/>Let us know how you are getting on with the course. We are here if you have any questions or comments.<br/><br/>If you have any issues getting into your course, don’t hesitate to ask us for help. You can send an email to <a href="mailto:info@uketa.online">info@uketa.online<a/> or give us a call on <a href="tel:+256772202190">+256772202190</a>.<br/><br/>We believe in you!<br/><br/>Thanks,<br/><br/>Rhea Hirani,<br/><a href="mailto:info@uketa.online">info@uketa.online<a/>,<br/>Administrator, Uketa Learning.`,
      TextBody: "Hello from Uketa! - Welcome to your course!",
      MessageStream: "outbound",
    });
  }

  const payment = await prisma.payment.create({
    data: {
      flwTransactionId: body.transaction_id.toString(),
      flwRef: body.flw_ref,
      textRef: body.tx_ref.toString(),
      amount: body.amount,
      narrative: "Course Settlement",
      userId: user.id,
      status: body.status,
    },
  });

  if (body.courseIdObj.length <= 1) {
    const response = await prisma.CoursesOnUser.create({
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
        courses: {
          connect: {
            id: body.courseIdObj[0],
          },
        },
      },
    });
    //   await prisma.CoursesOnUser.create({
    //     data: {
    //       userId: user.id,
    //       courseId: body.courseIdObj[0],
    //     },
    //   });
    res.status(200).json({
      message: "Payment Succesfull: " + response,
    });
  } else {
    const courseIdArray = Object.values(body.courseIdObj);

    let coursesObj = [];

    courseIdArray.forEach((courseId) => {
      coursesObj.push({ userId: user.id, courseId: courseId });
    });

    const response = await prisma.CoursesOnUser.createMany({
      data: coursesObj,
    });

    res.status(200).json({
      message: response,
    });
  }

  // res.status(200);
  //   } catch (error) {
  //     // console.log(error);
  //   res.status(200).json({
  //     response: payment,
  //   });
  //   }
}

export default paymentSettlement;

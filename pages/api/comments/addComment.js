import prisma from "../prisma";

async function addNewComment(req, res) {
  const data = await req.body;
  const options = { month: "long" };
  var today = new Date();
  var month = new Intl.DateTimeFormat("en-US", options).format(today);
  var currentDate =
    month +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    " - " +
    today.getHours() +
    ":" +
    today.getMinutes();

  try {
    const newCommentResponse = await prisma.comment.create({
      data: {
        text: data.text,
        username: data.username,
        date: currentDate,
        status: "Pending",
        userEmail: data.userEmail,
        courseId: data.courseId,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response:
          "Your comment was posted successfully. Awaiting approval from admin.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In adding comment " + e,
        response: "Error adding new comment.",
      })
    );
  }
}

export default addNewComment;

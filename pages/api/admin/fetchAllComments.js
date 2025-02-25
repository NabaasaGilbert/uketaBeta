import prisma from "../prisma";

async function fetchAllComments(req, res) {
  const allCommentsData = await prisma.comment.findMany();
  res.send(allCommentsData);
}

export default fetchAllComments;

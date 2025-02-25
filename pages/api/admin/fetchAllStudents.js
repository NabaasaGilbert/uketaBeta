import prisma from "../prisma";

async function fetchAllStudents(req, res) {
  const data = await prisma.user.findMany();
  res.send(data);
}

export default fetchAllStudents;

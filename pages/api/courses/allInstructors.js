import prisma from "../prisma";

async function fetchAlInstructors(req, res) {
  const allInstructorsData = await prisma.instructor.findMany({
    orderBy: {
      instructor: "asc",
    },
  });
  res.send(allInstructorsData);
}

export default fetchAlInstructors;

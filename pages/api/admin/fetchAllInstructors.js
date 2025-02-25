import prisma from '../prisma';

async function fetchAllInstructors(req, res) {
  const allInstructorsData = await prisma.instructor.findMany({
    orderBy: {
      instructor: 'asc',
    },
  });
  res.send(allInstructorsData);
}

export default fetchAllInstructors;

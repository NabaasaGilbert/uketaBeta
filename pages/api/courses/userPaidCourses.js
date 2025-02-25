import prisma from '../prisma';

async function userPaidCourses(req, res) {
  const { userId } = req.query;
  const coursesOnUser = await prisma.coursesOnUser.findMany({
    where: {
      userId: userId,
    },
    include: {
      Course: true,
    },
  });
  return res.send(
    JSON.stringify({
      status: 200,
      data: coursesOnUser,
      message: 'Paid courses by User',
    })
  );
}

export default userPaidCourses;

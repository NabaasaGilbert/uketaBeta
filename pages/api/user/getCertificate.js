import prisma from "../prisma";

async function getCertificate(req, res) {
  const data = await req.body;  

  const certificate = await prisma.courseProgress.findUnique({
    where: { id: data.id },
    include: {
      Course: {
        include: {
          Instructor: true, // To include the related Instructor data inside the Course
        },
      }, // To include the related Course data
      User: true,   // To include the related User data
    },
  });

  res.send(
    JSON.stringify({
      status: 200,
      error: null,
      data: certificate,
    })
  );
}

export default getCertificate;

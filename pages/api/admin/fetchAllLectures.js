import prisma from "../prisma";

async function fetchAllLectures(req, res) {
  const allLecturesData = await prisma.lecture.findMany({});
  res.send(allLecturesData);
}

export default fetchAllLectures;

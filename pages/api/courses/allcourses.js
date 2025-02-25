import prisma from "../prisma";

async function fetchAllCourses(req, res) {
  const allCoursesData = await prisma.course.findMany({
    // orderBy: {
    //   name: "asc",
    // },
  });
  res.send(allCoursesData);
}

export default fetchAllCourses;

import prisma from "../prisma";

async function fetchCourse(req, res) {
  
  try {
    const data = await prisma.salesPerson.findMany();

    res.send(
      JSON.stringify({
        status: 200,
        data: data,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "Error fetching data " + e,
        e,
        data: null,
      })
    );
  }
}

export default fetchCourse;

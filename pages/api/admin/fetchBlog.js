import prisma from "../prisma";

async function fetchAllBlogs(req, res) {
  try {

    const queryValues = Object.values(req.query);
    const blogId = queryValues[0];

    const blogData = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        data: blogData,
      })
    );
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In get data " + error,
        data: null,
      })
    );
  }
}

export default fetchAllBlogs;

import prisma from "../prisma";

async function fetchAllBlogs(req, res) {
  const allBlogsData = await prisma.blog.findMany({});
  res.send(allBlogsData);
}

export default fetchAllBlogs;

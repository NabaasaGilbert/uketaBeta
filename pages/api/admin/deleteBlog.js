import prisma from '../prisma';

async function deleteBlog(req, res) {  

  try {
    const queryValues = Object.values(req.query);
    const blogId = queryValues[0];

    await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });  

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        message: 'Blog Deleted Successfully.',
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: 'In deleting lecture.' + e,
        response: 'Error deleting lecture.',
      })
    );
  }
}

export default deleteBlog;

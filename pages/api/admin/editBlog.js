import prisma from "../prisma";

async function editCourse(req, res) {
  const data = await req.body;  

  try {
    const editBlog = await prisma.blog.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Blog updated successfully.",
      })
    );
  } catch (e) {
    console.log(e);
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update course " + e,
        response: "Error updating course.",
      })
    );
  }
}

export default editCourse;

import prisma from "../prisma";

async function addNewBlog(req, res) {
  try {

    if (!req.body.title || !req.body.description || !req.body.image) {
      return res.send(
        JSON.stringify({
          status: 400,
          error: "Please provide all the required fields.",
        })
      );
    }

    // Create a new blog entry in the database
    const newBlog = await prisma.blog.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      },
    });

    console.log(newBlog);

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Blog added successfully. " + newBlog,
      })
    );
  } catch (e) {
    console.log(e);

    res.send(
      JSON.stringify({
        status: 500,
        error: e,
      })
    );
  }
}

export default addNewBlog;

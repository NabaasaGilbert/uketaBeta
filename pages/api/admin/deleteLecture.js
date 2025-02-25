import prisma from "../prisma";

async function lectureDeleteHandler(req, res) {
  const lectureID = await req.body;

  try {
    
    // Delete the lecture
    await prisma.Lecture.delete({where:{id: lectureID}});    

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Lecture Deleted Successfully",
      })
    );
    
  } catch (e) {
    console.log({ e });
    res.send(
      JSON.stringify({
        status: 500,
        error: "In deleting lecture." + e,
        response: "Error deleting lecture.",
      })
    );
  }
}

export default lectureDeleteHandler;

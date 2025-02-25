import prisma from "../prisma";

async function handler(req, res) {
  try {
    const data = await req.body;
    const { ref, email } = data;

    const userExists = await prisma.salesPerson.findUnique({ where: { email } });

    // Create a new SalesPersonTracking record
    const activity = await prisma.salesPersonTracking.create({
      data: {
        salesPersonId: userExists.id
      },
    });

    return res.status(200).json({
      msg: activity,
      status: 200,
      error: null,
      response: "New Sales Person Created successfully.",
    });  
    
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "Error fetching data " + error,
        data: null,
      })
    );
  }
}

export default handler;

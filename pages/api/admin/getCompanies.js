import prisma from "../prisma";

async function handler(req, res) {
  try {
        
    const companies = await prisma.company.findMany()

    return res.send(
      JSON.stringify({
        message: companies,
        status: 200,
        error: null
      })
    );
  } catch (error) {
    console.log({ error });
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

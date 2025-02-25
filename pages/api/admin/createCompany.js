import prisma from "../prisma";

async function handler(req, res) {
  try {
    const data = await req.body;
    const { email, phone, name, website, logo, contactPerson, address } = data;

    console.log({ email, phone, name, website, logo, contactPerson, address });

    // Check if a company with the given name already exists (case-insensitive)
    const existingCompanyByName = await prisma.company.findFirst({
      where: {
        email,
      },
    });

    if (existingCompanyByName) {
      return res.status(400).send(
        JSON.stringify({
          msg: "Company with this name already exists.",
          status: 400,
          error: null,
          response: null,
        })
      );
    }

    // Create a new company
    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
        logo,
        contactPerson,
        address,
        website,
      },
    });
    const companies = await prisma.company.findMany()

    return res.send(
      JSON.stringify({
        message: companies,
        status: 200,
        error: null,
        response: "New Company Created  successfully.",
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

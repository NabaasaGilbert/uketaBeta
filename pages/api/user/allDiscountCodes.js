import prisma from '../prisma';

async function allDiscountCodes(req, res) {
  try {
    const data = await req.body;
    //   console.log(data);
    //   try {
    const discounts = await prisma.discount.findMany();
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        data: discounts,
      })
    );
  } catch (error) {
         res.send(
        JSON.stringify({
          status: 500,
          error: "In get discount data " + error,
          data: null,
        })
      );
  }
}

export default allDiscountCodes;

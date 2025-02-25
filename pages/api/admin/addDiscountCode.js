import prisma from '../prisma';

async function addDiscountCode(req, res) {
  const data = await req.body;

  const checkExistance = await prisma.discount.findUnique({
    where: {
      code: data.code,
    },
  });

  if (!checkExistance) {
    try {
      const newDiscountResponse = await prisma.discount.create({
        data: {
          code: data.code,
          percent: parseInt(data.percent),
        },
      });

      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          response: 'Discount Code added successfully.',
        })
      );
    } catch (e) {
      res.send(
        JSON.stringify({
          status: 500,
          error: 'In create discount code ' + e,
          response: 'Error creating new Discount Code.',
        })
      );
    }
  } else {
    res.send(
      JSON.stringify({
        status: 501,
        // error: "In create discount code " + e,
        response: 'Discount Code already exists.',
      })
    );
  }
}

export default addDiscountCode;

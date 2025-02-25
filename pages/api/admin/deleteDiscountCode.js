import prisma from '../prisma';

async function discountDeleteHandler(req, res) {
  const data = await req.body;

  try {
    await prisma.discount.delete({
      where: {
        id: data.id,
      },
    });

    return res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: 'Discount Code Deleted Successfully.',
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: 'In deleting discount code.' + e,
        response: 'Error deleting discount code.',
      })
    );
  }
}

export default discountDeleteHandler;

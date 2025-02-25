import prisma from "../prisma";

async function fetchAllPayments(req, res) {
  const payments = await prisma.payment.findMany({
    include: {
      User: true, // Include the related user data
      SalesPerson: true, // Include the related slaes person data
    },
  });

  return res.send(
    JSON.stringify({
      status: 200,
      data: payments,
      message: "Retrieve all payments",
    })
  );
}

export default fetchAllPayments;

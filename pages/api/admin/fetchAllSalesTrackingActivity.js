import prisma from '../prisma';

async function handler(req, res) {
  try {
    const activities = await prisma.salesPersonTracking.findMany({
      include: {
        salesPerson: true, // Include sales person details
      },
      orderBy: {
        createdAt: 'desc', // Order by created date descending
      },
    });

    return res.status(200).json({
      status: 200,
      error: null,
      data: activities,
    });
  } catch (error) {
    
    res.status(500).json({
      status: 500,
      error: "Error fetching sales person activities: " + error.message,
      data: null,
    });
  }
}

export default handler;

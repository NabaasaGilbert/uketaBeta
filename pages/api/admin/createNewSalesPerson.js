import prisma from "../prisma";
import { v4 as uuidv4 } from "uuid";

const generateTrackingCode = () => {
  // Generate a unique tracking code
  const trackingCode = uuidv4();
  return trackingCode;
};

async function handler(req, res) {
  try {
    const data = await req.body;
    const { email, phone, name } = data;

    // Generate tracking code
    const trackingCode = generateTrackingCode();

    // Create a new marketeer
    const newSalesPerson = await prisma.salesPerson.create({
      data: {
        name: name,
        email: email,
        trackingCode: trackingCode,
        phone: phone,
      },
    });

    return res.send(
      JSON.stringify({
        msg: newSalesPerson,
        status: 200,
        error: null,
        response: "New Sales Person Created  successfully.",
      })
    );
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "Error fetching data " + error,
        e,
        data: null,
      })
    );
  }
}

export default handler;

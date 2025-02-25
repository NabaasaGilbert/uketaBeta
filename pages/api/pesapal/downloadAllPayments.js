import prisma from "../prisma";
import { Readable } from "stream";

function formatAsCSV(data) {
  // Extract the keys from the first object in the data array
  const keys = Object.keys(data[0]);

  // Create a header row with the keys
  const headerRow = keys.join(",");

  // Create the rows with the corresponding values
  const dataRows = data.map((row) => {
    return keys.map((key) => row[key]).join(",");
  });

  // Combine the header row and data rows
  const csvContent = [headerRow, ...dataRows].join("\n");

  // Create a readable stream from the CSV content
  const stream = new Readable();
  stream.push(csvContent);
  stream.push(null);

  return stream;
}

async function downloadAllPayments(req, res) {
  const payments = await prisma.payment.findMany({
    include: {
      User: true, // Include the related user data
    },
  });

  payments.map((elem) => {
    elem.name = elem.User.name;
    elem.email = elem.User.email;
    elem.phone = elem.User.phone;
    elem.dateOfBirth = elem.User.dateOfBirth;
  });

  // Format the data as CSV
  const csvStream = formatAsCSV(payments);

  // Set the appropriate headers for the download
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=data.csv");

  // Pipe the CSV stream to the response object
  csvStream.pipe(res);

  //   res.send(payments);
  // return res.send(
  //   JSON.stringify({
  //     status: 200,
  //     data: payments,
  //     message: 'Retrieve all payments',
  //   })
  // );
}

export default downloadAllPayments;

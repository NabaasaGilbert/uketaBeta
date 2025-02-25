import prisma from "../prisma";
import { Readable } from 'stream';

function formatAsCSV(data) {
  // Extract the keys from the first object in the data array
  const keys = Object.keys(data[0]);

  // Create a header row with the keys
  const headerRow = keys.join(',');

  // Create the rows with the corresponding values
  const dataRows = data.map((row) => {
    return keys.map((key) => row[key]).join(',');
  });

  // Combine the header row and data rows
  const csvContent = [headerRow, ...dataRows].join('\n');

  // Create a readable stream from the CSV content
  const stream = new Readable();
  stream.push(csvContent);
  stream.push(null);

  return stream;
}

async function handler(req, res) {
  // const users = await prisma.user.findMany({
  //   select: { name: true, email: true, courses: true, createdAt: true },
  // });

  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      courses: true,
      createdAt: true,
      dateOfBirth: true,
      gender: true,
      phone: true,
    },
  });
  // const updatedUsers = users.map(elem => ({ ...elem, currentDate: new Date() }));

  const updatedUsers = users.map((elem) => {
    // Calculate age only if dateOfBirth is provided and not empty

    if (elem.dateOfBirth) {
      const dob = new Date(elem.dateOfBirth);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      return { ...elem, currentDate: new Date(), age };
    } else {
      // If dateOfBirth is not provided or empty, return the original element
      return { ...elem, currentDate: new Date(), age: null };
    }
  });

  const csvStream = formatAsCSV(updatedUsers);
  // Set the appropriate headers for the download
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

  // Pipe the CSV stream to the response object
  return csvStream.pipe(res);

}

export default handler;

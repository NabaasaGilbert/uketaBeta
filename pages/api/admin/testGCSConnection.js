/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = "uketa_folder";

// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();

async function listFiles() {
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles();

  console.log("Files:");
  files.forEach((file) => {
    console.log(file.name);
  });
}

listFiles().catch(console.error);

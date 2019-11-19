const fsPromises = require("fs").promises;

async function main() {
  // grab source file and destination file
  let origin = process.argv[2];
  let destination = process.argv[3];
  // check to see if source and destination are same file type
  let check = validate(origin, destination);

  if (check !== "success") {
    console.log("not a valid file type");
    return;
  }
  // check to see if origin exists
  let exists = await checkFileExists(origin);
  if (!exists) return;
  // copy file to destination
  await fsPromises
    .copyFile(origin, destination)
    .then(() => console.log("copied"))
    .catch(error => console.log(error));

  try {
    // try to delete file
    await fsPromises.unlink(origin);
  } catch (e) {
    console.log("error deleting file");
  }
}
// check to see if files are the same type
function validate(origin, destination) {
  if (!origin.length || !destination.length) return "error";
  let oFileType = origin.split(".")[1];
  let dFileType = destination.split(".")[1];

  if (oFileType !== dFileType) return "not equal";
  if (oFileType.includes("txt")) {
    return "success";
  }
  return "error";
}

// check to see if file exists
async function checkFileExists(origin) {
  try {
    let result = await fsPromises.open(origin);
    if (result) {
      return true;
    }
  } catch (e) {
    console.log("does not exist");
  }
}

main();

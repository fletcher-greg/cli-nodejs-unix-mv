const fsPromises = require("fs").promises;
const fs = require("fs");

async function main() {
  let origin = process.argv[2];
  let destination = process.argv[3];

  let check = validate(origin, destination);

  if (check !== "success") {
    console.log("not a valid file type");
    return;
  }
  let exists = await checkFileExists(origin);
  if (!exists) return;

  await fsPromises
    .copyFile(origin, destination)
    .then(() => console.log("copied"))
    .catch(() => console.log(error));

  try {
    await fsPromises.unlink(origin);
  } catch (e) {
    console.log("error deleting file");
  }
}

function validate(origin, destination) {
  let oFileType = origin.split(".")[1];
  let dFileType = destination.split(".")[1];

  if (oFileType !== dFileType) return "not equal";
  if (oFileType.includes("txt")) {
    return "success";
  }
  return "error";
}
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

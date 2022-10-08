function readJsonFile(filePath) {
  const fs = require("fs");
  const rawdata = fs.readFileSync(filePath);
  return JSON.parse(rawdata);
}
module.exports = readJsonFile;

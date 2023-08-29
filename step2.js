const { isUtf8 } = require("buffer");
const fs = require("fs");
const { default: axios } = require("axios");
let path = process.argv[2];

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

const webCat = async (url) => {
  try {
    await axios.get(url).then((result) => {
      console.log(result.data);
    });
  } catch (error) {
    console.log(error);
  }
};

if (path.includes("http")) {
  webCat(path);
} else {
  cat(path);
}

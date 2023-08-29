const { isUtf8 } = require("buffer");
const fs = require("fs");
const { default: axios } = require("axios");

function cat(path, out) {
  console.log(out);
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      if (out != null) {
        fs.writeFileSync(out, data, "utf8", function (err) {
          if (err) {
            console.error(`Couldn't write ${out}: ${err}`);
            process.exit(1);
          }
        });
      } else if (out == null) {
        console.log(data);
      }
    }
  });
}

const webCat = async (url, out) => {
  try {
    await axios.get(url).then((result) => {
      if (out != null) {
        fs.writeFileSync(out, result.data, "utf8", function (err) {
          if (err) {
            console.error(`Couldn't write ${out}: ${err}`);
            process.exit(1);
          }
        });
      } else if (out == null) {
        console.log(result.data);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function writeOut() {}

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
console.log(path, out);

if (path.includes("http")) {
  webCat(path, out);
} else {
  cat(path, out);
}

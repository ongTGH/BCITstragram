const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

function main() {
  IOhandler.unzip(zipFilePath, pathUnzipped)
    .then((result) => {
      console.log(result);
      return IOhandler.readDir(pathUnzipped);
    })
    .then((imgFiles) => {
      const grayscalePromises = imgFiles.map((pathUnzipped) => {
        return IOhandler.grayScale(pathUnzipped, pathProcessed)
      });
      return Promise.all(grayscalePromises);
    })
}

main();

// IOhandler.grayScale("./unzipped/in.png", "sd.png")
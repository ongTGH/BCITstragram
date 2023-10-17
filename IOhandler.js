/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs/promises"),
  { createReadStream, createWriteStream} = require("fs")
  PNG = require("pngjs").PNG,
  path = require("path");
  transformStream = new PNG({});

const AdmZip = require("adm-zip");

// const zip = new AdmZip("./myfile.zip");
// zip.extractAllTo("./unzipped", true);

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise(async (resolve, reject) => {
    try {
      const zip = new AdmZip(pathIn);
      zip.extractAllTo(pathOut, true);
      resolve("Extraction operation complete");
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const imgFiles = files.filter((file) => path.extname(file) === '.png');
      const imgPaths = imgFiles.map((file) => path.join(dir, file));
      resolve(imgPaths);
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    createReadStream(pathIn)
      .pipe(transformStream).on("parsed", function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const r = this.data[idx] * 0.3;
            const g = this.data[idx + 1] * 0.59;
            const b = this.data[idx + 2] * 0.11;
            const gray = r + g + b;

            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;
          }
        }
        this.pack().pipe(createWriteStream(pathOut)).on("close", resolve);
      });
    createReadStream(pathIn).on("error", reject);
    createWriteStream(pathOut).on("error", reject);
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
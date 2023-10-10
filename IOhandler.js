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

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    createReadStream(pathIn)
      .on("end", resolve)
      .on("error", reject)
    createWriteStream(pathOut)
      .on("end", resolve)
      .on("error", reject)
  })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  createReadStream(pathIn)
  .pipe(transformStream)
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        r = this.data[idx]*0.3
        g = this.data[idx + 1]*0.59;
        b = this.data[idx + 2]*0.11;
        gray = r + g + b

        this.data[idx] = gray
        this.data[idx + 1] = gray
        this.data[idx + 2] = gray
      }
    }
    this.pack().pipe(createWriteStream(pathOut));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};

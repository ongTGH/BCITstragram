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
const unzipper = require('unzipper');
const fs = require('fs');
const PNG = require("pngjs").PNG;
const transformStream = new PNG({});

// Work with promises!!! (promise.all())

//Step 1: Read the zip file
//Step 2: Unzip the zip file (.then(___))
//Step 3: Read all png images from unzipped folder
//Step 4: Send them to the grayscale filter function
//Step 5: After ALL IMAGES have SUCCESSFULLY been grayscaled, show a success message 
//ALL ERRORS MUST SHOW IN .catch in PROMISE CHAIN

// const unzip = (pathIn, pathOut) => {
//     return new Promise((resolve, reject) => {
//         fs.createReadStream(pathIn)
//             .on("end", resolve)
//             .on("error", reject)
//     } )
// }

// [grayScale("img1.png"), grayScale("img2.png"), grayScale("img3.png")]
//     .then(() => console.log("All images done!"))

// fs.createReadStream(zipFilePath)
//     .pipe(unzipper.Extract({ path: './unzipped' }));

// fs.createReadStream("./unzipped/in.png")
//     .on("data", (chunk) => console.log(chunk))

// fs.createReadStream("./unzipped/in.png")
//   .pipe(transformStream)
//   .on("parsed", function () {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var idx = (this.width * y + x) << 2;

//         // invert color
//         r = this.data[idx]*0.3
//         g = this.data[idx + 1]*0.59;
//         b = this.data[idx + 2]*0.11;
//         gray = r + g + b

//         this.data[idx] = gray
//         this.data[idx + 1] = gray
//         this.data[idx + 2] = gray

//       }
//     }

//     this.pack().pipe(fs.createWriteStream("out.png"));
//   });

IOhandler.grayScale("./unzipped/in.png", "out.png")

//Easier Method

// fs.createReadStream("./unzipped/in.png")
//   .pipe(
//     new PNG({
//       colorType: 0,
//       },
//     )
//   )
//   .on("parsed", function () {
//     this.pack().pipe(fs.createWriteStream("out.png"));
//   });

const grayScale = (pathIn, pathOut) => {
    var fs = require("fs"),
        PNG = require("pngjs").PNG;
    // Streams
    const readStream = fs.createReadStream(pathIn);
    const writeStream = fs.createWriteStream(pathOut);
    const pngStream = new PNG().on("parsed", function() {
        const modifiedImage = handleGrayscale();
        modifiedImage.pack()
    });
    // Connect the Streams
    readStream
        .on("error", (err) => console.log(err))
        .pipe(pngStream)
        .on("error", (err) => console.log(err))
        .pipe(writeStream)
        .on("error", (err) => console.log(err))
}

function handleGrayscale() {
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
        return this.data
    }
}
var Jimp = require('jimp');
 
// open a file called "lenna.png"
module.exports = function Compress(input, qualidade) {
  Jimp.read(`./uploads/${input}`, (err, lenna) => {
    if (err) throw err;
    lenna
      //.resize(256, 256) // resize
      .quality(qualidade) // set JPEG quality
      //.greyscale() // set greyscale
      .write(`./comprimidas/${input}_comprimida.jpg`); // save
  });
}

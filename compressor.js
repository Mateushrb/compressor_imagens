var Jimp = require('jimp');
 
// open a file called "lenna.png"
/* module.exports = async function Compress(input, qualidade) {
  Jimp.read(`./uploads/${input}`).then(lenna => {
    return lenna
      //.resize(256, 256) // resize
      .quality(qualidade) // set JPEG quality
      //.greyscale() // set greyscale
      .write(`./comprimidas/${input}_comprimida.jpg`); // save
  })
  .catch(err => {
    console.error(err);
  })
} */
const JPEG = require('jpeg-js')
Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, {
	maxMemoryUsageInMB: 6144,
	maxResolutionInMP: 600
})

Jimp.read(`./teste.jpg`).then(lenna => {
  return lenna
    .resize(9999, 9999) // resize
    //.quality(50) // set JPEG quality
    //.greyscale() // set greyscale
    .write(`./comprimidas/teste_comprimido.jpg`); // save
})
.catch(err => {
  console.error(err);
})


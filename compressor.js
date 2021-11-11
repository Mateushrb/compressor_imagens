let compress_images = require('compress-images');

let InputPath = './uploads/*.{jpg,JPG,jpeg,JPEG}';
let OutputPath = './comprimidas';

var jpgOptions = {jpg: {engine: 'mozjpeg', command: ['-quality', '30']}};
var pngOptions = {png: {engine: 'pngquant', command: ['--quality=20-50']}};
var svgOptions = {svg: {engine: 'svgo', command: '--multipass'}};
var gifOptions = {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}};

compress_images(InputPath, OutputPath, {compress_force: false, statistic: true, autoupdate: true}, false,
  jpgOptions,
  pngOptions,
  svgOptions,
  gifOptions, 
  callBackCompressao);


    function callBackCompressao(error, completed, statistic){
        console.log('-------------');
        // console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log('-------------'); 
      }

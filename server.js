const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.unsubscribe(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

let acessos = 0;

app.use(express.static('./public'));
app.get("/", (req, res) => {
    res.render("index");
    console.log("1 acesso em: " + new Date());
    acessos++;
    console.log("Total de acessos: " + acessos + "\n");
});

var Jimp = require('jimp');
const JPEG = require('jpeg-js')
Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, {
	maxMemoryUsageInMB: 6144,
	maxResolutionInMP: 600
})

//const Compress = require('./compressor.js');
app.post("/uploads", upload.single("arquivo"), (req, res) => {

    let qualidade = parseInt(req.body.nivel);
    let input = req.file.filename;

    console.log("Arquivo recebido\n");

    const envia_arquivo = async () => {
    await Jimp.read(`./uploads/${input}`).then(lenna => {
        return lenna
        //.resize(256, 256) // resize
        .quality(qualidade) // set JPEG quality
        //.greyscale() // set greyscale
        .write(`./comprimidas/${input}_comprimida.jpg`); // save
     })
    .catch(err => {
        console.error(err);
        res.render('limite');
    });
    setTimeout(function() {
        res.download(`comprimidas/${input}` + '_comprimida.jpg');
    }, 500);
    }
    envia_arquivo();  
            
});
    


app.listen(8080,() => {
    console.log("Servidor rodando! Porta: 8080");
    console.log("Acessos: " + acessos);
});
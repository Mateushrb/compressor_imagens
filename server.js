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
app.post("/qualidade", upload.single("arquivo"), (req, res) => {

    let input = req.file.filename;
    let qualidade = parseInt(req.body.nivel);

    console.log("Arquivo recebido\n");

    const envia_arquivo = async () => {
        console.log('Renderizando\n');
        await Jimp.read(`./uploads/${input}`).then(lenna => {
            return lenna
            .quality(qualidade) // set JPEG quality
            .write(`./comprimidas/${input}_comprimida.jpg`); // save
        })
        .catch(err => {
            console.error(err);
            res.render('limite');
        });

        setTimeout(function() { 
            res.render("concluido", {arquivo: `${input}_comprimida.jpg`});
            console.log('Imagen enviada\n');
        }, 200);
    }
    envia_arquivo();          
});

app.get("/download/:nome", (req, res) => {
    res.download(`comprimidas/${req.params.nome}`);
});

app.post("/qualidadedimencao", upload.single("arquivo"), (req, res) => {

    let input = req.file.filename;
    let qualidade = parseInt(req.body.nivel);

    let largura = parseInt(req.body.largura);
    let altura = parseInt(req.body.altura);

    console.log("Arquivo recebido\n");

    const envia_arquivo = async () => {
        console.log('Renderizando\n');
        await Jimp.read(`./uploads/${input}`).then(lenna => {
            return lenna
            .resize(largura, altura)
            .quality(qualidade) // set JPEG quality
            .write(`./comprimidas/${input}_comprimida.jpg`) // save

        })
        .catch(err => {
            console.error(err);
            res.render('limite');
        });
        
        setTimeout(function() {
            res.render("concluido", {arquivo: `${input}_comprimida.jpg`});
            console.log('Imagem enviada\n');
        }, 200);
    }

    if (largura < 1 || largura > 9999 || altura < 1 || altura > 9999) {
        if (altura > 9999) {
            let alturaExcedida = `A altura da imagem recebida pelo servidor foi: ${altura} e passou do limite de 9999`;
            res.render('valores', { alturaExcedida: alturaExcedida });
        } else {
            let alturaExcedida = 'Erro!';
            res.render('valores', { alturaExcedida: alturaExcedida });
        }
    } else {
        envia_arquivo();
    };
            
});
    
app.listen(8080,() => {
    console.log("Servidor rodando! Porta: 8080");
    console.log("Acessos: " + acessos);
});
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('view engine', 'ejs');

app.unsubscribe(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Utilização do multer para upload das imagens e para renomear 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

// Enviar arquivos do site
app.use(express.static('./public'));
// Rota principal para renderização do index
app.get("/", (req, res) => {
    res.render("index");

    // Log do servidor
    let acesso = new Date();
    fs.writeFile('relatorio.log', `\n1 acesso em: ${acesso}\n\n`, {
        encoding: 'utf-8', flag: 'a'
    }, (err) => {
        console.log(`1 acesso em: ${acesso}\n`);
    });
});

var Jimp = require('jimp');
const JPEG = require('jpeg-js')
// Aceitar imagens maiores
Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, {
	maxMemoryUsageInMB: 6144,
	maxResolutionInMP: 600
})

//const Compress = require('./compressor.js');

// Rota para alterar a qualidade
app.post("/qualidade", upload.single("arquivo"), (req, res) => {

    // Variáveis para nome do arquivo e nível de qualidade
    let input = req.file.filename;
    let qualidade = parseInt(req.body.nivel);

    // Log do servidor
    fs.writeFile('relatorio.log', 'Arquivo recebido\n', {
        encoding: 'utf-8', flag: 'a'
    }, (err) => {
        console.log('Arquivo recebido')
    });

    // Função de renderização
    const envia_arquivo = async () => {
        // Log do servidor
        fs.writeFile('relatorio.log', 'Renderizando\n', {
            encoding: 'utf-8', flag: 'a'
        }, (err) => {
            console.log('Renderizando')
        });

        // Chamada do Jimp
        await Jimp.read(`./uploads/${input}`).then(lenna => {
            return lenna
            .quality(qualidade) // set JPEG quality
            .write(`./comprimidas/${input}_comprimida.jpg`); // save
        })
        .catch(err => {
            console.error(err);
            // Página de limite excedido
            res.render('limite');
        });

        setTimeout(function() {
            // Página de conclusão
            res.render("concluido", {arquivo: `${input}_comprimida.jpg`});

            // Log do servidor
            fs.writeFile('relatorio.log', 'Imagem renderizada\n', {
                encoding: 'utf-8', flag: 'a'
            }, (err) => {
                console.log('Imagen renderizada')
            });
        }, 200);
    }
    envia_arquivo();          
});

// Rota para alterar a qualidade e dimenções
app.post("/qualidadedimencao", upload.single("arquivo"), (req, res) => {

    // Variáveis para nome e qualidade
    let input = req.file.filename;
    let qualidade = parseInt(req.body.nivel);
    // Variáveis para largura e altura
    let largura = parseInt(req.body.largura);
    let altura = parseInt(req.body.altura);

    // Log do servidor
    fs.writeFile('relatorio.log', 'Arquivo recebido\n', {
        encoding: 'utf-8', flag: 'a'
    }, (err) => {
        console.log('Arquivo recebido')
    });

    const envia_arquivo = async () => {
        // Log do servidor
        fs.writeFile('relatorio.log', 'Renderizando\n', {
            encoding: 'utf-8', flag: 'a'
        }, (err) => {
            console.log('Renderizando')
        });

        // Chamada do Jimp
        await Jimp.read(`./uploads/${input}`).then(lenna => {
            return lenna
            .resize(largura, altura)
            .quality(qualidade) // set JPEG quality
            .write(`./comprimidas/${input}_comprimida.jpg`) // save

        })
        .catch(err => {
            console.error(err);
            // Página de limite excedido
            res.render('limite');
        });
        
        setTimeout(function() {
            // Página de conclusão
            res.render("concluido", {arquivo: `${input}_comprimida.jpg`});

            // Log do servidor
            fs.writeFile('relatorio.log', 'Imagem renderizada\n', {
                encoding: 'utf-8', flag: 'a'
            }, (err) => {
                console.log('Imagen renderizada')
            });
        }, 200);
    }

    // Condição de segurança para limites de largura e altura caso o usuário altere o script no frontend
    if (largura < 1 || largura > 9999 || altura < 1 || altura > 9999) {
        if (altura > 9999) {
            let alturaExcedida = `A altura da imagem recebida pelo servidor foi: ${altura} e passou do limite de 9999`;
            // Página de limite excedido
            res.render('valores', { alturaExcedida: alturaExcedida });
        } else {
            let alturaExcedida = 'Erro!';
            // Página de limite excedido
            res.render('valores', { alturaExcedida: alturaExcedida });
        }
    } else {
        envia_arquivo();
    };
});

// rota para download da imagem renderizada
app.get("/download/:nome", (req, res) => {
    res.download(`comprimidas/${req.params.nome}`);

    // Log do servidor
    fs.writeFile('relatorio.log', 'Imagem enviada\n', {
        encoding: 'utf-8', flag: 'a'
    }, (err) => {
        console.log('Imagem enviada\n')
    });
});
    
app.listen(8080,() => {
    // Log do servidor
    fs.writeFile('relatorio.log', 'Servidor rodando! Porta: 8080\n', {
        encoding: 'utf-8', flag: 'a'
    }, (err) => {
        console.log('Servidor rodando! Porta: 8080\nUtilize ctrl + c para parar o servidor')
    });
});
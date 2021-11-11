const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
app.set('view engine', 'ejs');




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
app.get("/", (req, res) => {
    res.render("index");
    console.log("1 acesso em: " + new Date());
    acessos++;
    console.log("Total de acessos: " + acessos + "\n");
});

app.post("/uploads", upload.single("arquivo"), (req, res) => {
    res.send("Arquivo recebido");
    console.log("Arquivo recebido\n");
});


app.listen(8080,() => {
    console.log("Servidor rodando! Porta: 8080");
    console.log("Acessos: " + acessos);
});
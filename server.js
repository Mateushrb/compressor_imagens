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

app.get("/styles/_footer.css", function(req, res) {
    res.sendFile(__dirname + "/views/styles/_footer.css");
});

app.get("/styles/_header.css", function (req, res) {
    res.sendFile(__dirname + "/views/styles/_header.css");
});

app.get("/styles/_main.css", function (req, res) {
    res.sendFile(__dirname + "/views/styles/_main.css");
});

app.get("/styles/_footer.css", function (req, res) {
    res.sendFile(__dirname + "/views/styles/_footer.css");
});

app.get("/images/logo.png", function (req, res) {
    res.sendFile(__dirname + "/views/images/logo.png");
});

app.get("/images/icon.png", function (req, res) {
    res.sendFile(__dirname + "/views/images/icon.png");
})

app.get("/style.css", function (req, res) {
    res.sendFile(__dirname + "/views/style.css");
})

app.get("/script.js", function (req, res) {
    res.sendFile(__dirname + "/views/script.js");
})

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
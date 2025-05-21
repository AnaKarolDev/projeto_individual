var express = require("express");
var router = express.Router();

var jogoMemoriaController = require("../controllers/jogoMemoriaController");

//Recebendo os dados do html e direcionando para a função buscarPontos de jogoMemoriaController.js
router.post("/buscarPontos", function (req, res) {
    jogoMemoriaController.buscarPontos(req, res);
})

// router.post("/buscar", function (req, res) {
//     jogoMemoriaController.buscarPontos(req, res);
// });

module.exports = router;
var express = require("express");
var router = express.Router();

var jogadorController = require("../controllers/jogoMemoriaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    jogoMemoriaController.cadastrar(req, res);
})

router.post("/buscar", function (req, res) {
    jogoMemoriaController.autenticar(req, res);
});

module.exports = router;
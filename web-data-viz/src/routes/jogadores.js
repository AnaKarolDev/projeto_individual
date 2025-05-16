var express = require("express");
var router = express.Router();

var jogadorController = require("../controllers/jogadorController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    jogadorControllerController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    jogadorController.autenticar(req, res);
});

module.exports = router;
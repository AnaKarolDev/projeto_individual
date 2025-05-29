var express = require("express");
var router = express.Router();

var pontosController = require("../controllers/pontosController");

router.post("/buscarPontos", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    pontosController.buscarPontos(req, res);
});

router.get("/inserirPontos", function(req, res){

    pontosController.inserirPontos(req, res); 
})
module.exports = router;


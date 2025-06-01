const express = require("express");
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
});

router.get('/', function (req, res) {
    res.send("Rota /quiz está funcionando! Use POST para enviar dados.");
});

router.get("/estatisticas", function (req, res) {
    quizController.estatisticas(req, res);
});

module.exports = router;

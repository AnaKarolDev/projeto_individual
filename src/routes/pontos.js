const express = require('express');
const router = express.Router();
const pontosController = require('../controllers/pontosController');

router.post("/cadastrar", function (req, res) {
    pontosController.cadastrar(req, res);
})

module.exports = router;

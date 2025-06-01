// const jogadorModel = require('../models/jogadorModel');
const pontosModel = require('../models/pontosModel');


function cadastrar(req, res) {
    console.log("Corpo da requisição:", req.body);
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    var fkJogador = req.body.fkJogador;
    var fkJogo_memoria = req.body.fkJogo_memoria;

    console.log("ID jogador:", fkJogador);
    console.log("Acertos:", acertos);
    console.log("erros:", erros);
    console.log("ID jogo da memória:", fkJogo_memoria);

    // Faça as validações dos valores
    if (acertos == undefined || isNaN(acertos)) {
        res.status(400).send("Acertos está inválido!");
    } else if (erros == undefined || isNaN(erros)) {
        res.status(400).send("Erros está inválido!");
    } else if (fkJogador == undefined || isNaN(fkJogador)) {
        res.status(400).send("Jogador está inválido!");
    }else if (fkJogo_memoria == undefined || isNaN(fkJogo_memoria)) {
        res.status(400).send("Jogo memória está inválido!");
    }  else {

        // Passe os valores como parâmetro e vá para o arquivo pontosModel.js
        pontosModel.cadastrar(acertos, erros, fkJogador)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao inserir os dados! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    // autenticar,
    cadastrar
}

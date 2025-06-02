var jogadorModel = require("../models/jogadorModel");

function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        jogadorModel.autenticar(email, senha)
            .then((resultadoJogadores) => {
                if (resultadoJogadores.length > 0) {
                    res.json({
                        email: resultadoJogadores[0].email,
                        nome: resultadoJogadores[0].nome,
                        id: resultadoJogadores[0].id

                    });
                } else if (resultadoJogadores.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    console.log("Corpo da requisição:", req.body);
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeServer = req.body.nome;
    var emailServer = req.body.email;
    var senhaServer = req.body.senha;

    // Faça as validações dos valores
    if (nomeServer == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (emailServer == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaServer == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

               
       jogadorModel.verificarEmail(emailServer)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(409).send("E-mail já cadastrado.");
            } else {
                // E-mail ainda não está cadastrado
                jogadorModel.cadastrar(nomeServer, emailServer, senhaServer)
                    .then((resultadoCadastro) => {
                        res.json(resultadoCadastro);
                    })
                    .catch((erro) => {
                        console.log(erro);
                        res.status(500).json(erro.sqlMessage);
                    });
            }
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }}
module.exports = {
    autenticar,
    cadastrar
}
const quizModel = require("../models/quizModel");

function cadastrar(req, res) {
    const { sentimento, tipo_musica, objetivo, resultado_playlist, fkJogador } = req.body;

    if (!sentimento || !tipo_musica || !objetivo || !resultado_playlist || !fkJogador) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }

    quizModel.cadastrar(sentimento, tipo_musica, objetivo, resultado_playlist, fkJogador)
        .then(() => {
            res.status(200).json({ mensagem: "Respostas cadastradas com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao salvar no banco:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function estatisticas(req, res) {
    quizModel.estatisticas()
        .then((resultado) => res.json(resultado))
        .catch((erro) => res.status(500).json({ erro: erro.sqlMessage }));
}

module.exports = {
    cadastrar,
    estatisticas
};

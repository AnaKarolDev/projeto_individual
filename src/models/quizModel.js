const database = require("../database/config");

function cadastrar(sentimento, tipo_musica, objetivo, resultado_playlist, fkJogador) {
    const instrucao = `
        INSERT INTO quiz_musical (
            sentimento,
            tipo_musica,
            objetivo,
            resultado_playlist,
            fkJogador
        ) VALUES (
            '${sentimento}',
            '${tipo_musica}',
            '${objetivo}',
            '${resultado_playlist}',
            ${fkJogador}
        );
    `;
    return database.executar(instrucao);
}

// Estatísticas para dashboard (exemplo: quantidade por playlist)
function estatisticas() {
    const instrucao = `
        SELECT resultado_playlist, COUNT(*) AS total
        FROM quiz_musical
        GROUP BY resultado_playlist;
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    estatisticas
};

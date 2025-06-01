const database = require("../database/config");


// Função para salvar os dados no banco
function cadastrar(acertos, erros, fkJogador) {
    const instrucaoJogo = `
        INSERT INTO pontos (acertos, erros, fkJogador)
        VALUES (${acertos}, ${erros}, ${fkJogador});
    `;
            return database.executar(instrucaoJogo);
  
}

// Função para buscar últimos dados do jogador para o gráfico
function ranking() {
    const instrucao = `
        SELECT j.nome, SUM(p.acertos) AS totalAcertos
        FROM pontos p
        JOIN jogador j ON p.fkJogador = j.id
        GROUP BY j.nome
        ORDER BY totalAcertos DESC
        LIMIT 10;
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    ranking
};

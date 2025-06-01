const database = require("../database/config");

// Função para salvar os dados no banco
function cadastrar(acertos, erros, fkJogador, fkJogo_memoria) {
    const instrucaoJogo = `
        INSERT INTO pontos (acertos, erros, fkJogador, fkJogo_memoria)
        VALUES (${acertos}, ${erros}, ${fkJogador}, ${fkJogo_memoria});
    `;
            return database.executar(instrucaoJogo);
  
}

// Função para buscar últimos dados do jogador para o gráfico
function buscar(fkJogador, limite = 10) {
    const instrucao = `
        SELECT 
            jm.tentativas,
            p.acertos,
            p.erros,
            DATE_FORMAT(jm.momento, '%H:%i:%s') AS momento
        FROM jogo_memoria jm
        JOIN pontos p ON p.fkJogo_memoria = jm.idJogo_Memoria
        WHERE p.fkJogador = ${fkJogador}
        ORDER BY jm.momento DESC
        LIMIT ${limite};
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    buscar
};

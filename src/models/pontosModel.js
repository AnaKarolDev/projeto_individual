var database = require("../database/config");

function buscarPontos(idPontos) {
  var instrucaoSql = `SELECT * FROM pontos WHERE id = '${idPontos}'`;

  return database.executar(instrucaoSql);
}

function pegarPontos(acertos, idPontos) {
  var instrucaoSql = `INSERT INTO pontos (idPontos, acertos) VALUES ('${acertos}', '${idPontos}')`;

  return database.executar(instrucaoSql);
}

module.exports = {buscarPontos, pegarPontos};

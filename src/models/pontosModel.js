var database = require("../database/config");

function inserirPontos(idPontos, acertos) {
  var instrucaoSql = `INSERT INTO pontos (idPontos, acertos) VALUES ('${idPontos}', '${acertos}')`;

  return database.executar(instrucaoSql);
}

function buscarPontos(idPontos) {
  var instrucaoSql = `SELECT * FROM pontos WHERE id = '${idPontos}'`;

  return database.executar(instrucaoSql);
}

module.exports = {inserirPontos, buscarPontos};

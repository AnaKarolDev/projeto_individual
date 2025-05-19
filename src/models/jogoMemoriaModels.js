var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM pontos WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idPontos,  ,  FROM pontos`;

  return database.executar(instrucaoSql);
}

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM pontos WHERE idPontos = '${id}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(acertos, idPontos) {
  var instrucaoSql = `INSERT INTO empresa (acertos, idPontos) VALUES ('${acertos}', '${idPontos}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorId, buscarPorId, cadastrar, listar };

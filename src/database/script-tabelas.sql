-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE inside_music;

USE inside_music;

CREATE TABLE jogador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50)
);

CREATE TABLE jogo_memoria (
    idJogo_Memoria INT PRIMARY KEY AUTO_INCREMENT,
    tentativas INT,
    momento DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pontos (
    idPontos INT PRIMARY KEY AUTO_INCREMENT,
    acertos INT,
    erros INT,
    fkJogador INT,
    fkJogo_memoria INT,
    constraint fkJogoJogador foreign key (fkJogador) references jogador (id),
    constraint fkJogadorJogo foreign key (fkJogo_memoria) references jogo_memoria (idJogo_memoria)
);
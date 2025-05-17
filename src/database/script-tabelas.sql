-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE inside_music;

USE inside_music;

CREATE TABLE jogador (
    idJogador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50)
);

CREATE TABLE jogo_memoria (
    idJogo_Memoria INT PRIMARY KEY AUTO_INCREMENT,
    viradas int
);

create table pontos (
    /* em nossa regra de negócio, um aquario tem apenas um sensor */
    idPontos INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao_max INT,
    pontuacao_min INT,
    acertos INT,
    fkJogador INT,
    fkJogo_memoria INT,
    constraint fkJogoJogador foreign key (fkJogador) references jogador (idJogador),
    constraint fkJogadorJogo foreign key (fkJogo_memoria) references jogo_memoria (idJogo_memoria)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */


insert into
    jogador (nome, email, senha)
values ('Ana', 'ana@gmail.com', 'ana123');

insert into
    jogador (nome, email, senha)
values ('Karol', 'karol@gmail.com', 'karol123');


insert into
    pontos (pontuacao_max, pontuacao_min, fkJogador)
values (8, 6, 2);


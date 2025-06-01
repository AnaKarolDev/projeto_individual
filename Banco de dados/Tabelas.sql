 create database inside_music;
use inside_music;



create table jogador(
id int primary key auto_increment,
nome varchar(45) not null,
email varchar(45) not null,
senha varchar(20) not null
);

create table jogo_memoria(
idJogo_Memoria int primary key auto_increment,
tentativas int,
momento datetime default current_timestamp
);

create table pontos(
idPontos int primary key auto_increment,
acertos int,
erros int,
fkJogador int,
fkJogo_memoria int,
constraint fkJogoJogador foreign key (fkJogador) references jogador(id),
 constraint fkJogadorJogo foreign key (fkJogo_memoria) references jogo_memoria(idJogo_memoria)
);

CREATE TABLE quiz_musical (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    sentimento VARCHAR(45),
    tipo_musica VARCHAR(45),
    objetivo VARCHAR(45),
    resultado_playlist VARCHAR(45),
    momento DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkJogador INT,
    CONSTRAINT fkJogadorQuiz FOREIGN KEY (fkJogador) REFERENCES jogador(id)
    );



select * from jogador;
select * from pontos;
select * from jogo_memoria;
select * from quiz_musical;

insert into
    jogador (nome, email, senha)
values ('Ana', 'ana@gmail.com', 'ana123');

insert into
    jogador (nome, email, senha)
values ('Karol', 'karol@gmail.com', 'karol123');

insert into
    jogador (nome, email, senha)
values ('Luka', 'luka@gmail.com', 'luka123');

insert into jogo_memoria (tentativas, momento) values
(6, now()),
(7, now());

insert into pontos (acertos, erros, fkJogador, fkJogo_memoria) values 
(3, 4, 1, 1),
(4, 2, 2, 1),
(6, 5, 1, 1);

SELECT 
            jm.tentativas,
            p.acertos,
            p.erros,
            DATE_FORMAT(jm.momento, '%H:%i:%s') AS momento
        FROM jogo_memoria jm
        JOIN pontos p ON p.fkJogo_memoria = jm.idJogo_memoria
        WHERE p.fkJogador = fkJogador
        ORDER BY jm.momento DESC
        LIMIT 2;
        
        
select * from pontos join jogo_memoria on idJogo_memoria = fkJogo_memoria;


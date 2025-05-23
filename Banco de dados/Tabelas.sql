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
viradas int
);

create table pontos(
idPontos int primary key auto_increment,
pontuacao_max int,
pontuacao_min int,
acertos int,
fkJogador int,
fkJogo_memoria int,
constraint fkJogoJogador foreign key (fkJogador) references jogador(id),
 constraint fkJogadorJogo foreign key (fkJogo_memoria) references jogo_memoria(idJogo_memoria)
);


select * from jogador;

insert into
    jogador (nome, email, senha)
values ('Ana', 'ana@gmail.com', 'ana123');

insert into
    jogador (nome, email, senha)
values ('Karol', 'karol@gmail.com', 'karol123');


insert into
    pontos (pontuacao_max, pontuacao_min, fkJogador)
values (8, 6, 2);


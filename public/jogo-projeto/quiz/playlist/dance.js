// script.js
const audio = document.getElementById("audio");
const botaoPlay = document.getElementById("botao-play");
const titulo = document.getElementById("titulo");
const barra = document.getElementById("barra");
const tempoAtual = document.getElementById("tempo-atual");
const tempoTotal = document.getElementById("tempo-total");

const musicas = ["../sounds/Maroon-5-Sugar.mp3", "../sounds/Maverick-Sabre-Slow-Down-vintage-culture.mp3", "../sounds/Kings-Of-Leon-Sex-on-Fire.mp3"];
const titulos = ["Maroon 5 - Sugar", "Maverick Sabre - Slow Down", "Kings Of Leon - Sex on Fire"];
let indice = 0;
let tocando = false;

function tocarOuPausar() {
  if (tocando) {
    audio.pause();
    botaoPlay.textContent = "▶️";
  } else {
    audio.play();
    botaoPlay.textContent = "⏸️";
  }
  tocando = !tocando;
}

function avancar() {
  indice = (indice + 1) % musicas.length;
  trocarMusica();
}

function voltar() {
  indice = (indice - 1 + musicas.length) % musicas.length;
  trocarMusica();
}

function trocarMusica() {
  audio.src = musicas[indice];
  titulo.textContent = titulos[indice];
  atualizarLista();
  if (tocando) {
    audio.play();
  } else {
    botaoPlay.textContent = "▶️";
  }
}

function selecionarMusica(i) {
  indice = i;
  trocarMusica();
}

// Atualiza a barra de progresso
audio.addEventListener("timeupdate", () => {
  const porcentagem = (audio.currentTime / audio.duration) * 100;
  barra.style.width = porcentagem + "%";
  tempoAtual.textContent = formatarTempo(audio.currentTime);
  tempoTotal.textContent = formatarTempo(audio.duration);
});

// Clica na barra para mudar a posição
function mudarProgresso(evento) {
  const largura = evento.currentTarget.clientWidth;
  const clique = evento.offsetX;
  const porcentagem = clique / largura;
  audio.currentTime = porcentagem * audio.duration;
}

function formatarTempo(segundos) {
  if (isNaN(segundos)) return "0:00";
  const minutos = Math.floor(segundos / 60);
  const resto = Math.floor(segundos % 60).toString().padStart(2, "0");
  return `${minutos}:${resto}`;
}

function atualizarLista() {
  const itens = document.querySelectorAll("#lista-musicas li");
  itens.forEach((li, i) => {
    li.style.backgroundColor = i === indice ? "#0a0" : "";
  });
}

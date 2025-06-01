const containerDoJogo = document.querySelector('.game-grid');
const exibicaoTentativas = document.querySelector('.attempts-count');
const exibicaoAcertos = document.querySelector('.acertos-count');
const exibicaoErros = document.querySelector('.erros-count');

const somClique = document.getElementById('clickSound');
const somAcerto = document.getElementById('matchSound');
const somErro = document.getElementById('noMatchSound');
const somVitoria = document.getElementById('winSound');
const musicaFundo = document.getElementById('backgroundMusic');
const musicaVitoria = document.getElementById('victoryMusic');
const containerGifVitoria = document.getElementById('victoryGifContainer');
const botaoFecharGifVitoria = document.getElementById('closeVictoryGif');
const botaoPlay = document.getElementById('playButton');

let cartas = [];
let cartasViradas = [];
let paresCorretos = 0;
let tentativas = 0;
let erros = 0;

// Pares de cartas
const paresCartas = [
    { id: 1, tipo: "instrumento", valor: "Guitarra", simbolo: "🎸" },
    { id: 1, tipo: "instrumento", valor: "Guitarra", simbolo: "🎸" },
    { id: 2, tipo: "nota", valor: "Dó", simbolo: "🎵" },
    { id: 2, tipo: "nota", valor: "Dó", simbolo: "🎵" },
    { id: 3, tipo: "instrumento", valor: "Piano", simbolo: "🎹" },
    { id: 3, tipo: "instrumento", valor: "Piano", simbolo: "🎹" },
    { id: 4, tipo: "nota", valor: "Sol", simbolo: "🎶" },
    { id: 4, tipo: "nota", valor: "Sol", simbolo: "🎶" },
];

// Música de fundo
document.addEventListener('DOMContentLoaded', function () {


    if (musicaFundo && botaoPlay) {
        botaoPlay.addEventListener('click', function () {
            if (musicaFundo.paused) {
                musicaFundo.play().catch(erro => console.error("Erro ao tocar música:", erro));
                botaoPlay.textContent = 'Pausar Música';
            } else {
                musicaFundo.pause();
                botaoPlay.textContent = 'Tocar Música';
            }
        });
    }
});

// Fecha o GIF de vitória
botaoFecharGifVitoria.addEventListener('click', function () {
    containerGifVitoria.style.display = 'none';
    musicaVitoria.pause();
    musicaVitoria.currentTime = 0;
    salvarPontuacao(tentativas, paresCorretos, erros);
    reiniciarJogo();
});

// Mostra vitória
function mostrarVitoria() {
    if (musicaVitoria) {
        musicaVitoria.currentTime = 0;
        musicaVitoria.play();
        musicaFundo.pause();
        botaoPlay.textContent = 'Tocar Música';
    }
    containerGifVitoria.style.display = 'block';
    chuvaDeConfetes();
}

// Confetes de vitória
function chuvaDeConfetes() {
    const duracao = 4000;
    const fim = Date.now() + duracao;

    (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < fim) requestAnimationFrame(frame);
    })();
}

// Tocar som
function tocarSom(elementoSom) {
    if (elementoSom) {
        elementoSom.currentTime = 0;
        elementoSom.play();
    }
}

// Embaralhar cartas
function embaralharCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Criar carta
function criarCarta(par) {
    const carta = document.createElement('div');
    carta.classList.add('card');
    carta.dataset.id = par.id;
    carta.dataset.valor = par.valor;

    const frente = document.createElement('div');
    frente.classList.add('card-front');
    frente.textContent = '??';

    const verso = document.createElement('div');
    verso.classList.add('card-back');
    verso.textContent = par.simbolo;

    const conteudo = document.createElement('div');
    conteudo.classList.add('card-inner');
    conteudo.appendChild(frente);
    conteudo.appendChild(verso);

    carta.appendChild(conteudo);
    carta.addEventListener('click', virarCarta);
    return carta;
}

// Preparar o jogo
function prepararJogo() {
    containerDoJogo.innerHTML = '';
    embaralharCartas(paresCartas);
    cartas = [];
    cartasViradas = [];
    paresCorretos = 0;
    tentativas = 0;
    erros = 0;
    exibicaoTentativas.textContent = tentativas;
    exibicaoAcertos.textContent = paresCorretos;
    exibicaoErros.textContent = erros;

    paresCartas.forEach(par => {
        const carta = criarCarta(par);
        cartas.push(carta);
        containerDoJogo.appendChild(carta);
    });
}

// Virar carta
function virarCarta() {
    if (cartasViradas.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        cartasViradas.push(this);
        tocarSom(somClique);

        if (cartasViradas.length === 2) {
            tentativas++;
            exibicaoTentativas.textContent = tentativas;
            setTimeout(verificarPar, 700);
        }
    }
}

// Verificar se é par
function verificarPar() {
    const [carta1, carta2] = cartasViradas;

    if (carta1.dataset.valor === carta2.dataset.valor) {
        tocarSom(somAcerto);
        paresCorretos++;
        exibicaoAcertos.textContent = paresCorretos;
        cartasViradas = [];


        if (paresCorretos === paresCartas.length / 2) {
            setTimeout(() => {
                tocarSom(somVitoria);
                mostrarVitoria();
            }, 400);
        }
    } else {
        tocarSom(somErro);
        erros++;
        exibicaoErros.textContent = erros;
        setTimeout(() => {
            carta1.classList.remove('flipped');
            carta2.classList.remove('flipped');
            cartasViradas = [];
        }, 700);
    }
}

// Reiniciar jogo
function reiniciarJogo() {
    prepararJogo();
}

// Envia os dados para o servidor (API)
function salvarPontuacao( acertos, erros) {
    var fkJogador = Number(sessionStorage.getItem('ID_USUARIO'));
    console.log("Id do jogador:", fkJogador);

if (!sessionStorage.ID_USUARIO || isNaN(Number(sessionStorage.ID_USUARIO))) {
    alert("Jogador não está logado ou ID inválido!");
    return;
}

    fetch("/pontos/cadastrar", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            acertos: acertos,
            erros: erros,
            fkJogador: fkJogador,
        })
    })
        .then(res => {
            if (!res.ok) throw new Error('Erro ao salvar pontuação');
            return res.json();
        })
        .then(dado => {
            console.log('Pontuação salva com sucesso:', dado);
        })
        .catch(erro => {
            console.error('Erro ao enviar pontuação:', erro);
        });
}

prepararJogo();

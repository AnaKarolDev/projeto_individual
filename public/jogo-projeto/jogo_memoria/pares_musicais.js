const gameContainer = document.querySelector('.game-grid');
const attemptsDisplay = document.querySelector('.attempts-count');

const clickSound = document.getElementById('clickSound');
const matchSound = document.getElementById('matchSound');
const noMatchSound = document.getElementById('noMatchSound');
const winSound = document.getElementById('winSound');
const victoryMusic = document.getElementById('victoryMusic');
const victoryGifContainer = document.getElementById('victoryGifContainer');
const closeVictoryGifButton = document.getElementById('closeVictoryGif');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

// Pares de cartas
const cardPairsData = [
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
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playButton = document.getElementById('playButton');

    if (backgroundMusic && playButton) {
        playButton.addEventListener('click', function () {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.error("Erro ao reproduzir música:", error);
                });
                playButton.textContent = 'Pause Música';
            } else {
                backgroundMusic.pause();
                playButton.textContent = 'Play Música';
            }
        });
    }
});

// Para fechar o gif
closeVictoryGifButton.addEventListener('click', function () {
    victoryGifContainer.style.display = 'none';
    resetGame();
});

// Função para mostrar vitória: Música + Confetes + GIF
function mostrarVitoria() {
    if (victoryMusic) {
        victoryMusic.currentTime = 0;
        victoryMusic.play();
    }

    victoryGifContainer.style.display = 'block';
    chuvaDeConfetes();
}

//Função que gera confetes
function chuvaDeConfetes() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Sons
function playSound(soundElement) {
    if (soundElement) {
        soundElement.currentTime = 0;
        soundElement.play();
    }
}

// Função para embaralhar
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para criar cartas
function createCard(pairData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = pairData.id;
    card.dataset.valor = pairData.valor;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = '?';

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = pairData.simbolo;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);
    return card;
}

// Função que monta os pares
function setupGame() {
    gameContainer.innerHTML = '';
    shuffleArray(cardPairsData);
    cards = [];
    matchedPairs = 0;
    attempts = 0;
    flippedCards = [];
    attemptsDisplay.textContent = attempts;

    cardPairsData.forEach(pair => {
        const card = createCard(pair);
        cards.push(card);
        gameContainer.appendChild(card);
    });
}

// Função para virar cartas
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        playSound(clickSound);

        if (flippedCards.length === 2) {
            attempts++;
            attemptsDisplay.textContent = attempts;
            setTimeout(checkMatch, 700);
        }
    }
}

// Função que verificar os pares
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.valor === card2.dataset.valor) {
        playSound(matchSound);
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cardPairsData.length / 2) {
            setTimeout(() => {
                playSound(winSound);
                mostrarVitoria(); // AQUI CHAMA VITÓRIA
            }, 400);
        }
    } else {
        playSound(noMatchSound);
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 700);
    }
}

// Função para resetar o game 
function resetGame() {
    setupGame();
}

// Chamando a função que da start no game 
setupGame();

victoryMusic.pause();
victoryMusic.currentTime = 0;


// Fecha o GIF de vitória e reseta
closeVictoryGifButton.addEventListener('click', function () {
    victoryGifContainer.style.display = 'none';

    // Parar a música de vitória
    if (victoryMusic) {
        victoryMusic.pause();
        victoryMusic.currentTime = 0;
    }

    // Salvar pontuação (mínima e máxima)
    salvarPontuacao(attempts);

    resetGame();
});

function salvarPontuacao(pontuacaoAtual) {
    let menor = localStorage.getItem('menorPontuacao');
    let maior = localStorage.getItem('maiorPontuacao');

    menor = menor ? parseInt(menor) : null;
    maior = maior ? parseInt(maior) : null;

    if (menor === null || pontuacaoAtual < menor) {
        localStorage.setItem('maiorPontuacao', pontuacaoAtual);
        console.log(`Nova melhor pontuação: ${pontuacaoAtual}`);
    }

    if (maior === null || pontuacaoAtual > maior) {
        localStorage.setItem('menorPontuacao', pontuacaoAtual);
        console.log(`Nova menor pontuação: ${pontuacaoAtual}`);
    }

    //      falta enviar para servidor via fetch POST
    //     fetch('/pontos/buscarPontos', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             email: sessionStorage.EMAIL_USUARIO,
    //             maior: localStorage.getItem('maiorPontuacao'),
    //             menor: localStorage.getItem('menorPontuacao')
    //         })
    //     });
}

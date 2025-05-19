const gameContainer = document.querySelector('.game-grid'); // Mudança importante: usar querySelector
const attemptsDisplay = document.querySelector('.attempts-count'); // Mudança importante: querySelector
const clickSound = document.getElementById('clickSound');
const matchSound = document.getElementById('matchSound');
const noMatchSound = document.getElementById('noMatchSound');
const winSound = document.getElementById('winSound');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
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

document.addEventListener('DOMContentLoaded', function() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  const playButton = document.getElementById('playButton');
//   const imagem = document.getElementById('logo_inside');

//   imagem.addEventListener('click'), () => {
//     if(audio.paused){
//     audio.play();
//     } else {
//         audio.pause();
//     }
//   }

  if (backgroundMusic && playButton) {
    playButton.addEventListener('click', function() {
      if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
          console.error("Erro ao reproduzir música:", error);
          // Opcional: exibir uma mensagem ao usuário sobre o problema
        });
        playButton.textContent = 'Pause Música';
      } else {
        backgroundMusic.pause();
        playButton.textContent = 'Play Música';
      }
    });
  }
});
// ... seu código JavaScript existente ...

const victoryGifContainer = document.getElementById('victoryGifContainer');
const closeVictoryGifButton = document.getElementById('closeVictoryGif');

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.dataset.valor === card2.dataset.valor) {
        playSound(matchSound);
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardPairsData.length / 2) {
            playSound(winSound);
            setTimeout(() => {
                // Mostrar o GIF de vitória
                victoryGifContainer.style.display = 'flex';
            }, 500);
        }
    } else {
        playSound(noMatchSound);
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Adiciona um event listener para fechar o GIF
closeVictoryGifButton.addEventListener('click', function() {
    victoryGifContainer.style.display = 'none';
    resetGame(); 
});

function playSound(soundElement) {
    if (soundElement) {
        soundElement.currentTime = 0;
        soundElement.play();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(pairData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = pairData.id;
    card.dataset.valor = pairData.valor; // Importante para a lógica de matching

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

function setupGame() {
    shuffleArray(cardPairsData);
    cardPairsData.forEach(pair => {
        const card = createCard(pair);
        cards.push(card);
        gameContainer.appendChild(card);
    });
     attemptsDisplay.textContent = attempts; // Define o valor inicial de tentativas
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        playSound(clickSound);
        if (flippedCards.length === 2) {
            attempts++;
            attemptsDisplay.textContent = attempts;
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.dataset.valor === card2.dataset.valor) { // Usa o dataset.valor
        playSound(matchSound);
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardPairsData.length / 2) {
            playSound(winSound);
            setTimeout(() => {
                alert(`Parabéns! Você encontrou todos os pares em ${attempts} tentativas.`);
                resetGame(); // Adicionei a função resetGame
            }, 500);
        }
    } else {
        playSound(noMatchSound);
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() { // Função para resetar o jogo
    gameContainer.innerHTML = ''; // Limpa o grid
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    attemptsDisplay.textContent = attempts; // Reseta a exibição de tentativas
    setupGame(); // Reinicia o jogo
}

// Inicializa o jogo quando a página carrega
setupGame();
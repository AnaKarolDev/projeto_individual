const perguntas = [
  {
    id: "q1",
    texto: "1. Como você está se sentindo agora?",
    opcoes: [
      { texto: "Triste ou desanimado(a)", valor: "triste" },
      { texto: "Animado(a)", valor: "animado" },
      { texto: "Estressado(a)", valor: "estressado" },
      { texto: "Pensativo(a)", valor: "pensativo" }
    ]
  },
  {
    id: "q2",
    texto: "2. Que tipo de música te atrai agora?",
    opcoes: [
      { texto: "Calmo e suave", valor: "calmo" },
      { texto: "Dançante", valor: "dancante" },
      { texto: "Intenso e emocional", valor: "intenso" },
      { texto: "Leve e divertido", valor: "leve" }
    ]
  },
  {
    id: "q3",
    texto: "3. O que você gostaria que a música fizesse por você?",
    opcoes: [
      { texto: "Melhorar meu humor", valor: "melhorar" },
      { texto: "Me ajudar a relaxar", valor: "relaxar" },
      { texto: "Me fazer refletir", valor: "pensar" },
      { texto: "Curar o coração", valor: "curar" }
    ]
  }
];

const quizForm = document.getElementById("quizForm");

// Gerar perguntas
perguntas.forEach(pergunta => {
  const container = document.createElement("div");
  container.classList.add("question");

  const titulo = document.createElement("p");
  titulo.textContent = pergunta.texto;
  container.appendChild(titulo);

  pergunta.opcoes.forEach((opcao, index) => {
    const label = document.createElement("label");
    label.style.display = "block";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = pergunta.id; 
    input.value = opcao.valor;
    input.id = `${pergunta.id}_${index}`;

    label.setAttribute("for", input.id);
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opcao.texto));
    container.appendChild(label);
  });

  quizForm.appendChild(container);
});

// Resultado
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const respostas = {};
  let todasRespondidas = true;

  perguntas.forEach(pergunta => {
    const selecionada = document.querySelector(`input[name="${pergunta.id}"]:checked`);
    if (selecionada) {
      respostas[pergunta.id] = selecionada.value;
    } else {
      todasRespondidas = false;
    }
  });

  if (!todasRespondidas) {
    alerta.innerText = "Responda todas as perguntas!";
    setTimeout(function () {
      alerta.style.display = "none";
    }, 3000);
    return;
  }

  const { q1, q2, q3 } = respostas;

  let resultadoPlaylist = "dance";
  
  if (q1 === "triste" || q3 === "curar") {
    resultadoPlaylist = "confort";
  } else if (q1 === "animado" && q2 === "dancante") {
    resultadoPlaylist = "dance";
  } else if (q1 === "estressado" || q3 === "relaxar") {
    resultadoPlaylist = "relax";
  } else if (q1 === "pensativo" || q2 === "intenso") {
    resultadoPlaylist = "reflexao";
  }

  let id = sessionStorage.ID_USUARIO;

  fetch("/quiz/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sentimento: q1,
      tipo_musica: q2,
      objetivo: q3,
      resultado_playlist: resultadoPlaylist,
      fkJogador: id 
    })
  }).then(response => {
    if (response.ok) {
      window.location.href = `./playlist/${resultadoPlaylist}.html`;
    } else {
      alerta.innerText = "Erro ao salvar respostas.";
    }
  });
});


fetch("/quiz/estatisticas")
    .then(res => res.json())
    .then(dados => {
        const playlists = dados.map(item => item.resultado_playlist);
        const totais = dados.map(item => item.total);

        const ctxQuiz = document.getElementById('graficoQuiz').getContext('2d');

        new Chart(ctxQuiz, {
            type: 'doughnut',
            data: {
                labels: playlists,
                datasets: [{
                    label: 'Distribuição das playlists',
                    data: totais,
                    backgroundColor: [
                        '#E60058',
                        '#FF8C42',
                        '#FFD700',
                        '#3CB371',
                        '#1E90FF',
                        '#8A2BE2'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgb(230, 0, 88)'
                        }
                    }
                }
            }
        });
    })
    .catch(erro => console.error("Erro ao carregar estatísticas do quiz:", erro));


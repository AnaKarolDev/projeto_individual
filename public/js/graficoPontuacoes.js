document.addEventListener('DOMContentLoaded', () => {
    const fkJogador = sessionStorage.getItem("FK_JOGADOR");

    if (!fkJogador) {
        alert("Usuário não identificado. Faça login novamente.");
        window.location.href = "/login.html";
        return;
    }

    fetch(`/pontos/ultimos/${fkJogador}`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao buscar dados");
            return res.json();
        })
        .then(dados => {
            if (!dados || dados.length === 0) {
                console.warn("Nenhum dado para exibir no gráfico.");
                return;
            }

            const tentativas = dados.map(d => d.tentativas).reverse();
            const acertos = dados.map(d => d.acertos).reverse();
            const erros = dados.map(d => d.erros).reverse();
            const momentos = dados.map(d => d.momento).reverse();

            const ctx = document.getElementById("graficoPontuacoes").getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: momentos,
                    datasets: [
                        { label: "Tentativas", data: tentativas, backgroundColor: "#ffcd56" },
                        { label: "Acertos", data: acertos, backgroundColor: "#4bc0c0" },
                        { label: "Erros", data: erros, backgroundColor: "#ff6384" }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Histórico de Desempenho'
                        }
                    }
                }
            });
        })
        .catch(erro => {
            console.error("Erro ao carregar gráfico:", erro);
        });
});

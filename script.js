let cardContainer = document.querySelector(".card-container");
let dados = [];

// Função para carregar os dados do JSON apenas uma vez
async function carregarDados() {
  try {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Exibe todos os cards inicialmente
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

function IniciarBusca() {
  const termoBusca = document.getElementById("campo-busca").value.toLowerCase();

  if (termoBusca === "") {
    renderizarCards(dados); // Se a busca estiver vazia, mostra todos
    return;
  }

  const resultados = dados.filter((dado) =>
    dado.nome.toLowerCase().includes(termoBusca)
  );
  renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
  cardContainer.innerHTML = "";

  for (let dado of cardsParaRenderizar) {
    let article = document.createElement("article");
    article.classList.add("card");

    article.innerHTML = `
            <div class="card-image">
                <img src="${dado.capa_link}" alt="Capa de ${dado.nome}">
            </div>
            <div class="card-content">
                <h2>${dado.nome}</h2>

                <div class="imdb-badge">
                    ⭐ ${dado.nota_imdb}
                </div>

                <p class="data-lancamento"><strong>Lançamento:</strong> ${dado.data_lancamento}</p>
                <p class="sinopse">${dado.sinopse}</p>
                <p class="premiacoes"><strong>Premiações:</strong> ${dado.premiacoes}</p>
                <a class="trailer-btn" href="${dado.trailer_pt}" target="_blank">
                    🎬 Trailer Oficial
                </a>
            </div>
        `;

    cardContainer.appendChild(article);
  }
}

// Carrega os dados assim que a página é aberta
window.onload = carregarDados;

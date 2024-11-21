const BASE_URL = "http://127.0.0.1:8080/apis/ad"; // Ajuste o endereço para o backend

// Função para buscar anúncios com filtros
async function searchAds() {
    const title = document.getElementById("title").value; // Filtro pelo título
    const minPrice = document.getElementById("minPrice").value; // Filtro pelo preço mínimo
    const maxPrice = document.getElementById("maxPrice").value; // Filtro pelo preço máximo
    const sortBy = document.getElementById("sortBy").value; // Ordenação

    const queryParams = new URLSearchParams();

    if (title) queryParams.append("title", title); // Adiciona o título como filtro
    if (minPrice) queryParams.append("minPrice", minPrice); // Adiciona o preço mínimo
    if (maxPrice) queryParams.append("maxPrice", maxPrice); // Adiciona o preço máximo
    if (sortBy) queryParams.append("sortBy", sortBy); // Adiciona a ordenação

    try {
        const response = await axios.get(`${BASE_URL}/get-with-filter?${queryParams.toString()}`);
        renderResults(response.data); // Renderiza os resultados no frontend
    } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
    }
}

// Função para renderizar os resultados
function renderResults(ads) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Limpa os resultados anteriores

    if (ads.length === 0) {
        resultsDiv.innerHTML = "<p>Nenhum anúncio encontrado.</p>";
        return;
    }

    ads.forEach((ad) => {
        const card = `
            <div class="product-card">
                <h5>${ad.title}</h5>
                <p class="product-price">R$ ${ad.price.toFixed(2)}</p>
                <p>${ad.descr}</p>
            </div>
        `;
        resultsDiv.insertAdjacentHTML("beforeend", card); // Insere o anúncio como HTML
    });
}

// Adiciona o evento ao botão de buscar
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    searchAds(); // Chama a função de busca
});

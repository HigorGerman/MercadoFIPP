async function fetchLatestAds() {
    try {
        // Faz a requisição para o backend
        const response = await axios.get('http://localhost:8080/apis/ad/get-latest');

        // Obtém os dados da resposta
        const ads = response.data;

        // Verifica se a resposta é um array
        if (!Array.isArray(ads)) {
            console.error("Os anúncios retornados não são um array:", ads);
            return; // Sai da função se não for um array
        }

        // Renderizar os anúncios nos cards
        const adsContainer = document.getElementById("latest-ads");
        adsContainer.innerHTML = ""; // Limpa o container antes de adicionar novos anúncios

        ads.forEach(ad => {
            const card = `
                <div class="product-card">
                    <img src="http://localhost:8080/uploads/photos/${ad.fotos?.[0]?.filename || 'placeholder.jpg'}" 
                         alt="Imagem do Produto" 
                         style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="product-info">
                        <h5>${ad.title}</h5>
                        <p>${ad.descr || 'Sem descrição'}</p>
                        <p class="product-price">R$ ${ad.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            adsContainer.innerHTML += card;
        });

        // Renderizar os anúncios na tabela
        const tableBody = document.getElementById("detailed-ads");
        tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos anúncios

        ads.forEach(ad => {
            const row = `
                <tr onclick="navigateToDetails(${ad.id})" style="cursor: pointer;">
                    <td>${ad.title}</td>
                    <td>${ad.descr || 'Sem descrição'}</td>
                    <td>${ad.category?.name || 'Sem categoria'}</td>
                    <td>R$ ${ad.price.toFixed(2)}</td>
                    <td>${ad.date || 'Data não disponível'}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        // Trata erros de requisição
        console.error("Erro ao buscar anúncios:", error);

        // Exibe uma mensagem de erro amigável na tela, se necessário
        const adsContainer = document.getElementById("latest-ads");
        adsContainer.innerHTML = `<p class="text-danger">Não foi possível carregar os anúncios. Tente novamente mais tarde.</p>`;
    }
}

// Função para navegar para a página de detalhes do anúncio
function navigateToDetails(adId) {
    window.location.href = `DetalhesAnuncio.html?adId=${adId}`;
}

// Chama a função ao carregar a página
fetchLatestAds();

// index.js
async function fetchLatestAds() {
    try {
        const response = await axios.get('http://localhost:8080/apis/ad/latest');
        const ads = response.data;

        // Renderizar os anúncios nos cards
        const adsContainer = document.getElementById("latest-ads");
        adsContainer.innerHTML = "";

        ads.forEach(ad => {
            const card = `
                <div class="product-card">
                    <img src="uploads/photos/${ad.fotos?.[0]?.filename || 'placeholder.jpg'}" alt="Imagem do Produto" style="width: 100%; height: 200px; object-fit: cover;">
                    <div class="product-info">
                        <h5>${ad.title}</h5>
                        <p>${ad.descr}</p>
                        <p class="product-price">R$ ${ad.price.toFixed(2)}</p>
                        <a href="interacao.html?adId=${ad.id}" class="btn btn-primary">Falar com Vendedor</a>
                    </div>
                </div>
            `;
            adsContainer.innerHTML += card;
        });

        // Renderizar os anúncios na tabela
        const tableBody = document.getElementById("detailed-ads");
        tableBody.innerHTML = "";

        ads.forEach(ad => {
            const row = `
                <tr>
                    <td>${ad.title}</td>
                    <td>${ad.descr}</td>
                    <td>${ad.category.name}</td>
                    <td>R$ ${ad.price.toFixed(2)}</td>
                    <td>${ad.date}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
    }
}

// Chama a função ao carregar a página
fetchLatestAds();

// Atualiza a navbar com base no estado de login
function updateNavbarForLoggedUser() {
    const userName = localStorage.getItem('userName'); // Obtém o nome do usuário do localStorage
    const navbarActions = document.getElementById('navbar-user-actions');

    if (userName) {
        navbarActions.innerHTML = `
            <span class="navbar-text mr-3">Olá, ${userName}!</span>
            <a href="BuscaAnuncio.html" class="btn btn-outline-light mr-2">Buscar</a>
            <a href="CadastroAnuncio.html" class="btn btn-outline-light mr-2">Cadastrar Produto</a>
            <button id="logout-btn" class="btn btn-outline-light">Sair</button>
            <a href="loginAdm.html" class="btn btn-outline-light ml-2">Administrativo</a>
            <a href="loginVendedor.html" class="btn btn-outline-light ml-2">Vendedor</a>
        `;

        // Configura o botão de logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('userName'); // Remove o nome do usuário
            window.location.href = "index.html"; // Redireciona para a página principal
        });
    } else {
        navbarActions.innerHTML = `
            <a href="login.html" class="btn btn-outline-light mr-2">Login</a>
            <a href="cadastroUser.html" class="btn btn-outline-light">Cadastro</a>
            <a href="loginAdm.html" class="btn btn-outline-light ml-2">Administrativo</a>
            <a href="loginVendedor.html" class="btn btn-outline-light ml-2">Vendedor</a>
        `;
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', updateNavbarForLoggedUser);

// Função para buscar e exibir anúncios
async function fetchAds() {
    try {
        // Busca os últimos 5 anúncios para os cards
        const latestResponse = await axios.get('http://localhost:8080/apis/ad/get-latest?limit=5');
        const latestAds = latestResponse.data;

        // Verifica se os últimos anúncios são válidos
        if (Array.isArray(latestAds)) {
            const adsContainer = document.getElementById("latest-ads");
            adsContainer.innerHTML = ""; // Limpa o container

            // Renderiza os últimos 5 anúncios nos cards
            latestAds.forEach(ad => {
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
        }

        // Busca todos os anúncios para a tabela
        const allResponse = await axios.get('http://localhost:8080/apis/ad/get-many');
        const allAds = allResponse.data;

        // Verifica se todos os anúncios são válidos
        if (Array.isArray(allAds)) {
            const tableBody = document.getElementById("detailed-ads");
            tableBody.innerHTML = ""; // Limpa a tabela

            // Renderiza todos os anúncios na tabela
            allAds.forEach(ad => {
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
        }
    } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
        const adsContainer = document.getElementById("latest-ads");
        adsContainer.innerHTML = `<p class="text-danger">Não foi possível carregar os anúncios. Tente novamente mais tarde.</p>`;
    }
}

// Função para redirecionar para detalhes do anúncio
function navigateToDetails(adId) {
    window.location.href = `DetalhesAnuncio.html?adId=${adId}`;
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarForLoggedUser(); // Atualiza a navbar
    fetchAds(); // Carrega os anúncios
});

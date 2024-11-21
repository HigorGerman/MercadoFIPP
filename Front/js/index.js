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
        `;
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', updateNavbarForLoggedUser);


// Função para buscar e exibir anúncios
async function fetchLatestAds() {
    try {
        const response = await axios.get('http://localhost:8080/apis/ad/get-latest');
        const ads = response.data;

        if (!Array.isArray(ads)) {
            console.error("Os anúncios retornados não são um array:", ads);
            return;
        }

        // Renderiza anúncios nos cards
        const adsContainer = document.getElementById("latest-ads");
        adsContainer.innerHTML = ""; // Limpa o container

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

        // Renderiza anúncios na tabela
        const tableBody = document.getElementById("detailed-ads");
        tableBody.innerHTML = ""; // Limpa a tabela

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
    fetchLatestAds(); // Carrega os anúncios
});

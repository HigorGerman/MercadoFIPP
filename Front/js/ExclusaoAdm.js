document.addEventListener('DOMContentLoaded', async () => {
    // Carregar usuários
    await loadUsers();

    // Carregar anúncios
    await loadAds();
});

async function loadUsers() {
    try {
        const response = await fetch('http://localhost:8080/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const users = await response.json();
            const adminContent = document.getElementById('adminContent');
            adminContent.innerHTML = `
                <h3>Usuários Cadastrados</h3>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Nível</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.level.toUpperCase()}</td>
                                <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Excluir</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

async function loadAds() {
    try {
        const response = await fetch('http://localhost:8080/apis/ad/get-many', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const ads = await response.json();
            const adsContent = document.getElementById('adsContent');
            adsContent.innerHTML = `
                <h3>Anúncios Cadastrados</h3>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ads.map(ad => `
                            <tr>
                                <td>${ad.title}</td>
                                <td>R$ ${ad.price.toFixed(2)}</td>
                                <td>${ad.descr}</td>
                                <td><button class="btn btn-danger" onclick="deleteAd(${ad.id})">Excluir</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:8080/admin/users/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Usuário excluído com sucesso!');
            location.reload(); // Recarrega a página
        } else {
            alert('Erro ao excluir usuário.');
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

async function deleteAd(adId) {
    try {
        const response = await fetch(`http://localhost:8080/apis/ad/delete?id=${adId}`, {
            method: 'GET',
        });

        if (response.ok) {
            alert('Anúncio excluído com sucesso!');
            location.reload(); // Recarrega a página
        } else {
            alert('Erro ao excluir anúncio.');
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

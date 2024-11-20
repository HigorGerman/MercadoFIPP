document.addEventListener('DOMContentLoaded', async () => {
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
        console.error('Erro ao carregar dados:', error);
    }
});

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

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const accessLevel = document.getElementById('accessLevel').value;

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
        document.getElementById('errorMessage').textContent = "As senhas não coincidem.";
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }

    const userData = {
        name: username,
        pass: password,
        level: accessLevel,
    };

    try {
        const response = await fetch('http://localhost:8080/access/register', { // Altere a URL para o backend no deploy
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            document.getElementById('successMessage').style.display = 'block'; // Exibe mensagem de sucesso
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('registerForm').reset(); // Limpa o formulário
        } else {
            const errorResponse = await response.json();
            document.getElementById('errorMessage').textContent = errorResponse.error || "Erro ao cadastrar o usuário.";
            document.getElementById('errorMessage').style.display = 'block'; // Exibe mensagem de erro
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
        document.getElementById('errorMessage').textContent = "Erro ao conectar-se ao servidor.";
        document.getElementById('errorMessage').style.display = 'block';
    }
});

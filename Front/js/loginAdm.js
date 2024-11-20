document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        user: username,
        pass: password,
    };

    try {
        const response = await fetch('http://localhost:8080/access/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Bem-vindo, administrador ${result.username}!`);
            window.location.href = "AdmTela.html"; // Alterado para a tela correta
        } else {
            document.getElementById('errorMessage').textContent = "Credenciais inválidas.";
            document.getElementById('errorMessage').style.display = 'block';
        }
        
    } catch (error) {
        console.error('Erro na solicitação:', error);
        document.getElementById('errorMessage').textContent = "Erro ao conectar-se ao servidor.";
        document.getElementById('errorMessage').style.display = 'block';
    }
});

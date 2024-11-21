document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        user: username,
        pass: password,
    };

    try {
        const response = await fetch('http://localhost:8080/access/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const result = await response.json();

            // Salva o nome do usuário no localStorage
            localStorage.setItem('userName', result.username);

            alert(`Bem-vindo, ${result.username}!`);
            window.location.href = "index.html"; // Redireciona para a página principal
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

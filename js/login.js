document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("/access/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password: senha })
            });

            if (response.ok) {
                const message = await response.text(); 
                alert(message);
                window.location.href = "index.html"; 
            } else {
                const error = await response.text();
                alert("Erro: " + error); 
            }
        } catch (error) {
            alert("Erro ao conectar ao servidor: " + error.message);
        }
    });
});

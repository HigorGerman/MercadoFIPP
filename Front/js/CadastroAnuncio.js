async function cadastrarAnuncio(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura os dados do formulário
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const valor = document.getElementById("valor").value;
    const data = document.getElementById("data").value;
    const fotos = document.getElementById("fotos").files;

    // Cria o objeto de anúncio
    const anuncio = {
        title: titulo,
        descr: descricao,
        price: parseFloat(valor),
        date: data,
        category: { id: parseInt(categoria) },
        user: { id: 1 } // Substitua pelo ID do usuário logado
    };

    // Cria o objeto FormData para envio dos dados como multipart/form-data
    const formData = new FormData();
    formData.append("ad", new Blob([JSON.stringify(anuncio)], { type: "application/json" }));

    // Adiciona os arquivos ao FormData
    for (let i = 0; i < fotos.length; i++) {
        formData.append("files", fotos[i]);
    }

    try {
        // Faz a requisição ao backend
        const response = await axios.post("http://localhost:8080apis/ad/add-with-photos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            alert("Anúncio cadastrado com sucesso!");
            window.location.href = "index.html"; // Redireciona para a página inicial ou outra página desejada
        } else {
            alert(`Erro ao cadastrar anúncio: ${response.data}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar anúncio:", error);
        alert("Erro ao cadastrar anúncio. Verifique os dados e tente novamente.");
    }
}

async function cadastrarAnuncio(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const valor = document.getElementById("valor").value;
    const data = document.getElementById("data").value;
    const fotos = document.getElementById("fotos").files;

    const anuncio = {
        title: titulo,
        descr: descricao,
        price: parseFloat(valor),
        date: data,
        category: { id: parseInt(categoria) },
        user: { id: 1 } // Substitua pelo ID do usuário logado
    };

    const formData = new FormData();
    formData.append("ad", new Blob([JSON.stringify(anuncio)], { type: "application/json" }));

    for (let i = 0; i < fotos.length; i++) {
        formData.append("files", fotos[i]);
    }

    try {
        const response = await axios.post("http://localhost:8080/apis/ad/add-with-photos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            alert("Anúncio cadastrado com sucesso!");
        } else {
            alert(`Erro: ${response.data}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar anúncio:", error);
        alert("Erro ao cadastrar anúncio.");
    }
}
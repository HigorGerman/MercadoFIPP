// Captura o ID do anúncio da URL
function getAdIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('adId');
}

// Carrega os detalhes do anúncio
async function loadAdDetails() {
    const adId = getAdIdFromUrl();
    if (!adId) {
        console.error('Ad ID não encontrado na URL.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/apis/ad/get-one?id=${adId}`);
        const ad = await response.json();

        // Atualize os elementos da página com os dados do anúncio
        document.getElementById('ad-title').innerText = ad.title;
        document.getElementById('ad-description').innerText = ad.descr || 'Descrição não disponível';
        document.getElementById('ad-price').innerText = ad.price.toFixed(2);
        document.getElementById('ad-category').innerText = ad.category?.name || 'Sem categoria';
        document.getElementById('ad-date').innerText = ad.date || 'Data não disponível';

        // Carregar perguntas relacionadas ao anúncio
        loadQuestions(adId);
    } catch (error) {
        console.error('Erro ao carregar os detalhes do anúncio:', error);
    }
}

// Carrega as perguntas do anúncio
async function loadQuestions(adId) {
    try {
        const response = await fetch(`http://localhost:8080/apis/ad/questions-by-ad?adId=${adId}`);
        const questions = await response.json();

        const questionsContainer = document.getElementById('ad-questions');
        questionsContainer.innerHTML = '';

        if (questions.length === 0) {
            questionsContainer.innerHTML = '<p>Não há perguntas para este anúncio.</p>';
            return;
        }

        questions.forEach(question => {
            const questionHtml = `
                <div class="question">
                    <p><strong>Pergunta:</strong> ${question.text}</p>
                    <p><strong>Resposta:</strong> ${question.resp || 'Ainda não respondida'}</p>
                </div>
                <hr>
            `;
            questionsContainer.innerHTML += questionHtml;
        });
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
        document.getElementById('ad-questions').innerHTML = '<p>Erro ao carregar perguntas. Tente novamente mais tarde.</p>';
    }
}

// Função para enviar uma nova pergunta
async function sendQuestion(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const adId = getAdIdFromUrl();
    const questionText = document.getElementById('question-text').value.trim();

    if (!questionText) {
        alert('A pergunta não pode estar vazia!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/apis/ad/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: questionText,
                ad: { id: adId }, // Associação com o anúncio
            }),
        });

        if (response.ok) {
            alert('Pergunta enviada com sucesso!');
            document.getElementById('question-text').value = ''; // Limpa o campo de texto
            loadQuestions(adId); // Recarrega as perguntas
        } else {
            alert('Erro ao enviar a pergunta.');
        }
    } catch (error) {
        console.error('Erro ao enviar a pergunta:', error);
    }
}

// Carregar detalhes do anúncio ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadAdDetails();

    // Adicionar evento ao formulário de perguntas
    const questionForm = document.getElementById('question-form');
    questionForm.addEventListener('submit', sendQuestion);
});

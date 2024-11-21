async function loadPendingQuestions(adId) {
    try {
        const response = await fetch(`http://localhost:8080/apis/ad/questions-by-ad?adId=${adId}`);
        const questions = await response.json();

        const tableBody = document.getElementById('questions-table');
        tableBody.innerHTML = '';

        questions.forEach(question => {
            if (!question.resp) { // Exibe apenas perguntas sem resposta
                const row = `
                    <tr>
                        <td>${question.ad.title}</td>
                        <td>${question.text}</td>
                        <td>
                            <button class="btn btn-primary" onclick="answerQuestion(${question.id})">Responder</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            }
        });

        if (!questions.some(q => !q.resp)) {
            tableBody.innerHTML = '<tr><td colspan="3">Nenhuma pergunta pendente.</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar perguntas pendentes:', error);
    }
}

async function answerQuestion(questionId) {
    const responseText = prompt('Digite sua resposta:');
    if (!responseText) return;

    try {
        const response = await fetch(`http://localhost:8080/apis/ad/answer-question?questionId=${questionId}&response=${responseText}`, {
            method: 'POST',
        });

        if (response.ok) {
            alert('Resposta enviada com sucesso!');
            loadPendingQuestions(); // Recarrega as perguntas
        } else {
            alert('Erro ao enviar resposta.');
        }
    } catch (error) {
        console.error('Erro ao responder pergunta:', error);
    }
}

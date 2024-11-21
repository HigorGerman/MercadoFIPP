document.addEventListener('DOMContentLoaded', async () => {
    await loadQuestions();
});

// Carregar perguntas pendentes
async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:8080/apis/ad/questions-pending', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const questions = await response.json();
            const questionsContent = document.getElementById('questionsContent');
            questionsContent.innerHTML = `
                <h3>Perguntas Pendentes</h3>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Anúncio</th>
                            <th>Pergunta</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${questions.map(question => `
                            <tr>
                                <td>${question.ad.title}</td>
                                <td>${question.text}</td>
                                <td>
                                    <button class="btn btn-success" onclick="answerQuestion(${question.id})">Responder</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

// Responder pergunta
async function answerQuestion(questionId) {
    const responseText = prompt('Digite sua resposta:');
    if (!responseText) return;

    try {
        const response = await fetch(`http://localhost:8080/apis/ad/answer-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId,
                response: responseText,
            }),
        });

        if (response.ok) {
            alert('Resposta enviada com sucesso!');
            await loadQuestions(); // Recarrega as perguntas pendentes
        } else {
            alert('Erro ao enviar a resposta.');
        }
    } catch (error) {
        console.error('Erro ao enviar a resposta:', error);
    }
}

// Array com 20 perguntas sobre animes
const questions = [
    { q: "Qual é o nome da raposa de nove caudas selada em Naruto?", options: ["Shukaku", "Kurama", "Matatabi", "Gyuki"], answer: "Kurama" },
    { q: "Qual o objetivo principal de Monkey D. Luffy em One Piece?", options: ["Ser o Rei dos Piratas", "Encontrar o All Blue", "Destruir a Marinha", "Mapear o mundo"], answer: "Ser o Rei dos Piratas" },
    { q: "Qual o nome do Death Note de Light Yagami pertencia a qual Shinigami?", options: ["Rem", "Gelus", "Ryuk", "Sidoh"], answer: "Ryuk" },
    { q: "Em Attack on Titan, qual foi a primeira muralha a ser destruída?", options: ["Rose", "Sina", "Maria", "Titan"], answer: "Maria" },
    { q: "Qual é a raça do protagonista Goku em Dragon Ball?", options: ["Terráqueo", "Namekuseijin", "Saiyajin", "Majin"], answer: "Saiyajin" },
    { q: "Quem é o alquimista de aço em Fullmetal Alchemist?", options: ["Alphonse Elric", "Roy Mustang", "Edward Elric", "Maes Hughes"], answer: "Edward Elric" },
    { q: "Como se chama a irmã de Tanjiro transformada em oni em Demon Slayer?", options: ["Kanao", "Nezuko", "Mitsuri", "Shinobu"], answer: "Nezuko" },
    { q: "Qual é o nome da individualidade (poder) que Deku recebe em Boku no Hero Academia?", options: ["All For One", "One For All", "Half-Cold Half-Hot", "Explosion"], answer: "One For All" },
    { q: "Em Hunter x Hunter, quem é o melhor amigo de Gon?", options: ["Kurapika", "Leorio", "Killua", "Hisoka"], answer: "Killua" },
    { q: "Qual o nome do protagonista em Sword Art Online (SAO)?", options: ["Klein", "Agil", "Kirito", "Eugeo"], answer: "Kirito" },
    { q: "Em Bleach, como é chamada a espada usada pelos Shinigamis?", options: ["Zanpakuto", "Kunai", "Katana Espiritual", "Bankai"], answer: "Zanpakuto" },
    { q: "Em Tokyo Ghoul, quem é o protagonista que vira meio-ghoul?", options: ["Hide", "Touka", "Amon", "Ken Kaneki"], answer: "Ken Kaneki" },
    { q: "Em Jujutsu Kaisen, Yuji Itadori engole o dedo de qual maldição?", options: ["Mahito", "Jogo", "Ryomen Sukuna", "Hanami"], answer: "Ryomen Sukuna" },
    { q: "Quem foi o primeiro JoJo em JoJo's Bizarre Adventure?", options: ["Joseph", "Jotaro", "Jonathan", "Josuke"], answer: "Jonathan" },
    { q: "Em Pokémon, qual foi o primeiro pokémon de Ash Ketchum?", options: ["Charmander", "Bulbasaur", "Squirtle", "Pikachu"], answer: "Pikachu" },
    { q: "No anime Spy x Family, qual é o poder secreto de Anya?", options: ["Ficar invisível", "Ler mentes", "Teletransporte", "Super força"], answer: "Ler mentes" },
    { q: "Em One Punch Man, quem é o ciborgue discípulo de Saitama?", options: ["Bang", "King", "Genos", "Garou"], answer: "Genos" },
    { q: "Qual é o nome do robô (mecha) pilotado por Shinji em Evangelion?", options: ["Gundam", "EVA-01", "Gurren Lagann", "Code Geass"], answer: "EVA-01" },
    { q: "No anime Cowboy Bebop, qual é o nome da nave espacial dos protagonistas?", options: ["Swordfish", "Bebop", "Red Tail", "Hammerhead"], answer: "Bebop" },
    { q: "Em Sailor Moon, qual é o nome da gata conselheira de Usagi?", options: ["Artemis", "Diana", "Luna", "Kiki"], answer: "Luna" }
];

// Variáveis de controle
let currentQuestionIndex = 0;
let score = 0;

// Seleção de elementos do DOM
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const questionNumberDisplay = document.getElementById('question-number');
const scoreRealtimeDisplay = document.getElementById('score-realtime');
const feedbackDisplay = document.getElementById('feedback');
const finalScoreDisplay = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

// Evitar envio de formulário padrão
document.getElementById('options-form').addEventListener('submit', (e) => e.preventDefault());

// Inicializa a primeira pergunta
function loadQuestion() {
    const currentQ = questions[currentQuestionIndex];
    
    // Atualiza cabeçalho
    questionNumberDisplay.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    scoreRealtimeDisplay.innerText = `Pontos: ${score}`;
    questionText.innerText = currentQ.q;
    feedbackDisplay.innerText = "";
    
    // Limpa opções anteriores e desabilita botão "Próximo"
    optionsContainer.innerHTML = '';
    nextBtn.disabled = true;

    // Cria os botões para as alternativas
    currentQ.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        // Evento de clique na alternativa
        button.addEventListener('click', () => selectAnswer(button, option, currentQ.answer));
        optionsContainer.appendChild(button);
    });
}

// Lida com a seleção da resposta
function selectAnswer(selectedButton, selectedText, correctAnswer) {
    // Desabilita todos os botões para o usuário não clicar novamente
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    // Validação em tempo real
    if (selectedText === correctAnswer) {
        selectedButton.classList.add('correct');
        feedbackDisplay.innerText = "🎉 Resposta Correta!";
        feedbackDisplay.style.color = "#28a745";
        score++;
        scoreRealtimeDisplay.innerText = `Pontos: ${score}`;
    } else {
        selectedButton.classList.add('wrong');
        feedbackDisplay.innerText = "❌ Resposta Errada!";
        feedbackDisplay.style.color = "#dc3545";
        
        // Pinta a correta de verde para o usuário saber
        allButtons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Libera botão "Próximo"
    nextBtn.disabled = false;
}

// Avança para a próxima ou finaliza
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Mostra a tela final
function showResults() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    finalScoreDisplay.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    
    // Mensagem de acordo com o desempenho
    if (score === 20) {
        resultMessage.innerText = "Lendário! Você é um verdadeiro Mestre Otaku! 🏆";
    } else if (score >= 15) {
        resultMessage.innerText = "Incrível! Seus conhecimentos de animes são fortíssimos! 🌟";
    } else if (score >= 10) {
        resultMessage.innerText = "Bom! Você conhece os clássicos, mas ainda tem muito anime pra ver! 📺";
    } else {
        resultMessage.innerText = "Precisa maratonar mais animes! Pegue a pipoca e bora assistir! 🍿";
    }
}

// Reinicia o quiz
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    loadQuestion();
});

// Começa o Quiz chamando a primeira questão
loadQuestion();
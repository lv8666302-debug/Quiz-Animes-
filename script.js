// Banco de 20 Questões de Animes
const questions = [
    { question: "Qual é o nome da raposa de nove caudas selada em Naruto?", options: ["Shukaku", "Kurama", "Gyuki", "Matatabi"], answer: 1 },
    { question: "Em 'Death Note', qual é o nome do Shinigami que deixa o caderno cair?", options: ["Rem", "Sidoh", "Ryuk", "Gelus"], answer: 2 },
    { question: "Qual é a Akuma no Mi (Fruta do Diabo) do Monkey D. Luffy?", options: ["Mera Mera no Mi", "Gomu Gomu no Mi", "Ope Ope no Mi", "Bara Bara no Mi"], answer: 1 },
    { question: "Qual é o verdadeiro nome do Titã Colossal original em Attack on Titan?", options: ["Reiner Braun", "Zeke Yeager", "Armin Arlert", "Bertholdt Hoover"], answer: 3 },
    { question: "Quantas Esferas do Dragão existem no planeta Terra?", options: ["5", "7", "9", "12"], answer: 1 },
    { question: "Qual é o objetivo principal de Edward e Alphonse em Fullmetal Alchemist?", options: ["Matar os Homunculus", "Recuperar seus corpos", "Se tornarem deuses", "Destruir a Pedra Filosofal"], answer: 1 },
    { question: "Qual o nome da respiração inicial usada por Tanjiro em Demon Slayer?", options: ["Respiração do Sol", "Respiração do Fogo", "Respiração da Água", "Respiração do Trovão"], answer: 2 },
    { question: "Em Hunter x Hunter, qual é o nome do melhor amigo de Gon?", options: ["Kurapika", "Leorio", "Hisoka", "Killua"], answer: 3 },
    { question: "Qual o nome do herói número 1 no início de My Hero Academia?", options: ["Endeavor", "All Might", "Hawks", "Best Jeanist"], answer: 1 },
    { question: "Como se chama a energia espiritual usada em Jujutsu Kaisen?", options: ["Chakra", "Nen", "Energia Amaldiçoada", "Ki"], answer: 2 },
    { question: "Quem foi o responsável por aniquilar o Clã Uchiha?", options: ["Madara Uchiha", "Sasuke Uchiha", "Obito Uchiha", "Itachi Uchiha"], answer: 3 },
    { question: "Qual é o nome do esporte praticado no anime Haikyuu!!?", options: ["Basquete", "Vôlei", "Futebol", "Tênis"], answer: 1 },
    { question: "No anime Bleach, qual é o nome da espada de Ichigo?", options: ["Zangetsu", "Senbonzakura", "Kyoka Suigetsu", "Hyorinmaru"], answer: 0 },
    { question: "Quem é o Rei dos Piratas em One Piece?", options: ["Barba Branca", "Gol D. Roger", "Shanks", "Luffy"], answer: 1 },
    { question: "Qual o nome do Stand de Jotaro Kujo em JoJo's Bizarre Adventure?", options: ["The World", "Crazy Diamond", "Star Platinum", "Gold Experience"], answer: 2 },
    { question: "Em Sword Art Online, qual é o nome do protagonista?", options: ["Kirito", "Eugeo", "Klein", "Agil"], answer: 0 },
    { question: "Qual estúdio animou as primeiras temporadas de Attack on Titan?", options: ["MAPPA", "Ufotable", "Wit Studio", "Madhouse"], answer: 2 },
    { question: "Em Tokyo Ghoul, quem implanta os órgãos da Rize no Kaneki?", options: ["Dr. Kanou", "Yoshimura", "Tsukiyama", "Touka"], answer: 0 },
    { question: "Qual é o nome do dragão que realiza desejos na Terra em Dragon Ball?", options: ["Porunga", "Shenlong", "Super Shenlong", "Acnologia"], answer: 1 },
    { question: "Quem é o autor do mangá de One Piece?", options: ["Masashi Kishimoto", "Akira Toriyama", "Tite Kubo", "Eiichiro Oda"], answer: 3 }
];

// Variáveis de Controle
let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionTracker = document.getElementById('question-tracker');
const scoreTracker = document.getElementById('score-tracker');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('final-score');
const otakuLevel = document.getElementById('otaku-level');
const levelDescription = document.getElementById('level-description');

// Event Listeners dos botões
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

// Função para iniciar
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateScoreTracker();
    loadQuestion();
}

// Carregar a pergunta atual
function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionTracker.textContent = `Questão ${currentQuestionIndex + 1}/${questions.length}`;
    
    // Atualizar Barra de Progresso
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Criar botões das opções
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn', 'text-left', 'w-full', 'py-3', 'px-6', 'rounded-xl', 'font-medium');
        button.addEventListener('click', () => selectAnswer(button, index, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });

    // Resetar animação de entrada da questão
    quizScreen.classList.remove('slide-in');
    void quizScreen.offsetWidth; // Trigger reflow
    quizScreen.classList.add('slide-in');
}

// Limpar botões anteriores
function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Lógica de seleção e feedback imediato
function selectAnswer(selectedButton, selectedIndex, correctIndex) {
    const buttons = optionsContainer.querySelectorAll('button');
    
    // Desabilitar todos os botões para não clicarem duas vezes
    buttons.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
        selectedButton.classList.add('correct-ans');
        score++;
        updateScoreTracker();
    } else {
        selectedButton.classList.add('wrong-ans');
        // Mostrar a resposta certa em verde
        buttons[correctIndex].classList.add('correct-ans');
    }

    // Aguardar 1 segundo para mostrar o feedback antes de ir pra próxima
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showEndScreen();
        }
    }, 1200);
}

function updateScoreTracker() {
    scoreTracker.textContent = `Pontos: ${score}`;
}

// Tela Final e Cálculo do Nível
function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    progressBar.style.width = `100%`;
    finalScore.textContent = `${score} / ${questions.length}`;

    // Determinar o Nível Otaku
    let level = "";
    let colorClass = "";
    let desc = "";

    if (score <= 5) {
        level = "Normie";
        colorClass = "text-gray-400";
        desc = "Você provavelmente só assistiu Pokémon na TV Globinho. Tá na hora de maratonar uns shounens!";
    } else if (score <= 12) {
        level = "Genin";
        colorClass = "text-green-400";
        desc = "Você conhece os clássicos, mas ainda tem muito filler pela frente para treinar.";
    } else if (score <= 18) {
        level = "Jounin";
        colorClass = "text-purple-400";
        desc = "Impressionante! Seu conhecimento de animes é vasto. Você com certeza não dorme no final de semana.";
    } else {
        level = "Hokage / Deus do Novo Mundo";
        colorClass = "text-yellow-400";
        desc = "Perfeito! Você assiste anime sem legenda, não pula as aberturas e tem o selo de Otaku Supremo!";
    }

    otakuLevel.textContent = level;
    otakuLevel.className = `text-3xl font-black uppercase tracking-wider ${colorClass}`;
    levelDescription.textContent = desc;
}

// Reiniciar Quiz
function restartQuiz() {
    endScreen.classList.add('hidden');
    startQuiz();
}

// --- Lógica das Partículas Flutuantes ---
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 25; // Quantidade de partículas

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição e tempo aleatórios
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Cores com tons de roxo/azul
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.background = `rgba(${Math.random()*100 + 155}, ${Math.random()*50 + 100}, 255, ${opacity})`;

        container.appendChild(particle);
    }
}

// Iniciar partículas quando a página carregar
window.onload = createParticles;
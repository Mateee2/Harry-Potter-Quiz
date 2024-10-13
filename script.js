const quizData = [
    {
        question: "What house at Hogwarts does Harry belong to?",
        options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"],
        correct: 0
    },
    {
        question: "Who is the Half-Blood Prince?",
        options: ["Albus Dumbledore", "Severus Snape", "Harry Potter", "Voldemort"],
        correct: 1
    },
    {
        question: "What position does Harry play on his Quidditch team?",
        options: ["Keeper", "Chaser", "Seeker", "Beater"],
        correct: 2
    },
    {
        question: "What is the name of Harry Potter's pet owl?",
        options: ["Hedwig", "Scabbers", "Crookshanks", "Fawkes"],
        correct: 0
    },
    {
        question: "What is the name of Hermione's cat?",
        options: ["Crookshanks", "Hedwig", "Scabbers", "Fawkes"],
        correct: 0
    },
    {
        question: "What spell does Harry use to disarm Draco Malfoy in the dueling club?",
        options: ["Expelliarmus", "Expecto Patronum", "Lumos", "Stupefy"],
        correct: 0
    },
    {
        question: "Who is the headmaster of Hogwarts when Harry arrives?",
        options: ["Albus Dumbledore", "Severus Snape", "Minerva McGonagall", "Gilderoy Lockhart"],
        correct: 0
    },
    {
        question: "Which magical creature does Hagrid introduce Harry to on his first trip to Diagon Alley?",
        options: ["A dragon", "A hippogriff", "A thestral", "A giant squid"],
        correct: 1
    },
    {
        question: "What is the name of the prison guarded by Dementors?",
        options: ["Azkaban", "Hogwarts", "Durmstrang", "Beauxbatons"],
        correct: 0
    },
    {
        question: "Who kills Dumbledore in the Half-Blood Prince?",
        options: ["Draco Malfoy", "Bellatrix Lestrange", "Snape", "Voldemort"],
        correct: 2
    },
    {
        question: "What is the name of the shop that Harry buys his wand from?",
        options: ["Ollivanders", "Weasleys' Wizard Wheezes", "Flourish and Blotts", "Eeylops Owl Emporium"],
        correct: 0
    },
    {
        question: "What is the name of the Weasley's family car?",
        options: ["The Flying Ford Anglia", "The Hogwarts Express", "The Knight Bus", "The Burrow's Broomstick"],
        correct: 0
    },
    {
        question: "What is the name of the magic object that shows the location of the Marauders?",
        options: ["The Marauder's Map", "The Time-Turner", "The Pensieve", "The Invisibility Cloak"],
        correct: 0
    },
    {
        question: "Who is the head of Gryffindor House?",
        options: ["Minerva McGonagall", "Severus Snape", "Pomona Sprout", "Filius Flitwick"],
        correct: 0
    },
    {
        question: "Which character says, 'I am Lord Voldemort'?",
        options: ["Tom Riddle", "Lucius Malfoy", "Peter Pettigrew", "Bellatrix Lestrange"],
        correct: 0
    },
    {
        question: "What spell is used to summon objects?",
        options: ["Accio", "Lumos", "Wingardium Leviosa", "Alohomora"],
        correct: 0
    },
    {
        question: "What is the name of Harry's godfather?",
        options: ["Sirius Black", "Remus Lupin", "James Potter", "Peter Pettigrew"],
        correct: 0
    },
    {
        question: "What magical plant helps Harry breathe underwater in the Triwizard Tournament?",
        options: ["Gillyweed", "Mandrake", "Devil's Snare", "Venomous Tentacula"],
        correct: 0
    },
    {
        question: "Who is the first person to be petrified by the Basilisk in 'The Chamber of Secrets'?",
        options: ["Colin Creevey", "Ginny Weasley", "Justin Finch-Fletchley", "Hermione Granger"],
        correct: 2
    },
    {
        question: "Who becomes the new Defense Against the Dark Arts teacher in 'The Prisoner of Azkaban'?",
        options: ["Remus Lupin", "Gilderoy Lockhart", "Dolores Umbridge", "Mad-Eye Moody"],
        correct: 0
    },
    {
        question: "What does the acronym 'D.A.' stand for in the 'Order of the Phoenix'?",
        options: ["Dumbledore's Army", "Dreadful Annoyances", "Darksiders Alliance", "Dangerous Animagi"],
        correct: 0
    },
    {
        question: "Who helps Harry escape from the Dursleys' house in 'The Chamber of Secrets'?",
        options: ["Ron Weasley", "Fred and George Weasley", "Hagrid", "Hermione Granger"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]]; // Swap elements
    }
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const options = document.querySelectorAll('.option');

    const currentQuiz = quizData[currentQuestion];
    questionElement.innerText = currentQuiz.question;

    // Shuffle the answer options and track the correct answer
    let shuffledOptions = [...currentQuiz.options];
    shuffleOptions(shuffledOptions);

    options.forEach((option, index) => {
        option.innerText = shuffledOptions[index];
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
        option.setAttribute('data-correct', currentQuiz.options.indexOf(shuffledOptions[index]) === currentQuiz.correct);
    });

    const nextButton = document.getElementById('next-button');
    nextButton.classList.remove('visible'); // Hide the next button
}

function checkAnswer(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const correctAnswer = document.querySelector('.option[data-correct="true"]');

    if (options[selectedIndex] === correctAnswer) {
        options[selectedIndex].classList.add('correct'); // Green for correct
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect'); // Red for incorrect
        correctAnswer.classList.add('correct'); // Highlight correct answer
    }

    // Disable all options after one is selected
    options.forEach(option => option.disabled = true);

    const nextButton = document.getElementById('next-button');
    nextButton.classList.add('visible'); // Show the next button
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `${score} / ${quizData.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    loadQuestion();
}

// Create Sparkles for Magical Effect
setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    document.body.appendChild(sparkle);

    // Random position for the sparkle
    sparkle.style.left = `${Math.random() * window.innerWidth}px`;
    sparkle.style.top = `${Math.random() * window.innerHeight}px`;

    // Remove the sparkle after it animates
    setTimeout(() => sparkle.remove(), 3000);
}, 500);

window.onload = loadQuestion;

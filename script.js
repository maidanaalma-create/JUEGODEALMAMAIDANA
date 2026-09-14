/* =====================================================
   PAWS VS ROBOTS
   Passive Voice English Game
===================================================== */


/* =====================================================
   GAME VARIABLES
===================================================== */

let playerName = "";
let difficulty = "normal";
let selectedPet = "";

let currentQuestion = 0;
let score = 0;
let lives = 3;

let streak = 0;
let bestStreak = 0;

let gameQuestions = [];

let timer = 60;
let timerInterval = null;

let totalCorrect = 0;
let totalAnswered = 0;


/* =====================================================
   QUESTION BANK
===================================================== */

const questions = [

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "Choose the correct passive sentence:",
        options: [
            "The cake was made by Anna.",
            "Anna was make the cake.",
            "The cake made Anna.",
            "Anna has make the cake."
        ],
        answer: 0
    },

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "The classroom _____ every morning.",
        options: [
            "cleans",
            "is cleaned",
            "cleaned",
            "is cleaning"
        ],
        answer: 1
    },

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "The windows _____ yesterday.",
        options: [
            "were cleaned",
            "are cleaning",
            "clean",
            "was clean"
        ],
        answer: 0
    },

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "The book _____ by millions of people.",
        options: [
            "reads",
            "is read",
            "read",
            "reading"
        ],
        answer: 1
    },

    {
        type: "truefalse",
        category: "TRUE OR FALSE",
        question: "\"The car was repaired by the mechanic\" is passive voice.",
        options: [
            "TRUE",
            "FALSE"
        ],
        answer: 0
    },


    /* =================================================
       IMAGE QUESTIONS
    ================================================= */

    {
        type: "image",
        category: "IMAGE CHALLENGE",
        image: "caperusita.jpg",
        question: "What is happening in this picture?",
        options: [
            "The girl is being followed.",
            "The girl follows the wolf.",
            "The wolf is cooking.",
            "The girl is driving."
        ],
        answer: 0
    },

    {
        type: "image",
        category: "IMAGE CHALLENGE",
        image: "family.jpg",
        question: "Choose the correct passive sentence:",
        options: [
            "The family is being photographed.",
            "The family photographs the camera.",
            "The camera photographs itself.",
            "The family was photograph."
        ],
        answer: 0
    },

    {
        type: "image",
        category: "IMAGE CHALLENGE",
        image: "herida.jpg",
        question: "Choose the correct passive sentence:",
        options: [
            "The wound is being treated.",
            "The wound treats the doctor.",
            "The doctor is being wound.",
            "The wound treating the doctor."
        ],
        answer: 0
    },


    /* =================================================
       ORDER WORDS
    ================================================= */

    {
        type: "order",
        category: "WORD ORDER",
        question: "Put the words in the correct order:",
        words: [
            "was",
            "The",
            "letter",
            "written",
            "yesterday."
        ],
        answer: "The letter was written yesterday."
    },

    {
        type: "order",
        category: "WORD ORDER",
        question: "Put the words in the correct order:",
        words: [
            "is",
            "The",
            "car",
            "washed",
            "every",
            "week."
        ],
        answer: "The car is washed every week."
    },


    /* =================================================
       WRITING
    ================================================= */

    {
        type: "writing",
        category: "TRANSFORMATION",
        question: "Transform into passive voice: \"People speak English around the world.\"",
        answer: "English is spoken around the world."
    },

    {
        type: "writing",
        category: "TRANSFORMATION",
        question: "Transform into passive voice: \"The chef cooked the meal.\"",
        answer: "The meal was cooked by the chef."
    },


    /* =================================================
       LISTENING
    ================================================= */

    {
        type: "listening",
        category: "LISTENING",
        question: "Listen to the sentence and choose what you hear.",
        speech: "The house was built in 1990.",
        options: [
            "The house was built in 1990.",
            "The house is building in 1990.",
            "The house built 1990.",
            "The house was build in 1990."
        ],
        answer: 0
    },

    {
        type: "listening",
        category: "LISTENING",
        question: "Listen carefully and choose the correct sentence.",
        speech: "The food is prepared every morning.",
        options: [
            "The food is prepared every morning.",
            "The food prepares every morning.",
            "The food was prepare every morning.",
            "The food is preparing every morning."
        ],
        answer: 0
    },


    /* =================================================
       MORE QUESTIONS
    ================================================= */

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "The emails _____ every afternoon.",
        options: [
            "are sent",
            "send",
            "sent",
            "is sending"
        ],
        answer: 0
    },

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "The bridge _____ last year.",
        options: [
            "was built",
            "is build",
            "built",
            "was building"
        ],
        answer: 0
    },

    {
        type: "multiple",
        category: "PASSIVE VOICE",
        question: "The homework _____ by the students.",
        options: [
            "is completed",
            "complete",
            "completes",
            "is completing"
        ],
        answer: 0
    },

    {
        type: "truefalse",
        category: "TRUE OR FALSE",
        question: "\"The window was broken\" is an example of passive voice.",
        options: [
            "TRUE",
            "FALSE"
        ],
        answer: 0
    },

    {
        type: "truefalse",
        category: "TRUE OR FALSE",
        question: "\"Tom eats the cake\" is passive voice.",
        options: [
            "TRUE",
            "FALSE"
        ],
        answer: 1
    }

];


/* =====================================================
   DIFFICULTY
===================================================== */

const difficultyQuestions = {
    easy: 5,
    normal: 8,
    medium: 10,
    hard: 12,
    extreme: 15
};


/* =====================================================
   SCREEN CONTROL
===================================================== */

function hideAllScreens() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
}


function showMenu() {

    hideAllScreens();

    document.getElementById("menuScreen")
        .classList.remove("hidden");
}


function showNameScreen() {

    hideAllScreens();

    document.getElementById("nameScreen")
        .classList.remove("hidden");
}


function showDifficulty() {

    hideAllScreens();

    document.getElementById("difficultyScreen")
        .classList.remove("hidden");
}


function showStatistics() {

    hideAllScreens();

    document.getElementById("statisticsScreen")
        .classList.remove("hidden");

    loadStatistics();
}


function showSaved() {

    hideAllScreens();

    document.getElementById("savedScreen")
        .classList.remove("hidden");

    loadSaved();
}


function showLeaderboard() {

    hideAllScreens();

    document.getElementById("leaderboardScreen")
        .classList.remove("hidden");

    loadLeaderboard();
}


/* =====================================================
   DIFFICULTY
===================================================== */

function setDifficulty(level) {

    difficulty = level;

    showNameScreen();
}


/* =====================================================
   NAME
===================================================== */

function continueToPets() {

    const input =
        document.getElementById("playerNameInput");

    playerName = input.value.trim();

    if (!playerName) {

        input.focus();

        input.style.borderColor = "#e05b4f";

        return;
    }

    hideAllScreens();

    document.getElementById("petScreen")
        .classList.remove("hidden");
}


/* =====================================================
   PET
===================================================== */

function selectPet(pet) {

    selectedPet = pet;

    startGame();
}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    clearInterval(timerInterval);

    currentQuestion = 0;

    score = 0;

    lives = 3;

    streak = 0;

    bestStreak = 0;

    totalCorrect = 0;

    totalAnswered = 0;

    timer = 60;


    const amount =
        difficultyQuestions[difficulty] || 8;


    gameQuestions =
        [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(amount, questions.length));


    hideAllScreens();

    document.getElementById("gameScreen")
        .classList.remove("hidden");


    document.getElementById("playerDisplay")
        .textContent = playerName;

    document.getElementById("levelDisplay")
        .textContent =
            difficulty.toUpperCase();


    updateGameInfo();

    showQuestion();

    startTimer();
}


/* =====================================================
   GAME INFO
===================================================== */

function updateGameInfo() {

    document.getElementById("questionDisplay")
        .textContent =
            `QUESTION ${currentQuestion + 1}/${gameQuestions.length}`;

    document.getElementById("livesDisplay")
        .textContent =
            `LIVES: ${lives}`;

    document.getElementById("scoreDisplay")
        .textContent =
            `SCORE: ${score}`;
}


/* =====================================================
   SHOW QUESTION
===================================================== */

function showQuestion() {

    const q =
        gameQuestions[currentQuestion];

    const questionText =
        document.getElementById("questionText");

    const category =
        document.getElementById("category");

    const answers =
        document.getElementById("answers");

    const feedback =
        document.getElementById("feedback");

    const imageContainer =
        document.getElementById("imageContainer");

    const questionImage =
        document.getElementById("questionImage");


    category.textContent = q.category;

    questionText.textContent = q.question;

    answers.innerHTML = "";

    feedback.textContent = "";

    imageContainer.classList.add("hidden");


    /* IMAGE */

    if (q.type === "image") {

        imageContainer.classList.remove("hidden");

        questionImage.src = q.image;

        questionImage.onerror = function() {

            imageContainer.classList.add("hidden");

        };
    }


    /* MULTIPLE / TRUE FALSE / IMAGE / LISTENING */

    if (
        q.type === "multiple" ||
        q.type === "truefalse" ||
        q.type === "image" ||
        q.type === "listening"
    ) {

        if (q.type === "listening") {

            speakSentence(q.speech);
        }

        q.options.forEach((option, index) => {

            const button =
                document.createElement("button");

            button.className = "answer-button";

            button.textContent = option;

            button.onclick = () =>
                checkAnswer(index);

            answers.appendChild(button);
        });
    }


    /* WORD ORDER */

    if (q.type === "order") {

        const shuffled =
            [...q.words]
            .sort(() => Math.random() - 0.5);

        shuffled.forEach(word => {

            const button =
                document.createElement("button");

            button.className = "answer-button";

            button.textContent = word;

            button.onclick = () =>
                chooseWord(word);

            answers.appendChild(button);
        });
    }


    /* WRITING */

    if (q.type === "writing") {

        const input =
            document.createElement("input");

        input.id = "writingAnswer";

        input.placeholder =
            "Write your answer here...";

        input.style.width = "90%";
        input.style.padding = "16px";
        input.style.margin = "20px";
        input.style.borderRadius = "10px";
        input.style.border = "2px solid #d2ad43";
        input.style.background = "#062f25";
        input.style.color = "white";
        input.style.fontSize = "18px";

        answers.appendChild(input);


        const button =
            document.createElement("button");

        button.className = "answer-button";

        button.textContent = "CHECK ANSWER";

        button.onclick = checkWriting;

        answers.appendChild(button);
    }


    updateGameInfo();
}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer(selected) {

    const q =
        gameQuestions[currentQuestion];

    totalAnswered++;


    if (selected === q.answer) {

        correctAnswer();

    } else {

        wrongAnswer();
    }
}


/* =====================================================
   CORRECT
===================================================== */

function correctAnswer() {

    const feedback =
        document.getElementById("feedback");

    totalCorrect++;

    streak++;

    bestStreak =
        Math.max(bestStreak, streak);


    let points = 100;

    points += streak * 20;

    score += points;


    feedback.textContent =
        `CORRECT! +${points} POINTS`;

    feedback.style.color = "#b8dc77";


    updateGameInfo();

    nextQuestionAfterDelay();
}


/* =====================================================
   WRONG
===================================================== */

function wrongAnswer() {

    const feedback =
        document.getElementById("feedback");

    lives--;

    streak = 0;


    feedback.textContent =
        "WRONG ANSWER";

    feedback.style.color = "#e6a16c";


    updateGameInfo();


    if (lives <= 0) {

        setTimeout(() => {

            endGame();

        }, 700);

        return;
    }


    nextQuestionAfterDelay();
}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestionAfterDelay() {

    setTimeout(() => {

        currentQuestion++;

        if (
            currentQuestion >=
            gameQuestions.length
        ) {

            endGame();

        } else {

            showQuestion();
        }

    }, 850);
}


/* =====================================================
   WRITING
===================================================== */

function checkWriting() {

    const q =
        gameQuestions[currentQuestion];

    const input =
        document.getElementById("writingAnswer");

    if (!input) return;


    totalAnswered++;


    const userAnswer =
        input.value
        .trim()
        .toLowerCase()
        .replace(/[.!?]/g, "");


    const correct =
        q.answer
        .trim()
        .toLowerCase()
        .replace(/[.!?]/g, "");


    if (userAnswer === correct) {

        correctAnswer();

    } else {

        wrongAnswer();
    }
}


/* =====================================================
   WORD ORDER
===================================================== */

let selectedWords = [];


function chooseWord(word) {

    selectedWords.push(word);


    const buttons =
        document.querySelectorAll(".answer-button");

    buttons.forEach(button => {

        if (button.textContent === word) {

            button.disabled = true;

            button.style.opacity = "0.4";
        }

    });


    if (
        selectedWords.length ===
        gameQuestions[currentQuestion].words.length
    ) {

        const q =
            gameQuestions[currentQuestion];

        totalAnswered++;


        const sentence =
            selectedWords.join(" ");


        if (
            sentence.toLowerCase() ===
            q.answer.toLowerCase()
        ) {

            selectedWords = [];

            correctAnswer();

        } else {

            selectedWords = [];

            wrongAnswer();
        }
    }
}


/* =====================================================
   LISTENING
===================================================== */

function speakSentence(sentence) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(sentence);

    speech.lang = "en-US";

    speech.rate = 0.8;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);
}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    clearInterval(timerInterval);

    timer = 60;

    updateTimer();


    timerInterval =
        setInterval(() => {

            timer--;

            updateTimer();


            if (timer <= 0) {

                clearInterval(timerInterval);

                timeUp();
            }

        }, 1000);
}


function updateTimer() {

    const fill =
        document.getElementById("timerFill");


    const percentage =
        (timer / 60) * 100;


    fill.style.width =
        `${percentage}%`;


    if (timer <= 15) {

        fill.style.background =
            "#b85c3f";

    } else if (timer <= 30) {

        fill.style.background =
            "#d3a83c";

    } else {

        fill.style.background =
            "#4f8b53";
    }
}


function timeUp() {

    clearInterval(timerInterval);

    const feedback =
        document.getElementById("feedback");

    feedback.textContent =
        "TIME IS UP!";

    feedback.style.color =
        "#e6a16c";


    setTimeout(() => {

        endGame();

    }, 900);
}


/* =====================================================
   END GAME
===================================================== */

function endGame() {

    clearInterval(timerInterval);

    if (
        "speechSynthesis" in window
    ) {
        window.speechSynthesis.cancel();
    }


    const accuracy =
        totalAnswered > 0
            ? Math.round(
                (totalCorrect / totalAnswered) * 100
            )
            : 0;


    const rank =
        getRank(score);


    document.getElementById("finalScore")
        .textContent = score;


    document.getElementById("finalCorrect")
        .textContent =
            `Correct answers: ${totalCorrect}/${totalAnswered}`;


    document.getElementById("finalAccuracy")
        .textContent =
            `Accuracy: ${accuracy}%`;


    document.getElementById("finalStreak")
        .textContent =
            `Best streak: ${bestStreak}`;


    document.getElementById("finalRank")
        .textContent = rank;


    let message;


    if (accuracy >= 90) {

        message =
            "Outstanding! Your Passive Voice is excellent.";

    } else if (accuracy >= 70) {

        message =
            "Great job! Keep practicing your Passive Voice.";

    } else if (accuracy >= 50) {

        message =
            "Good effort! You are getting better.";

    } else {

        message =
            "Keep practicing. You can improve your English!";
    }


    document.getElementById("finalMessage")
        .textContent = message;


    saveGame(
        accuracy,
        rank
    );


    updateLeaderboard(
        score
    );


    hideAllScreens();

    document.getElementById("resultScreen")
        .classList.remove("hidden");
}


/* =====================================================
   RANK
===================================================== */

function getRank(score) {

    if (score >= 2500)
        return "ENGLISH LEGEND";

    if (score >= 2000)
        return "ENGLISH MASTER";

    if (score >= 1500)
        return "GRAMMAR PRO";

    if (score >= 1000)
        return "WORD EXPLORER";

    if (score >= 500)
        return "ENGLISH STUDENT";

    return "BEGINNER";
}


/* =====================================================
   SAVE GAME
===================================================== */

function saveGame(
    accuracy,
    rank
) {

    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            )
        ) || [];


    games.push({

        player: playerName,

        pet: selectedPet,

        difficulty: difficulty,

        score: score,

        accuracy: accuracy,

        rank: rank,

        date: new Date()
            .toLocaleDateString()

    });


    localStorage.setItem(
        "pawsVsRobotsGames",
        JSON.stringify(games)
    );
}


/* =====================================================
   SAVED DATA
===================================================== */

function loadSaved() {

    const container =
        document.getElementById(
            "savedContent"
        );


    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            )
        ) || [];


    if (games.length === 0) {

        container.innerHTML =
            `<p>No saved games yet.</p>`;

        return;
    }


    container.innerHTML = "";


    [...games]
        .reverse()
        .forEach(game => {

            const box =
                document.createElement("div");

            box.className =
                "data-box";


            box.innerHTML = `
                <strong>${game.player}</strong><br>
                Companion: ${game.pet}<br>
                Difficulty: ${game.difficulty.toUpperCase()}<br>
                Score: ${game.score}<br>
                Accuracy: ${game.accuracy}%<br>
                Rank: ${game.rank}<br>
                Date: ${game.date}
            `;


            container.appendChild(box);
        });
}


/* =====================================================
   STATISTICS
===================================================== */

function loadStatistics() {

    const container =
        document.getElementById(
            "statisticsContent"
        );


    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            )
        ) || [];


    if (games.length === 0) {

        container.innerHTML =
            `<p>No statistics yet.</p>`;

        return;
    }


    const totalGames =
        games.length;


    const averageAccuracy =
        Math.round(
            games.reduce(
                (sum, game) =>
                    sum + game.accuracy,
                0
            ) / totalGames
        );


    const bestScore =
        Math.max(
            ...games.map(
                game => game.score
            )
        );


    const bestGame =
        games.find(
            game =>
                game.score === bestScore
        );


    container.innerHTML = `

        <div class="data-box">
            <strong>TOTAL GAMES</strong>
            <h2>${totalGames}</h2>
        </div>

        <div class="data-box">
            <strong>AVERAGE ACCURACY</strong>
            <h2>${averageAccuracy}%</h2>
        </div>

        <div class="data-box">
            <strong>BEST SCORE</strong>
            <h2>${bestScore}</h2>
        </div>

        <div class="data-box">
            <strong>BEST RANK</strong>
            <h2>${bestGame.rank}</h2>
        </div>
    `;
}


/* =====================================================
   LEADERBOARD
===================================================== */

function getLeaderboard() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsLeaderboard"
            )
        );


    if (saved) {

        return saved;
    }


    return [

        {
            name: "Emily",
            score: 2850
        },

        {
            name: "Lucas",
            score: 2470
        },

        {
            name: "Sofia",
            score: 2180
        },

        {
            name: "Mateo",
            score: 1950
        },

        {
            name: "Olivia",
            score: 1720
        },

        {
            name: "Noah",
            score: 1480
        },

        {
            name: "Emma",
            score: 1210
        },

        {
            name: "Daniel",
            score: 980
        }

    ];
}


function updateLeaderboard(newScore) {

    let leaderboard =
        getLeaderboard();


    leaderboard.push({

        name: playerName,

        score: newScore

    });


    leaderboard.sort(
        (a, b) =>
            b.score - a.score
    );


    leaderboard =
        leaderboard.slice(0, 10);


    localStorage.setItem(
        "pawsVsRobotsLeaderboard",
        JSON.stringify(leaderboard)
    );
}


function loadLeaderboard() {

    const container =
        document.getElementById(
            "leaderboardContent"
        );


    const leaderboard =
        getLeaderboard();


    container.innerHTML = "";


    leaderboard.forEach(
        (player, index) => {

            const row =
                document.createElement("div");

            row.className =
                "leader-row";


            row.innerHTML = `
                <span>
                    #${index + 1}
                    ${player.name}
                </span>

                <strong>
                    ${player.score}
                </strong>
            `;


            container.appendChild(row);
        }
    );
}


/* =====================================================
   INITIAL STATE
===================================================== */

hideAllScreens();

document.getElementById("coverScreen")
    .classList.remove("hidden");
/* =========================================================
   PAWS VS ROBOTS
   SCRIPT
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let playerName = "";

let selectedPet = "";

let selectedPetImage = "";

let difficulty = "normal";

let questions = [];

let currentQuestion = 0;

let score = 0;

let correctAnswers = 0;

let totalQuestions = 0;

let lives = 3;

let timeLeft = 60;

let timer = null;

let gameEnded = false;

let canAnswer = true;


/* =========================================================
   QUESTIONS
========================================================= */

const questionPool = [

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The cake ___ by Anna.",
        answers: ["is made"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The door ___ by Tom.",
        answers: ["is opened"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The ball ___ by John.",
        answers: ["is kicked"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The book ___ by Mary.",
        answers: ["is read"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The room ___ every day.",
        answers: ["is cleaned"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The food ___ by Mom.",
        answers: ["is cooked"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The dog ___ by the boy.",
        answers: ["is washed"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The picture ___ by Sarah.",
        answers: ["is painted"]
    },


    /* WAS / WERE */

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The cake ___ yesterday.",
        answers: ["was made"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The windows ___ yesterday.",
        answers: ["were cleaned"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The door ___ this morning.",
        answers: ["was opened"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "Complete: The toys ___ yesterday.",
        answers: ["were cleaned"]
    },


    /* COLORS */

    {
        type: "text",
        category: "COLORS",
        question: "What color is made when RED and YELLOW are mixed?",
        answers: ["orange"]
    },

    {
        type: "text",
        category: "COLORS",
        question: "What color is made when BLUE and YELLOW are mixed?",
        answers: ["green"]
    },

    {
        type: "text",
        category: "COLORS",
        question: "What color is made when BLUE and RED are mixed?",
        answers: ["purple"]
    },

    {
        type: "text",
        category: "COLORS",
        question: "What color is made when RED and WHITE are mixed?",
        answers: ["pink"]
    },

    {
        type: "text",
        category: "COLORS",
        question: "What color is made when BLACK and WHITE are mixed?",
        answers: ["gray", "grey"]
    },


    /* VOCABULARY */

    {
        type: "text",
        category: "VOCABULARY",
        question: "What is the English word for GATO?",
        answers: ["cat"]
    },

    {
        type: "text",
        category: "VOCABULARY",
        question: "What is the English word for PERRO?",
        answers: ["dog"]
    },

    {
        type: "text",
        category: "VOCABULARY",
        question: "What is the English word for CASA?",
        answers: ["house"]
    },

    {
        type: "text",
        category: "VOCABULARY",
        question: "What is the English word for LIBRO?",
        answers: ["book"]
    },

    {
        type: "text",
        category: "VOCABULARY",
        question: "What is the English word for ESCUELA?",
        answers: ["school"]
    },


    /* EASY VERBS */

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "What is the past of GO?",
        answers: ["went"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "What is the past of EAT?",
        answers: ["ate"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "What is the past of PLAY?",
        answers: ["played"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "What is the past of WATCH?",
        answers: ["watched"]
    },


    /* TYPING */

    {
        type: "typing",
        category: "TYPING",
        question: "Type this sentence: I like cats.",
        answers: ["i like cats"]
    },

    {
        type: "typing",
        category: "TYPING",
        question: "Type this sentence: My dog is happy.",
        answers: ["my dog is happy"]
    },


    /* EASY GRAMMAR */

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "Complete: I ___ a student.",
        answers: ["am"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "Complete: She ___ my friend.",
        answers: ["is"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "Complete: They ___ happy.",
        answers: ["are"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "Complete: He ___ a dog.",
        answers: ["has"]
    },

    {
        type: "text",
        category: "EASY ENGLISH",
        question: "Complete: I ___ pizza.",
        answers: ["like"]
    },


    /* LISTENING */

    {
        type: "listening",
        category: "LISTENING",
        question: "Listen and write the sentence you hear.",
        sentence: "The cake is made.",
        answers: ["the cake is made"]
    },

    {
        type: "listening",
        category: "LISTENING",
        question: "Listen and write the sentence you hear.",
        sentence: "The door is opened.",
        answers: ["the door is opened"]
    },

    {
        type: "listening",
        category: "LISTENING",
        question: "Listen and write the sentence you hear.",
        sentence: "The room is cleaned.",
        answers: ["the room is cleaned"]
    },


    /* PASSIVE VERY EASY */

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "The car ___ washed.",
        answers: ["is"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "The toys ___ cleaned.",
        answers: ["are"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "The cake ___ made yesterday.",
        answers: ["was"]
    },

    {
        type: "text",
        category: "PASSIVE VOICE",
        question: "The books ___ read yesterday.",
        answers: ["were"]
    }

];


/* =========================================================
   SHOW SCREEN
========================================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const screen =
        document.getElementById(id);


    if (screen) {

        screen.classList.add("active");

    }
}


/* =========================================================
   MENU
========================================================= */

function showMenu() {

    stopTimer();

    showScreen("menuScreen");
}


/* =========================================================
   INFO
========================================================= */

function showInfo() {

    showScreen("infoScreen");
}


/* =========================================================
   DIFFICULTY
========================================================= */

function showDifficulty() {

    const text =
        document.getElementById(
            "currentDifficulty"
        );


    if (text) {

        text.textContent =
            difficulty.toUpperCase();

    }


    showScreen("difficultyScreen");
}


function setDifficulty(level) {

    difficulty = level;


    localStorage.setItem(
        "pawsDifficulty",
        difficulty
    );


    const text =
        document.getElementById(
            "currentDifficulty"
        );


    if (text) {

        text.textContent =
            difficulty.toUpperCase();

    }
}


/* =========================================================
   NAME
========================================================= */

function showNameScreen() {

    showScreen("nameScreen");


    setTimeout(() => {

        const input =
            document.getElementById(
                "playerNameInput"
            );


        if (input) {

            input.focus();

        }

    }, 300);
}


function continueToPets() {

    const input =
        document.getElementById(
            "playerNameInput"
        );


    const name =
        input.value.trim();


    if (name === "") {

        input.placeholder =
            "Write your name";

        input.focus();

        return;
    }


    playerName = name;


    showScreen("petScreen");
}


/* =========================================================
   SELECT PET
========================================================= */

function selectPet(
    name,
    image
) {

    selectedPet = name;

    selectedPetImage = image;

    startNewGame();
}


/* =========================================================
   START GAME
========================================================= */

function startNewGame() {

    score = 0;

    correctAnswers = 0;

    currentQuestion = 0;

    lives = 3;

    timeLeft = 60;

    gameEnded = false;

    canAnswer = true;


    questions =
        getQuestionsForDifficulty();


    totalQuestions =
        questions.length;


    document.getElementById(
        "gamePlayer"
    ).textContent =
        playerName;


    document.getElementById(
        "gameLevel"
    ).textContent =
        difficulty.toUpperCase();


    updateScore();

    updateLives();

    updateTimer();


    showScreen("gameScreen");


    startTimer();

    showQuestion();
}


/* =========================================================
   QUESTIONS PER DIFFICULTY
========================================================= */

function getQuestionsForDifficulty() {

    const shuffled =
        shuffle(
            [...questionPool]
        );


    let amount = 10;


    if (difficulty === "easy") {

        amount = 7;

    }


    if (difficulty === "normal") {

        amount = 10;

    }


    if (difficulty === "medium") {

        amount = 12;

    }


    if (difficulty === "hard") {

        amount = 15;

    }


    if (difficulty === "extreme") {

        amount = 18;

    }


    return shuffled.slice(
        0,
        Math.min(
            amount,
            shuffled.length
        )
    );
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];
    }


    return array;
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    if (gameEnded) {

        return;

    }


    if (
        currentQuestion >=
        questions.length
    ) {

        endGame();

        return;

    }


    canAnswer = true;


    const question =
        questions[
            currentQuestion
        ];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;


    document.getElementById(
        "questionCategory"
    ).textContent =
        question.category;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const imageContainer =
        document.getElementById(
            "questionImageContainer"
        );


    const image =
        document.getElementById(
            "questionImage"
        );


    const listenButton =
        document.getElementById(
            "listenButton"
        );


    const answerInput =
        document.getElementById(
            "answerInput"
        );


    const feedback =
        document.getElementById(
            "feedback"
        );


    imageContainer.classList.remove(
        "show"
    );


    image.src = "";


    listenButton.classList.remove(
        "show"
    );


    feedback.textContent = "";


    answerInput.value = "";


    answerInput.disabled = false;


    if (
        question.type ===
        "listening"
    ) {

        listenButton.classList.add(
            "show"
        );


        setTimeout(() => {

            playListening();

        }, 500);

    }


    answerInput.focus();
}


/* =========================================================
   SUBMIT ANSWER
========================================================= */

function submitAnswer() {

    if (!canAnswer) {

        return;

    }


    if (gameEnded) {

        return;

    }


    const input =
        document.getElementById(
            "answerInput"
        );


    const userAnswer =
        normalizeAnswer(
            input.value
        );


    if (
        userAnswer === ""
    ) {

        return;

    }


    const question =
        questions[
            currentQuestion
        ];


    const isCorrect =
        question.answers.some(
            answer =>
                normalizeAnswer(
                    answer
                ) === userAnswer
        );


    canAnswer = false;


    if (isCorrect) {

        correctAnswer();

    } else {

        wrongAnswer();

    }
}


/* =========================================================
   NORMALIZE
========================================================= */

function normalizeAnswer(
    answer
) {

    return answer
        .toLowerCase()
        .trim()
        .replace(
            /[.!?,]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        );
}


/* =========================================================
   CORRECT
========================================================= */

function correctAnswer() {

    score += 100;

    correctAnswers++;


    updateScore();


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.textContent =
        "CORRECT!";


    setTimeout(() => {

        if (gameEnded) {

            return;

        }


        currentQuestion++;


        showQuestion();

    }, 800);
}


/* =========================================================
   WRONG
========================================================= */

function wrongAnswer() {

    lives--;


    updateLives();


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.textContent =
        "TRY AGAIN!";


    if (lives <= 0) {

        setTimeout(() => {

            endGame();

        }, 700);


        return;

    }


    setTimeout(() => {

        if (gameEnded) {

            return;

        }


        currentQuestion++;


        showQuestion();

    }, 900);
}


/* =========================================================
   LIVES
========================================================= */

function updateLives() {

    document.getElementById(
        "lives"
    ).textContent =
        lives;
}


/* =========================================================
   SCORE
========================================================= */

function updateScore() {

    document.getElementById(
        "score"
    ).textContent =
        score;
}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    stopTimer();


    timer =
        setInterval(() => {

            if (gameEnded) {

                stopTimer();

                return;

            }


            timeLeft--;


            updateTimer();


            if (
                timeLeft <= 0
            ) {

                timeUp();

            }

        }, 1000);
}


function updateTimer() {

    const timerText =
        document.getElementById(
            "timerText"
        );


    const timerFill =
        document.getElementById(
            "timerFill"
        );


    if (!timerText || !timerFill) {

        return;

    }


    timerText.textContent =
        timeLeft;


    const percentage =
        (timeLeft / 60) * 100;


    timerFill.style.width =
        `${percentage}%`;
}


function stopTimer() {

    if (timer !== null) {

        clearInterval(timer);

        timer = null;

    }
}


function timeUp() {

    if (gameEnded) {

        return;

    }


    endGame();
}


/* =========================================================
   LISTENING
========================================================= */

function playListening() {

    const question =
        questions[
            currentQuestion
        ];


    if (!question) {

        return;

    }


    if (
        question.type !==
        "listening"
    ) {

        return;

    }


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Your browser does not support listening."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            question.sentence
        );


    speech.lang =
        "en-US";


    speech.rate =
        0.75;


    speech.pitch =
        1;


    window.speechSynthesis.speak(
        speech
    );
}


/* =========================================================
   END GAME
========================================================= */

function endGame() {

    if (gameEnded) {

        return;

    }


    gameEnded = true;


    stopTimer();


    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }


    const percentage =
        totalQuestions > 0
            ? Math.round(
                (
                    correctAnswers /
                    totalQuestions
                ) * 100
            )
            : 0;


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "finalCorrect"
    ).textContent =
        `${correctAnswers} / ${totalQuestions}`;


    document.getElementById(
        "finalPercentage"
    ).textContent =
        `${percentage}%`;


    document.getElementById(
        "finalRank"
    ).textContent =
        getRank(score);


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    if (lives <= 0) {

        resultMessage.textContent =
            "YOU LOST ALL YOUR LIVES.";

    } else if (
        timeLeft <= 0
    ) {

        resultMessage.textContent =
            "TIME IS UP.";

    } else {

        resultMessage.textContent =
            "MISSION COMPLETE!";

    }


    saveGame(
        percentage
    );


    updateLeaderboard();


    showScreen(
        "resultScreen"
    );
}


/* =========================================================
   RANK
========================================================= */

function getRank(score) {

    if (score >= 1500) {

        return "ENGLISH MASTER";

    }


    if (score >= 1000) {

        return "ENGLISH PRO";

    }


    if (score >= 700) {

        return "ENGLISH EXPLORER";

    }


    if (score >= 400) {

        return "ENGLISH STUDENT";

    }


    return "BEGINNER";
}


/* =========================================================
   SAVE GAME
========================================================= */

function saveGame(
    percentage
) {

    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            ) || "[]"
        );


    const gameData = {

        player:
            playerName,

        pet:
            selectedPet,

        difficulty:
            difficulty,

        score:
            score,

        correct:
            correctAnswers,

        total:
            totalQuestions,

        percentage:
            percentage,

        rank:
            getRank(score),

        date:
            new Date()
                .toLocaleString()

    };


    games.push(
        gameData
    );


    localStorage.setItem(
        "pawsVsRobotsGames",
        JSON.stringify(
            games
        )
    );
}


/* =========================================================
   LEADERBOARD
========================================================= */

function updateLeaderboard() {

    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            ) || "[]"
        );


    const leaderboard =
        games
            .sort(
                (a, b) =>
                    b.score -
                    a.score
            )
            .slice(
                0,
                10
            );


    localStorage.setItem(
        "pawsVsRobotsLeaderboard",
        JSON.stringify(
            leaderboard
        )
    );
}


function showLeaderboard() {

    const container =
        document.getElementById(
            "leaderboardContent"
        );


    const leaderboard =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsLeaderboard"
            ) || "[]"
        );


    if (
        leaderboard.length === 0
    ) {

        container.innerHTML =
            "<p>No scores yet.</p>";

        showScreen(
            "leaderboardScreen"
        );

        return;

    }


    container.innerHTML = "";


    leaderboard.forEach(
        (player, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            row.innerHTML = `

                <strong>
                    ${index + 1}.
                </strong>

                ${escapeHTML(
                    player.player
                )}

                <span>
                    ${player.score}
                    POINTS
                </span>

            `;


            container.appendChild(
                row
            );

        }
    );


    showScreen(
        "leaderboardScreen"
    );
}


/* =========================================================
   STATISTICS
========================================================= */

function showStatistics() {

    const container =
        document.getElementById(
            "statisticsContent"
        );


    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            ) || "[]"
        );


    if (
        games.length === 0
    ) {

        container.innerHTML =
            "<p>No games played yet.</p>";

        showScreen(
            "statisticsScreen"
        );

        return;

    }


    const totalGames =
        games.length;


    const totalCorrect =
        games.reduce(
            (sum, game) =>
                sum +
                game.correct,
            0
        );


    const totalQuestionsPlayed =
        games.reduce(
            (sum, game) =>
                sum +
                game.total,
            0
        );


    const averageAccuracy =
        totalQuestionsPlayed > 0
            ? Math.round(
                (
                    totalCorrect /
                    totalQuestionsPlayed
                ) * 100
            )
            : 0;


    const bestScore =
        Math.max(
            ...games.map(
                game =>
                    game.score
            )
        );


    container.innerHTML = `

        <div class="statistics-line">

            <span>
                GAMES PLAYED
            </span>

            <strong>
                ${totalGames}
            </strong>

        </div>


        <div class="statistics-line">

            <span>
                TOTAL CORRECT
            </span>

            <strong>
                ${totalCorrect}
            </strong>

        </div>


        <div class="statistics-line">

            <span>
                AVERAGE ACCURACY
            </span>

            <strong>
                ${averageAccuracy}%
            </strong>

        </div>


        <div class="statistics-line">

            <span>
                BEST SCORE
            </span>

            <strong>
                ${bestScore}
            </strong>

        </div>

    `;


    showScreen(
        "statisticsScreen"
    );
}


/* =========================================================
   SAVED DATA
========================================================= */

function showSavedData() {

    const container =
        document.getElementById(
            "savedDataContent"
        );


    const games =
        JSON.parse(
            localStorage.getItem(
                "pawsVsRobotsGames"
            ) || "[]"
        );


    if (
        games.length === 0
    ) {

        container.innerHTML =
            "<p>No saved data.</p>";

        showScreen(
            "savedScreen"
        );

        return;

    }


    const lastGame =
        games[
            games.length - 1
        ];


    container.innerHTML = `

        <p>
            PLAYER:
            <strong>
                ${escapeHTML(
                    lastGame.player
                )}
            </strong>
        </p>


        <p>
            PET:
            <strong>
                ${escapeHTML(
                    lastGame.pet
                )}
            </strong>
        </p>


        <p>
            DIFFICULTY:
            <strong>
                ${escapeHTML(
                    lastGame.difficulty
                )}
            </strong>
        </p>


        <p>
            SCORE:
            <strong>
                ${lastGame.score}
            </strong>
        </p>


        <p>
            ACCURACY:
            <strong>
                ${lastGame.percentage}%
            </strong>
        </p>


        <p>
            RANK:
            <strong>
                ${escapeHTML(
                    lastGame.rank
                )}
            </strong>
        </p>

    `;


    showScreen(
        "savedScreen"
    );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   ENTER = CHECK ANSWER
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            document
                .getElementById(
                    "gameScreen"
                )
                .classList
                .contains("active")
        ) {

            submitAnswer();

        }

    }
);


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) {

        return;

    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${5 + Math.random() * 8}s`;


        particle.style.animationDelay =
            `${Math.random() * 8}s`;


        container.appendChild(
            particle
        );
    }
}


/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSavedSettings() {

    const savedDifficulty =
        localStorage.getItem(
            "pawsDifficulty"
        );


    if (
        savedDifficulty &&
        [
            "easy",
            "normal",
            "medium",
            "hard",
            "extreme"
        ].includes(
            savedDifficulty
        )
    ) {

        difficulty =
            savedDifficulty;

    }
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSavedSettings();

        createParticles();

        updateLeaderboard();

    }
);

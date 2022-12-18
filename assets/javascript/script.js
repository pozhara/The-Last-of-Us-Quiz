/*jshint esversion: 6 */

/*Function to shuffle answers*/
function shuffle(answer) {
    let currentIndex = answer.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [answer[currentIndex], answer[randomIndex]] = [
            answer[randomIndex], answer[currentIndex]
        ];
    }

    return answer;
}

/*Questions and answers*/
const questions = [{
    question: "What is the name of Ellie's mom?",
    answer: ["Jessica", "Monica", "Anna", "Tess"],
    correct: "Anna",
},
{
    question: "Around how old is Joel in The Last of Us Part II?",
    answer: ["40s", "50s", "60s", "70s"],
    correct: "50s",
},
{
    question: "What is Manny's rank in the WLF?",
    answer: ["Sergeant", "Captain", "Lieutenant", "Corporal"],
    correct: "Lieutenant",
},
{
    question: "What item does Ellie keep of Sam's that can be seen in her room at the start of The Last of Us Part II?",
    answer: ["PS3", "Toy robot", "Cassette player", "Animals of the Past book"],
    correct: "Toy robot",
},
{
    question: "Which game does NOT get referenced in The Last of US Part II?",
    answer: ["Deus Ex", "God of War", "Jak and Daxter", "Crash Bandicoot"],
    correct: "God of War",
},
{
    question: "How old is Ellie at the start of the second game?",
    answer: ["18", "19", "20", "21"],
    correct: "19",
},
{
    question: "What is the name of the comic book series Joel collects for Ellie?",
    answer: ["Savage Spacewars", "Peaceful Starlight", "Glorious Spacewars", "Savage Starlight"],
    correct: "Savage Starlight",
},
{
    question: "What is the name of Bill's partner?",
    answer: ["Robert", "Steve", "Frank", "Peter"],
    correct: "Frank",
},
{
    question: "When Joel first meets Ellie, how long has she been infected for?",
    answer: ["One month", "Two weeks", "Ten days", "Three weeks"],
    correct: "Three weeks",
},
{
    question: "What is the name of the high school you traverse through with Bill?",
    answer: ["Franklin High School", "Lincoln High School", "Andrews High School", "Roosevelt High School"],
    correct: "Lincoln High School",
},
{
    question: "How old is Ellie when Joel first encounters her?",
    answer: ["13", "14", "15", "16"],
    correct: "14",
},
];

/* Getting elements from the DOM */
let headerContainer = document.getElementById("header");
let listContainer = document.getElementById("list");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start");
let quiz = document.getElementById("quiz");

let questionIndex = 0;
let score = 0;

/*Show quiz when "Start" button is clicked*/
startBtn.onclick = function () {
    startBtn.classList.add("hidden");
    quiz.classList.remove("hidden");
    document.getElementById("description").classList.add("hidden");
};

function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
}

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function showQuestion() {
    /*Show a question*/
    let headerTemplate = `<h2 class="title">%title%</h2>`;
    let title = headerTemplate.replace('%title%', questions[questionIndex].question);
    headerContainer.innerHTML = title;

    headerContainer.innerHTML = `<h2 class="title">${questions[questionIndex].question}</h2>`;

    /*Show answers*/
    const lis = questions[questionIndex].answer.map((answer, index) =>
        `<li>
          <label>
             <input value="`+ questions[questionIndex].answer[index] + `" type="radio" class="answer" name="answer">
             <span>${answer}</span>
          </label>
         </li>`);

    listContainer.innerHTML = shuffle(lis).join('');

    /*Show progress*/
    let progress = `<p>${questionIndex + 1} out of ${questions.length}</p>`;
    document.getElementById("progress").innerHTML = progress;

    /*Show score*/
    let scoreBoard = `<p>Score: ${score} out of ${questions.length}</p>`;
    document.getElementById("score").innerHTML = scoreBoard;

}

/* Function to check answer*/
function checkAnswer() {
    /* Finding checked button */
    const checkedButton = listContainer.querySelector('input[type="radio"]:checked');

    /* If button wasn't checked - escape function */
    if (!checkedButton) {
        return;
    }

    /* Get the number of user's answer */
    const userAnswer = checkedButton.value;

    /* Check answer and increment score */
    if (userAnswer == questions[questionIndex].correct) {
        score++;
    }

    /* Taking action if it was the last question */
    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResult();
    }
}


/* Function to show results*/
function showResult() {
    document.getElementById("progress").classList.add("hidden");
    document.getElementById("score").classList.add("hidden");
    /* Template of HTML structure of results */
    const resultTemplate = `<h2 class="title">%title%</h2>
<h3 class="summary">%message%</h3>
<p class="result">%result%</p>
<button class="check">Scoreboard</button>`;

    let title;
    let message;

    /* Cheking the score*/
    if (score === questions.length) {
        title = "Congratulations!";
        message = "You answered every question right!";
    } else if ((score * 100) / questions.length >= 50) {
        title = "Not bad!";
        message = "You answered more than a half right!";
    } else {
        title = "Could be better";
        message = "You answered less than a half right";
    }

    let result = `${score} out of ${questions.length}`;

    /* Final message */
    const finalMessage = resultTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result);

    headerContainer.innerHTML = finalMessage;

    /* Change submit to play again and reloads page on onclick*/
    submitBtn.innerText = 'Play Again';
    submitBtn.onclick = function () {
        window.location.reload();
    };

    let correctAnswer = document.getElementById("correct-answers");
    document.querySelector(".check").onclick = function () {
        /* Hide unneeded sections and showing scores */
        quiz.classList.add("hidden");
        correctAnswer.classList.remove("hidden");

        /*Showing all previous scores */
        const lastScore = localStorage.getItem("latestScore") || "";

        const scoreDetail = lastScore.split(',');

        scoreDetail.push(score);

        localStorage.setItem("latestScore", scoreDetail);

        let userScoreTemplate = `<h2>This Round's Score: ${score}</h2>`;

        scoreDetail.map((items, index) => {
            userScoreTemplate += `<h3>Score ${index}: ${items}</h3>`;
            if (items==""){
                userScoreTemplate="";
            };
        });

        let userScoreBoard = document.querySelector(".user-score");

        userScoreBoard.innerHTML = userScoreTemplate;
    };

    /*Reloads the page when "Play again" button is clicked */
    let playAgain = document.querySelector(".play-again");
    playAgain.onclick = function () {
        window.location.reload();
    };
}
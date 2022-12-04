/*jshint esversion: 6 */

const questions = [{
        question: "What is the name of Ellie's mom?",
        answer: ["Jessica", "Monica", "Anna", "Tess"],
        correct: "3",
    },
    {
        question: "Around how old is Joel in The Last of Us Part II?",
        answer: ["40s", "50s", "60s", "70s"],
        correct: "2",
    },
    {
        question: "What is Manny's rank in the WLF?",
        answer: ["Sergeant", "Captain", "Lieutenant", "Corporal"],
        correct: "3",
    },
    {
        question: "What item does Ellie keep of Sam's that can be seen in her room at the start of The Last of Us Part II?",
        answer: ["PS3", "Toy robot", "Cassette player", "Animals of the Past book"],
        correct: "2",
    },
    {
        question: "Which game does NOT get referenced in The Last of US Part II?",
        answer: ["Deus Ex", "God of War", "Jak and Daxter", "Crash Bandicoot"],
        correct: "2",
    },
    {
        question: "How old is Ellie at the start of the second game?",
        answer: ["18", "19", "20", "21"],
        correct: "2",
    },
    {
        question: "What is the name of the comic book series Joel collects for Ellie?",
        answer: ["Savage Spacewars", "Peaceful Starlight", "Glorious Spacewars", "Savage Starlight"],
        correct: "4",
    },
    {
        question: "What is the name of Bill's partner?",
        answer: ["Robert", "Steve", "Frank", "Peter"],
        correct: "3",
    },
    {
        question: "When Joel first meets Ellie, how long has she been infected for?",
        answer: ["One month", "Two weeks", "Ten days", "Three weeks"],
        correct: "4",
    },
    {
        question: "What is the name of the high school you traverse through with Bill?",
        answer: ["Franklin High School", "Lincoln High School", "Andrews High School", "Roosevelt High School"],
        correct: "2",
    },
    {
        question: "How old is Ellie when Joel first encounters her?",
        answer: ["13", "14", "15", "16"],
        correct: "2",
    },
];

/* Getting elements from the DOM */
let headerContainer = document.getElementById("header");
let listContainer = document.getElementById("list");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start");
let quiz = document.getElementById("quiz");

let score = 0;
let questionIndex = 0;

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

/*A function to show questions*/
function showQuestion() {
    /*Show a question*/
    let headerTemplate = `<h2 class="title">%title%</h2>`;
    let title = headerTemplate.replace('%title%', questions[questionIndex].question);
    headerContainer.innerHTML = title;

    /*Show answers*/
    let arrayCurrentIndex = [];

for (let index = 0; index < questions[questionIndex].answer.length; index++) {
    arrayCurrentIndex.push(index);
}

/*Show answers*/
let answerNumber = 1;
for (var item of questions[questionIndex].answer) {
    const questionTemplate = `<li>
    <label>
        <input value="%number%" type="radio" class="answer" name="answer">
        <span>%answer%</span>
    </label>
    </li>`;

    
    let answers=questions[questionIndex].answer;

    randomIndex = arrayCurrentIndex[Math.floor(Math.random() * arrayCurrentIndex.length)];

    // Remove use number (randomIndex) from arrayCurrentIndex
    let indexToRemove = arrayCurrentIndex.indexOf(randomIndex);
    arrayCurrentIndex.splice(indexToRemove, 1);
            
    let answerText = questionTemplate.replace('%answer%', answers[randomIndex]).replace("%number%", answerNumber);

    listContainer.innerHTML += answerText;
    answerNumber++;
}
    let progress = `<p>${questionIndex+1} out of ${questions.length}</p>`;
    document.getElementById("progress").innerHTML = progress;

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
    const userAnswer = parseInt(checkedButton.value);

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
    /* Template of HTML structure of results */
    const resultTemplate = `<h2 class="title">%title%</h2>
<h3 class="summary">%message%</h3>
<p class="result">%result%</p>
<button class="check">Show Answers</button>`;

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
        quiz.classList.add("hidden");
        correctAnswer.classList.remove("hidden");
    };

    let playAgain = document.querySelector(".play-again");
    playAgain.onclick = function () {
        window.location.reload();
    };
}
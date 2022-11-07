const questions = [{
        question: "What is the name of Ellie's mom?",
        answer: ["Jessica", "Monica", "Anna", "Tess"],
        correct: 3,
    },
    {
        question: "Around how old is Joel in The Last of Us Part II?",
        answer: ["50s", "40s", "60s", "70s"],
        correct: 1,
    },
    {
        question: "What is Manny's rank in the WLF?",
        answer: ["Sergeant", "Captain", "Lieutenant", "Corporal"],
        correct: 3,
    },
    {
        question: "What item does Ellie keep of Sam's that can be seen in her room at the start of The Last of Us Part II?",
        answer: ["PS3", "Toy robot", "Cassette player", "Animals of the Past book"],
        correct: 2,
    },
    {
        question: "Which game does NOT get referenced in The Last of US Part II?",
        answer: ["Deus Ex", "God of War", "Jak and Daxter", "Crash Bandicoot"],
        correct: 2,
    },
    {
        question: "How old is Ellie at the start of the second game?",
        answer: ["19", "18", "20", "21"],
        correct: 1,
    },
]

/* Getting elements from the dom */
let headerContainer = document.getElementById("header");
let listContainer = document.getElementById("list");
let submitBtn = document.getElementById("submit");


let score = 0;
let questionIndex = 0;

function clearPage() {
    headerContainer.innerHTML = "";
    listContainer.innerHTML = "";
}

clearPage();
showQuestion();
submitBtn.onclick=checkAnswer;

/*A function to show questions*/
function showQuestion() {
    questions[questionIndex]['question'];
    questions[questionIndex]['answer'];

    /*Show a question*/
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
    headerContainer.innerHTML = title;

    /*Show answers*/
    let answerNumber=1;
    for (item of questions[questionIndex]['answer']) {
        console.log(answerNumber, item);
        const questionTemplate = `<li>
        <label>
            <input value="%number%" type="radio" class="answer" name="answer">
            <span>%answer%</span>
        </label>
        </li>`
        
        let answerText = questionTemplate.replace('%answer%', item).replace("%number%", answerNumber);
        listContainer.innerHTML += answerText;
        answerNumber++;
    }
}

function checkAnswer(){
    /* Finding checked button */
    const checkedButton=listContainer.querySelector('input[type="radio"]:checked');

    /*If button wasn't checked - escape function*/
    if(!checkedButton){
        return;
    }

    /* Get the number of user's answer */
    const userAnswer=parseInt(checkedButton.value);

    /* Check answer */
    if (userAnswer===questions[questionIndex]["correct"]){
        score++;
    }

    if(questionIndex !== questions.length-1){
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResult();
    }
}

function showResult(){
    const resultTemplate=`<h2 class="title">%title%</h2>
    <h3 class="summary">%message%</h3>
    <p class="result">%result%</p>`;

    let title;
    let message;

    if (score===questions.length){
        title="Congratulations!";
        message="You answered every question right!";
    } else if((score*100)/questions.length>=50){
        title="Not bad!";
        message="You answered more than a half right!";
    } else {
        title="Could be better";
        message="You answered less than a half right"
    }

    let result=`${score} out of ${questions.length}`;

    const finalMessage=resultTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result);

    headerContainer.innerHTML=finalMessage;

    submitBtn.innerText='Play Again';
    submitBtn.onclick=function(){
        window.location.reload();
    }
}
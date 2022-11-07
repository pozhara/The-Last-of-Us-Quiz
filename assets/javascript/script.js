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
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentObject = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: "Inside which HTML element we will put the javascript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1

    },
    {
        question: "What is the correct syntac for refering an external script",
        choice1: "<script href = 'zzz.js'>",
        choice2: "<script name = 'zzz.js'>",
        choice3: "<script src = 'zzz.js'>",
        choice4: "<script file = 'zzz.js'>",
        answer: 3
    },
    {
        question: "How do you write hello world in an alert box??",
        choice1: "msgBox('helloworld');",
        choice2: "alertBox('helloworld');",
        choice3: "msg('helloworld');",
        choice4: "alert('helloworld');",
        answer: 4

    },
    {
        question: "What is the syntax to get printed in console output in javascript??",
        choice1: "console.log('print');",
        choice2: "console('print');",
        choice3: "printf('print');",
        choice4: "log('print');",
        answer: 1
    }

]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions == 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    console.log((questionCounter / MAX_QUESTIONS) * 100);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100} px`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    }
});

startGame();
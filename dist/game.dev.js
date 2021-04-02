"use strict";

var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var progressText = document.getElementById('progressText');
var scoreText = document.getElementById('score');
var progressBarFull = document.getElementById('progressBarFull');
var currentObject = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var questions = [{
  question: "Inside which HTML element we will put the javascript??",
  choice1: "<script>",
  choice2: "<javascript>",
  choice3: "<js>",
  choice4: "<scripting>",
  answer: 1
}, {
  question: "What is the correct syntac for refering an external script",
  choice1: "<script href = 'zzz.js'>",
  choice2: "<script name = 'zzz.js'>",
  choice3: "<script src = 'zzz.js'>",
  choice4: "<script file = 'zzz.js'>",
  answer: 3
}, {
  question: "How do you write hello world in an alert box??",
  choice1: "msgBox('helloworld');",
  choice2: "alertBox('helloworld');",
  choice3: "msg('helloworld');",
  choice4: "alert('helloworld');",
  answer: 4
}, {
  question: "What is the syntax to get printed in console output in javascript??",
  choice1: "console.log('print');",
  choice2: "console('print');",
  choice3: "printf('print');",
  choice4: "log('print');",
  answer: 1
}];
var CORRECT_BONUS = 10;
var MAX_QUESTIONS = 4;

startGame = function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [].concat(questions);
  getNewQuestion();
};

getNewQuestion = function getNewQuestion() {
  if (availableQuestions == 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign('end.html');
  }

  questionCounter++;
  progressText.innerText = "Question ".concat(questionCounter, "/").concat(MAX_QUESTIONS);
  console.log(questionCounter / MAX_QUESTIONS * 100);
  progressBarFull.style.width = "".concat(questionCounter / MAX_QUESTIONS * 100, " px");
  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach(function (choice) {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(function (choice) {
  choice.addEventListener("click", function (e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];
    var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(function () {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });

  incrementScore = function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
  };
});
startGame();
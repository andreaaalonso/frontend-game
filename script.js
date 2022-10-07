const url = "https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple";

let xmlHttpReq = new XMLHttpRequest();
xmlHttpReq.open("GET", url, false); 
xmlHttpReq.send(null);
let urlResponse = xmlHttpReq.responseText;
let site = JSON.parse(urlResponse);
let triviaQuestions = site.results;
console.log(triviaQuestions);

let indexCounter = 0;
let scoreCounter = 0;
getCurrentQuestion(indexCounter, scoreCounter)

function getNextQuestion() {
  if (indexCounter < 9) {
    indexCounter += 1;
    getCurrentQuestion(indexCounter, scoreCounter);
  }
}

function checkAnswer() {
  
}

function getCurrentQuestion(questionIndex, currentScore) {
  let currentTriviaQuestion = triviaQuestions[questionIndex];
  document.getElementById("display-question").innerHTML = currentTriviaQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentTriviaQuestion.correct_answer;
  document.getElementById("option-two-label").innerHTML = currentTriviaQuestion.incorrect_answers[0];
  document.getElementById("option-three-label").innerHTML = currentTriviaQuestion.incorrect_answers[1];
  document.getElementById("option-four-label").innerHTML = currentTriviaQuestion.incorrect_answers[2];
  document.getElementById("question-number").innerHTML = questionIndex + 1;

  document.getElementById("player-score").innerHTML = currentScore;
}



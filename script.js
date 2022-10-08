const url = "https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple";

let xmlHttpReq = new XMLHttpRequest();
xmlHttpReq.open("GET", url, false); 
xmlHttpReq.send(null);
let urlResponse = xmlHttpReq.responseText;
let site = JSON.parse(urlResponse);
let triviaQuestions = site.results;
console.log(triviaQuestions);

let indexCounter = 0;
let numCorrectAnswer = 0;
getCurrentQuestion(indexCounter, numCorrectAnswer)

function getNextQuestion() {
  if (indexCounter < 9) {
    indexCounter += 1;
    getCurrentQuestion(indexCounter, numCorrectAnswer);
  }
  else {
    document.getElementById("player-score").innerHTML = numCorrectAnswer;
    document.getElementById("display-question").innerHTML = "Congratulations! You finished the game!";
    document.getElementById("option-one-label").innerHTML = "Correct Answers:"
    document.getElementById("option-one").disabled = true;
    document.getElementById("option-two").disabled = true;
    document.getElementById("option-three").disabled = true;
    document.getElementById("option-four").disabled = true;
    document.getElementById("option-two-label").innerHTML = "Incorrect Answers:"
    document.getElementById("option-three-label").innerHTML = numCorrectAnswer;
    document.getElementById("option-four-label").innerHTML = 10 - numCorrectAnswer;
    clearInputCheck();
  }
}

function clearInputCheck() {
  document.getElementById("option-one").checked = false;
  document.getElementById("option-two").checked = false;
  document.getElementById("option-three").checked = false;
  document.getElementById("option-four").checked = false;
}

function getCurrentQuestion(questionIndex, currentScore) {
  let currentTriviaQuestion = triviaQuestions[questionIndex];
  clearInputCheck();

  document.getElementById("display-question").innerHTML = currentTriviaQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentTriviaQuestion.correct_answer;
  document.getElementById("option-two-label").innerHTML = currentTriviaQuestion.incorrect_answers[0];
  document.getElementById("option-three-label").innerHTML = currentTriviaQuestion.incorrect_answers[1];
  document.getElementById("option-four-label").innerHTML = currentTriviaQuestion.incorrect_answers[2];
  document.getElementById("question-number").innerHTML = questionIndex + 1;
  document.getElementById("player-score").innerHTML = currentScore;
}

function checkCorrectAnswer() {
  numCorrectAnswer += 1;
  setTimeout(() => { getNextQuestion(); }, 500);
}

function checkIncorrectAnswer() {
  setTimeout(() => { getNextQuestion(); }, 500);
}
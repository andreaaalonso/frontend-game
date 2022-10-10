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
let questionArray = [];
let correctAnswer = "";
getCurrentQuestion(indexCounter, numCorrectAnswer)

function getNextQuestion() {
  if (indexCounter < 9) {
    indexCounter += 1;
    getCurrentQuestion(indexCounter, numCorrectAnswer);
  }
  else {
    document.getElementById("player-score").innerHTML = numCorrectAnswer;
    document.getElementById("display-question").innerHTML = "Congratulations! You finished the game!";
    document.getElementById("option-one-label").innerHTML = "Correct Answers:";
    document.getElementById("option-one").disabled = true;
    document.getElementById("option-two").disabled = true;
    document.getElementById("option-three").disabled = true;
    document.getElementById("option-four").disabled = true;
    document.getElementById("option-two-label").innerHTML = "Incorrect Answers:";
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

function checkInput1Answer() {
  if (questionArray[0] == correctAnswer) {
    numCorrectAnswer += 1;
    document.getElementById("option-one-label").className = "correct_option";
  }
  else {
    document.getElementById("option-one-label").className = "option";
  }
  setTimeout(() => { getNextQuestion(); }, 500);
}
function checkInput2Answer() {
  if (questionArray[1] == correctAnswer) {
    numCorrectAnswer += 1;
    document.getElementById("option-two-label").className = "correct_option";
  }
  else {
    document.getElementById("option-two-label").className = "option";
  }
  setTimeout(() => { getNextQuestion(); }, 500);
}
function checkInput3Answer() {
  if (questionArray[2] == correctAnswer) {
    numCorrectAnswer += 1;
    document.getElementById("option-three-label").className = "correct_option";
  }
  else {
    document.getElementById("option-three-label").className = "option";
  }
  setTimeout(() => { getNextQuestion(); }, 500);
}
function checkInput4Answer() {
  if (questionArray[3] == correctAnswer) {
    numCorrectAnswer += 1;
    document.getElementById("option-four-label").className = "correct_option";
  }
  else {
    document.getElementById("option-four-label").className = "option";
  }
  setTimeout(() => { getNextQuestion(); }, 500);
}

function getCurrentQuestion(questionIndex, currentScore) {
  let currentTriviaQuestion = triviaQuestions[questionIndex];
  correctAnswer = currentTriviaQuestion.correct_answer;
  clearInputCheck();

  questionArray = [];
  questionArray.push(currentTriviaQuestion.correct_answer);
  questionArray.push(currentTriviaQuestion.incorrect_answers[0])
  questionArray.push(currentTriviaQuestion.incorrect_answers[1])
  questionArray.push(currentTriviaQuestion.incorrect_answers[2])
  questionArray = questionArray.sort();

  document.getElementById("display-question").innerHTML = currentTriviaQuestion.question;
  document.getElementById("option-one-label").innerHTML = questionArray[0];
  document.getElementById("option-two-label").innerHTML = questionArray[1];
  document.getElementById("option-three-label").innerHTML = questionArray[2];
  document.getElementById("option-four-label").innerHTML = questionArray[3];
  document.getElementById("question-number").innerHTML = questionIndex + 1;
  document.getElementById("player-score").innerHTML = currentScore;
}
import './style/style.scss';

import quizQuestions from './questions.js';
import { check } from 'prettier';

//=================================================================================================
//----------------------------------- VARIABLE DECLARATIONS ---------------------------------------
//=================================================================================================
const animalQuestionsEasy = quizQuestions.results;

const playerRegBtn = document.querySelector('#playerRegBtn');
const playerRegMsg = document.createElement("p");
const startGameBtn = document.querySelector('#start-game-button');
const startPage = document.querySelector('#start-page');
const questionPage = document.querySelector('#question-page');
const gameOverPage = document.querySelector('#game-over-page')
const questionText = document.querySelector('#question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const playAgainBtn = document.querySelector('#playAgainBtn');

let questionCounter = 0;

// questions and answers
let question = animalQuestionsEasy[questionCounter].question;
let correctAnswer = animalQuestionsEasy[questionCounter].correct_answer;
let incorrectAnswers = animalQuestionsEasy[questionCounter].incorrect_answers;

// score
const scoreText = document.querySelector('#score');
let score = 0;

//=================================================================================================
//----------------------------------- FUNCTION DECLARATIONS ---------------------------------------
//=================================================================================================

// init function to run on page load
function init() {
  startPage.style.display = 'flex';
  questionPage.style.display = 'none';
  gameOverPage.style.display = 'none';
}

// player name
function savePlayerName() {

  const playerName = document.querySelector('#playerName');

  if (playerName.value == "") {
    playerRegMsg.innerHTML = "Please write your name";
    addPlayer.append(playerRegMsg);
  } else {
    playerRegMsg.innerHTML = `Hello ${playerName.value}, press start to play!`;
    addPlayer.append(playerRegMsg);
  }
}

// start quiz button
const startQuiz = () => {

  const playerName = document.querySelector('#playerName');

  if (playerName.value == "") {
    savePlayerName();
    return;
  }
  renderQuestions()
  startPage.style.display = 'none';
  questionPage.style.display = 'flex';
  gameOverPage.style.display = 'none';
}

// generate random number 0-3
function randomNumber() {
  return Math.floor(Math.random() * 3);
}

// render questions
function renderQuestions() {

  if (questionCounter >= 10) {
    return;
  } else {
    questionPage.style.display = 'flex';
    gameOverPage.style.display = 'none';
  }

  scoreText.innerHTML = `Score: ${score}`;

  question = animalQuestionsEasy[questionCounter].question;
  correctAnswer = animalQuestionsEasy[questionCounter].correct_answer;
  incorrectAnswers = animalQuestionsEasy[questionCounter].incorrect_answers;

  // render question
  questionText.innerHTML = question;

  // randomize answer buttons
  let randomIndex = randomNumber();
  let incorrectBtnIndex = 0;

  // render answer buttons
  answerBtns.forEach((btn, index) => {
    if (index != randomIndex) {
      btn.innerHTML = `${incorrectAnswers[incorrectBtnIndex]}`
      btn.classList.add('incorrectAnswer');
      incorrectBtnIndex++;
    } else {
      btn.innerHTML = `${correctAnswer}`;
      btn.classList.add('correctAnswer');
    }
  });
}

// reset button classes after each question
function clearClasses() {
  answerBtns.forEach(btn => {
    btn.className = 'answer-btn';
  });
}

// play again
function restartGame() {
  score = 0;
  questionCounter = 0;
  init();
}

// check if answer is correct, add 1 score if true
function checkAnswer(e) {
  const myAnswer = e.currentTarget.innerHTML;

  if (myAnswer == correctAnswer) {
    score = score + 1;
    console.log('Correct answer!');
  } else if (myAnswer == incorrectAnswers[0] || incorrectAnswers[1] || incorrectAnswers[2]) {
    console.log('Incorrect answer!')
  }

  if (questionCounter < 9) {
    questionPage.style.display = 'flex';
    gameOverPage.style.display = 'none';
    questionCounter++;
    renderQuestions();
  } else {
    questionPage.style.display = 'none';
    gameOverPage.style.display = 'flex';
    questionCounter = 0;
  }
  clearClasses();
}

//=================================================================================================
//-------------------------------------- PROGRAM LOGIC --------------------------------------------
//=================================================================================================

// calls init function to run on page load
init();

// start quiz
startGameBtn.addEventListener('click', startQuiz);

// player name
playerRegBtn.addEventListener('click', savePlayerName);

// play again
playAgainBtn.addEventListener('click', restartGame);

// check answers
answerBtns.forEach(btn => {
  btn.addEventListener('click', checkAnswer);
})
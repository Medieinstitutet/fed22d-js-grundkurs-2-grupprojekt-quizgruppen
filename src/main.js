import './style/style.scss';

import animalQsEasy from './animals-easy.js';
import animalQsMedium from './animals-med.js';
import animalQsHard from './animals-hard.js';
import { check } from 'prettier';

//=================================================================================================
//----------------------------------- VARIABLE DECLARATIONS ---------------------------------------
//=================================================================================================
const animalQuestionsEasy = animalQsEasy.results;
const animalQuestionsMedium = animalQsMedium.results;
const animalQuestionsHard = animalQsHard.results;


const playerRegBtn = document.querySelector('#playerRegBtn');
const questionPage = document.querySelector('#question-page');
const gameOverPage = document.querySelector('#game-over-page')
const questionText = document.querySelector('#question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const startPage = document.querySelector('#start-page');
const categoryPage = document.querySelector('#category-page');

let questionCounter = 0;

// questions and answers (chosen at start screen)
let question = null;
let correctAnswer = null;
let incorrectAnswers = null;

let difficulty = null;

// score
const scoreText = document.querySelector('#score');
let score = 0;

//=================================================================================================
//----------------------------------- FUNCTION DECLARATIONS ---------------------------------------
//=================================================================================================

// player name
function savePlayerName() {

    const playerName = document.querySelector('#playerName');

    if (playerName.value == "") {
        const errorMsgNode = document.querySelector('#errorMsgNode')
        errorMsgNode.innerHTML = 'Fältet är tomt. Fyll i ditt namn.';
    } else {
        addPlayer.classList.add('hideName');
        renderCategoryPage();
    }
}

function init() {
  startPage.style.display = 'flex';
  categoryPage.style.display = 'none';
  questionPage.style.display = 'none';
  gameOverPage.style.display = 'none';
}

function renderCategoryPage() {
  startPage.style.display = 'none';
  categoryPage.style.display = 'flex';
}

function difficultyChoice(e) {
  const choice = e.currentTarget.innerHTML;

  if (choice.toLowerCase() == 'easy') {
    difficulty = 'easy';
  } else if (choice.toLowerCase() == 'medium') {
    difficulty = 'medium';
  } else if (choice.toLowerCase() == 'hard') {
    difficulty = 'hard';
  }
  categoryPage.style.display = 'none';
  renderQuestions();
}

// generate random number 0-3
function randomNumber() {
  return Math.floor(Math.random() * 3);
}

// render questions
function renderQuestions() {

  // reset question counter
  if (questionCounter >= 10) {
    questionCounter = 0;
    questionPage.style.display = 'none';
    gameOverPage.style.display = 'flex';
  } else {
    questionPage.style.display = 'flex';
  }

  if (difficulty == 'easy') {
    question = animalQuestionsEasy[questionCounter].question;
    correctAnswer = animalQuestionsEasy[questionCounter].correct_answer;
    incorrectAnswers = animalQuestionsEasy[questionCounter].incorrect_answers;
  } else if (difficulty == 'medium') {
    question = animalQuestionsMedium[questionCounter].question;
    correctAnswer = animalQuestionsMedium[questionCounter].correct_answer;
    incorrectAnswers = animalQuestionsMedium[questionCounter].incorrect_answers;
  } else if (difficulty == 'hard') {
    chosenQuestionDif = animalQuestionsHard[questionCounter].question;
    chosenCorrectAnswerDif = animalQuestionsHard[questionCounter].correct_answer;
    chosenIncorrectAnswersDif = animalQuestionsHard[questionCounter].incorrect_answers;
  }
  
  scoreText.innerHTML = `Score: ${score}`;

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

  clearClasses();

  if(questionCounter < 10) {
    questionCounter = questionCounter + 1;
    console.log(questionCounter);
    renderQuestions();
  } else {
    questionPage.style.display = 'none';
    gameOverPage.style.display = 'flex';
    questionCounter = 0;
  }
}

//=================================================================================================
//-------------------------------------- PROGRAM LOGIC --------------------------------------------
//=================================================================================================

// player name
playerRegBtn.addEventListener('click', savePlayerName);

// difficulty
document.querySelector('#easy-btn').addEventListener('click', difficultyChoice);
document.querySelector('#medium-btn').addEventListener('click', difficultyChoice);
document.querySelector('#hard-btn').addEventListener('click', difficultyChoice);

// play again
playAgainBtn.addEventListener('click', restartGame);

// check answers
answerBtns.forEach(btn => {
  btn.addEventListener('click', checkAnswer);
})

init();
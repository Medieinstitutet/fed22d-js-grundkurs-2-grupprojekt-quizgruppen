import './style/style.scss';

import animalQsEasy from './animals-easy.js';
import animalQsMedium from './animals-med.js';
import animalQsHard from './animals-hard.js';
import geographyQsEasy from './geography-easy.js';
import geographyQsMedium from './geography-medium.js';
import geographyQsHard from './geography-hard.js';
import computerQsEasy from './computer-easy.js';
import computerQsMedium from './computer-medium.js';
import computerQsHard from './computer-hard.js';
import { check } from 'prettier';

//=================================================================================================
//----------------------------------- VARIABLE DECLARATIONS ---------------------------------------
//=================================================================================================
const animalQuestionsEasy = animalQsEasy.results;
const animalQuestionsMedium = animalQsMedium.results;
const animalQuestionsHard = animalQsHard.results;
const geographyQuestionsEasy = geographyQsEasy.results;
const geographyQuestionsMedium = geographyQsMedium.results;
const geographyQuestionsHard = geographyQsHard.results;
const computerQuestionsEasy = computerQsEasy.results;
const computerQuestionsMedium = computerQsMedium.results;
const computerQuestionsHard = computerQsHard.results;

const questionPage = document.querySelector('#question-page');
const gameOverPage = document.querySelector('#game-over-page');
const startPage = document.querySelector('#start-page');
const difficultyPage = document.querySelector('#difficulty-page');
const categoryPage = document.querySelector('#category-page');

const playerRegBtn = document.querySelector('#playerRegBtn');
const questionText = document.querySelector('#question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const playAgainBtn = document.querySelector('#playAgainBtn');

// category and difficulty (chosen at start screen)
let difficulty = null;
let category = null;
let question = null;
let correctAnswer = null;
let incorrectAnswers = null;

// score
const scoreText = document.querySelector('#score');
let score = 0;

// keep track of current question
let questionCounter = 0;

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
  questionCounter = 0;
  startPage.style.display = 'flex';
  categoryPage.style.display = 'none';
  difficultyPage.style.display = 'none';
  questionPage.style.display = 'none';
  gameOverPage.style.display = 'none';
}

function renderCategoryPage() {
  startPage.style.display = 'none';
  categoryPage.style.display = 'flex';
}

function categoryChoice(e) {
  const choice = e.currentTarget.innerHTML;

  if (choice.toLowerCase() == 'animals') {
    category = 'animals';
  } else if (choice.toLowerCase() == 'geography') {
    category = 'geography';
  } else if (choice.toLowerCase() == 'computer') {
    category = 'computer';
  }
  renderDifficultyPage();
}

function renderDifficultyPage() {
  categoryPage.style.display = 'none';
  difficultyPage.style.display = 'flex';
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
  difficultyPage.style.display = 'none';
  renderQuestions();
}

// generate random number 0-3
function randomNumber() {
  return Math.floor(Math.random() * 3);
}

// category & difficulty
function chosenQuiz() {
  if (category == 'animals') {
    if (difficulty == 'easy') {
      question = animalQuestionsEasy[questionCounter].question;
      correctAnswer = animalQuestionsEasy[questionCounter].correct_answer;
      incorrectAnswers = animalQuestionsEasy[questionCounter].incorrect_answers;
    } else if (difficulty == 'medium') {
      question = animalQuestionsMedium[questionCounter].question;
      correctAnswer = animalQuestionsMedium[questionCounter].correct_answer;
      incorrectAnswers = animalQuestionsMedium[questionCounter].incorrect_answers;
    } else if (difficulty == 'hard') {
      question = animalQuestionsHard[questionCounter].question;
      correctAnswer = animalQuestionsHard[questionCounter].correct_answer;
      incorrectAnswers = animalQuestionsHard[questionCounter].incorrect_answers;
    } 
  } else if (category == 'geography') {
    if (difficulty == 'easy') {
      question = geographyQuestionsEasy[questionCounter].question;
      correctAnswer = geographyQuestionsEasy[questionCounter].correct_answer;
      incorrectAnswers = geographyQuestionsEasy[questionCounter].incorrect_answers;
    } else if (difficulty == 'medium') {
      question = geographyQuestionsMedium[questionCounter].question;
      correctAnswer = geographyQuestionsMedium[questionCounter].correct_answer;
      incorrectAnswers = geographyQuestionsMedium[questionCounter].incorrect_answers;
    } else if (difficulty == 'hard') {
      question = geographyQuestionsHard[questionCounter].question;
      correctAnswer = geographyQuestionsHard[questionCounter].correct_answer;
      incorrectAnswers = geographyQuestionsHard[questionCounter].incorrect_answers;
    } 
  } else if (category == 'computer') {
    if (difficulty == 'easy') {
      question = computerQuestionsEasy[questionCounter].question;
      correctAnswer = computerQuestionsEasy[questionCounter].correct_answer;
      incorrectAnswers = computerQuestionsEasy[questionCounter].incorrect_answers;
    } else if (difficulty == 'medium') {
      question = computerQuestionsMedium[questionCounter].question;
      correctAnswer = computerQuestionsMedium[questionCounter].correct_answer;
      incorrectAnswers = computerQuestionsMedium[questionCounter].incorrect_answers;
    } else if (difficulty == 'hard') {
      question = computerQuestionsHard[questionCounter].question;
      correctAnswer = computerQuestionsHard[questionCounter].correct_answer;
      incorrectAnswers = computerQuestionsHard[questionCounter].incorrect_answers;
    } 
  }
}

// render questions
function renderQuestions() {

  // reset question counter
  if (questionCounter >= 10) {
    init();
  } else {
    questionPage.style.display = 'flex';
  }
   
  chosenQuiz();

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
  }
}

//=================================================================================================
//-------------------------------------- PROGRAM LOGIC --------------------------------------------
//=================================================================================================

// player name
playerRegBtn.addEventListener('click', savePlayerName);

// difficulty
document.querySelector('#animals-btn').addEventListener('click', categoryChoice);
document.querySelector('#geography-btn').addEventListener('click', categoryChoice);
document.querySelector('#computer-btn').addEventListener('click', categoryChoice);

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
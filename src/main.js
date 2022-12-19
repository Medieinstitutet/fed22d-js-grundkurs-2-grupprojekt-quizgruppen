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


const playerRegBtn = document.querySelector('#playerRegBtn');
const playerRegMsg = document.createElement("p");
const startGameBtn = document.querySelector('#start-game-button');
const startPage = document.querySelector('#start-page');

const allPages = document.querySelectorAll('.page');

const questionPage = document.querySelector('#question-page');
const gameOverPage = document.querySelector('#game-over-page');
const difficultyPage = document.querySelector('#difficulty-page');
const categoryPage = document.querySelector('#category-page');
const highscorePage = document.querySelector('#highscore-page');

const scoreText = document.querySelector('#score');
const questionText = document.querySelector('#question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const highscoreBtns = document.querySelectorAll('.highscore-btn');

const pointsScore = document.querySelector('#points');

const highscoreList = document.querySelector('#highscore-list');
const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// player
let currentName = null;
let currentScore = 0;

// category and difficulty (chosen at start screen)
let difficulty = null;
let category = null;
let question = null;
let correctAnswer = null;
let incorrectAnswers = null;

// keep track of current question
let questionCounter = 0;

//=================================================================================================
//----------------------------------- FUNCTION DECLARATIONS ---------------------------------------
//=================================================================================================


// initiate quiz
function init() {
  currentName = "";
  gameOverPage.style.display = 'none';
  startPage.style.display = 'flex';
}

// player information
class playerData {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

}

// player name
function savePlayerName() {

  const playerName = document.querySelector('#playerName');
  const nameRegEx = /^[a-zA-ZåäöÅÄÖ-]+$/;
  if (playerName.value == "" || !playerName.value.match(nameRegEx)) {
    playerRegMsg.innerHTML = "Please write your name";
    addPlayer.append(playerRegMsg);
  } else {
    playerRegMsg.innerHTML = `Hello ${playerName.value}, press start to play!`;
    addPlayer.append(playerRegMsg);
    currentName = playerName.value;
    renderCategoryPage();
  }
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

// check which category & difficulty
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

  // check which quiz is chosen
  chosenQuiz();

  // render score
  scoreText.innerHTML = `Score: ${currentScore}`;

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
  currentScore = 0;
  questionCounter = 0;
  init();
}

// render highscore page
function renderStartPage() {
  allPages.forEach(page => {
    if (page.className[0] != 'start-page') {
      page.style.display = 'none';
    }
  });
  startPage.style.display = 'flex';
}

// render highscore page
function renderHighscores() {
  addHighscore();
  allPages.forEach(page => {
    if (page.className[0] != 'highscore-page') {
      page.style.display = 'none';
    }
  });
  highscorePage.style.display = 'flex';
}

// highscore
function setHighscore() {
  const newScore = new playerData(currentName, currentScore);
  
  highscores.push(newScore);
  highscores.sort((a, b) => b.score - a.score);
  highscores.splice(10);

  localStorage.setItem('highscores', JSON.stringify(highscores));

  addHighscore();
}

// add to highscores
function addHighscore() {
  highscoreList.innerHTML = highscores.map(score => {
    return `<li>${score.name}: ${score.score}`;
  })
  .join("");
}

// check if answer is correct, add 1 score if true
function checkAnswer(e) {
  const myAnswer = e.currentTarget.innerHTML;

  if (myAnswer == correctAnswer) {
    currentScore += 1;
    console.log('Correct answer!');
  } else if ((myAnswer == incorrectAnswers[0] || incorrectAnswers[1] || incorrectAnswers[2]) && currentScore > 0) {
    currentScore -= 1;
    console.log('Incorrect answer!')
  }

  clearClasses();

  if(questionCounter < 9) {
    questionCounter ++;
    renderQuestions();
  } else {
    pointsScore.innerHTML = `${currentScore}`;
    setHighscore();
    questionPage.style.display = 'none';
    gameOverPage.style.display = 'flex';
  }
}

//=================================================================================================
//-------------------------------------- PROGRAM LOGIC --------------------------------------------
//=================================================================================================

// start quiz
startGameBtn.addEventListener('click', savePlayerName);

// category
document.querySelector('#animals-btn').addEventListener('click', categoryChoice);
document.querySelector('#geography-btn').addEventListener('click', categoryChoice);
document.querySelector('#computer-btn').addEventListener('click', categoryChoice);

// difficulty
document.querySelector('#easy-btn').addEventListener('click', difficultyChoice);
document.querySelector('#medium-btn').addEventListener('click', difficultyChoice);
document.querySelector('#hard-btn').addEventListener('click', difficultyChoice);

// go back btn
document.querySelector('#back-btn').addEventListener('click', renderStartPage);

// play again
playAgainBtn.addEventListener('click', restartGame);

// check answers
answerBtns.forEach(btn => {
  btn.addEventListener('click', checkAnswer);

})

highscoreBtns.forEach(btn => {
  btn.addEventListener('click', renderHighscores);
})

// calls init function to run on page load
init();


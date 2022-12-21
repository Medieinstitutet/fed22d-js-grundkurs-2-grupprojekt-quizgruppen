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
let questionTimer = null;
let category = null;
let question = null;
let correctAnswer = null;
let incorrectAnswers = null;

let countdownInterval = null;

// keep track of current question
let questionCounter = 0;

//=================================================================================================
//----------------------------------- FUNCTION DECLARATIONS ---------------------------------------
//=================================================================================================


// initiate quiz
function init() {
  currentName = "";
  renderStartPage();
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

//================= RENDER PAGES =================//

// start page
function renderStartPage() {
  allPages.forEach(page => {
    if (!page.classList.contains('start-page') && !page.classList.contains('hidden')) {
        page.classList.add('hidden');
    }
  });
  startPage.classList.remove('hidden');
}

// category page
function renderCategoryPage() {
  allPages.forEach(page => {
    if (!page.classList.contains('category-page') && !page.classList.contains('hidden')) {
        page.classList.add('hidden');
    }
  });
  categoryPage.classList.remove('hidden');
}

// difficulty page
function renderDifficultyPage() {
  allPages.forEach(page => {
    if (!page.classList.contains('difficulty-page') && !page.classList.contains('hidden')) {
        page.classList.add('hidden');
    }
  });
  difficultyPage.classList.remove('hidden');
}

// questions page
function renderQuestionsPage() {
  allPages.forEach(page => {
    if (!page.classList.contains('question-page') && !page.classList.contains('hidden')) {
        page.classList.add('hidden');
    }
  });
  questionPage.classList.remove('hidden');
}

// game over page
function renderGameOverPage() {
  setHighscore();
  pointsScore.innerHTML = `${currentScore}`;
  allPages.forEach(page => {
    if (!page.classList.contains('game-over-page') && !page.classList.contains('hidden')) {
        page.classList.add('hidden');
    }
  });
  gameOverPage.classList.remove('hidden');
}

// highscore page
function renderHighscores() {
  addHighscore();
  allPages.forEach(page => {
    if (!page.classList.contains('highscore-page') && !page.classList.contains('hidden')) {
        page.classList.add('hidden');
    }
  });
  highscorePage.classList.remove('hidden');
}

//============== QUIZ CHOICES ===============//

// category choice
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

// difficulty choice
function difficultyChoice(e) {
  const choice = e.currentTarget.innerHTML;

  if (choice.toLowerCase() == 'easy') {
    difficulty = 'easy';
  } else if (choice.toLowerCase() == 'medium') {
    difficulty = 'medium';
  } else if (choice.toLowerCase() == 'hard') {
    difficulty = 'hard';
  }
  renderQuestionsPage();
  renderQuestions();
}

// check which category & difficulty  ----- TODO : Solve in a cleaner way -----
function chosenQuiz() {
  if (category == 'animals') {
    if (difficulty == 'easy') {
      question = animalQuestionsEasy[questionCounter].question;
      correctAnswer = animalQuestionsEasy[questionCounter].correct_answer;
      incorrectAnswers = animalQuestionsEasy[questionCounter].incorrect_answers;
      questionTimer = 45;
    } else if (difficulty == 'medium') {
      question = animalQuestionsMedium[questionCounter].question;
      correctAnswer = animalQuestionsMedium[questionCounter].correct_answer;
      incorrectAnswers = animalQuestionsMedium[questionCounter].incorrect_answers;
      questionTimer = 30;
    } else if (difficulty == 'hard') {
      question = animalQuestionsHard[questionCounter].question;
      correctAnswer = animalQuestionsHard[questionCounter].correct_answer;
      incorrectAnswers = animalQuestionsHard[questionCounter].incorrect_answers;
      questionTimer = 15;
    } 
  } else if (category == 'geography') {
    if (difficulty == 'easy') {
      question = geographyQuestionsEasy[questionCounter].question;
      correctAnswer = geographyQuestionsEasy[questionCounter].correct_answer;
      incorrectAnswers = geographyQuestionsEasy[questionCounter].incorrect_answers;
      questionTimer = 45;
    } else if (difficulty == 'medium') {
      question = geographyQuestionsMedium[questionCounter].question;
      correctAnswer = geographyQuestionsMedium[questionCounter].correct_answer;
      incorrectAnswers = geographyQuestionsMedium[questionCounter].incorrect_answers;
      questionTimer = 30;
    } else if (difficulty == 'hard') {
      question = geographyQuestionsHard[questionCounter].question;
      correctAnswer = geographyQuestionsHard[questionCounter].correct_answer;
      incorrectAnswers = geographyQuestionsHard[questionCounter].incorrect_answers;
      questionTimer = 15;
    } 
  } else if (category == 'computer') {
    if (difficulty == 'easy') {
      question = computerQuestionsEasy[questionCounter].question;
      correctAnswer = computerQuestionsEasy[questionCounter].correct_answer;
      incorrectAnswers = computerQuestionsEasy[questionCounter].incorrect_answers;
      questionTimer = 45;
    } else if (difficulty == 'medium') {
      question = computerQuestionsMedium[questionCounter].question;
      correctAnswer = computerQuestionsMedium[questionCounter].correct_answer;
      incorrectAnswers = computerQuestionsMedium[questionCounter].incorrect_answers;
      questionTimer = 30;
    } else if (difficulty == 'hard') {
      question = computerQuestionsHard[questionCounter].question;
      correctAnswer = computerQuestionsHard[questionCounter].correct_answer;
      incorrectAnswers = computerQuestionsHard[questionCounter].incorrect_answers;
      questionTimer = 15;
    } 
  }
}

// render questions
function renderQuestions() {

  // check which quiz is chosen
  chosenQuiz();

  // start countdown
  startCountdown(5);

  // render score
  scoreText.innerHTML = `Score: ${currentScore}`;

  // render question
  questionText.innerHTML = question;

  // randomize answer buttons
  let randomIndex = Math.floor(Math.random() * 3);
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

// timer countdown
function startCountdown(seconds) {
  const countdownEl = document.querySelector('#countdown');
  let countdownSeconds = seconds;
  countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    countdownEl.innerHTML = `${countdownSeconds}`;
    // console.log(countdownSeconds);
    
    if (countdownSeconds > 0) {
      countdownSeconds--;
    } else if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      renderGameOverPage();
    }
  }
  updateCountdown();
}

function stopCountdown() {
  clearInterval(countdownInterval);
}

// play again
function restartGame() {
  currentScore = 0;
  questionCounter = 0;
  init();
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
  } else if ((myAnswer == incorrectAnswers[0] || myAnswer == incorrectAnswers[1] || myAnswer == incorrectAnswers[2])) {
    currentScore > 0 ? currentScore -= 1 : null;
  }

  clearClasses();

  if(questionCounter < 9) {
    questionCounter++;
    stopCountdown();
    renderQuestions();
  } else {
    renderGameOverPage();
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


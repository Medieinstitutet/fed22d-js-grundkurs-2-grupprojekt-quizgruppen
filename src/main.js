/* eslint-disable linebreak-style */
import './style/style.scss';

import quizQuestions from './questions.js';
import { check } from 'prettier';

const animalQuestionsEasy = quizQuestions.results;

const app = document.querySelector('#app');

let score = 0;

const createScore = document.createElement('p');
createScore.innerHTML = `Score: ${score}`;
app.appendChild(createScore);


// render questions
function renderQuestions() {

  animalQuestionsEasy.forEach(element => {
    const question = element.question;
    const correctAnswer = element.correct_answer;
    const incorrectAnswers = element.incorrect_answers;

    // create container for question and answers
    const questionDiv = document.createElement('div');
    questionDiv.className = 'questionDiv';
    app.appendChild(questionDiv);

    // create question and append
    const questionH2 = document.createElement('h2');
    questionH2.innerHTML = question;
    questionDiv.appendChild(questionH2);

    // create correct answer and append
    const correctAnswerBtn = document.createElement('button');
    correctAnswerBtn.className = 'correctAnswer';
    correctAnswerBtn.innerHTML = `${correctAnswer}`;

    correctAnswerBtn.addEventListener('click', checkAnswer);

    // create array of all buttons
    const allAnswersBtns = [correctAnswerBtn];

    // create incorrect answers and append
    incorrectAnswers.forEach(answer => {
      const incorrectAnswerBtn = document.createElement('button');
      incorrectAnswerBtn.className = 'incorrectAnswer';
      incorrectAnswerBtn.innerHTML = `${answer}`;
      incorrectAnswerBtn.addEventListener('click', checkAnswer);
      allAnswersBtns.push(incorrectAnswerBtn);
    });

    // randomize what order the answers will be displayed in
    const randomizedAnswersBtns = allAnswersBtns.sort(() => Math.random() - 0.5);

    randomizedAnswersBtns.forEach(button => {
      questionDiv.appendChild(button);
    })
  });
}

// check if answer is correct, add 1 score if true
function checkAnswer(e) {
  const myAnswer = e.currentTarget.className;

  if (myAnswer === 'correctAnswer') {
    score = score + 1;
    console.log('Correct answer!');
    createScore.innerHTML = `Score: ${score}`;
  } else if (myAnswer === 'incorrectAnswer') {
    console.log('Try again!')
  }
}


renderQuestions();

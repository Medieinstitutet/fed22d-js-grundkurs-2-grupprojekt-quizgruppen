import './style/style.scss';

// ****************************************************************************************************
// ------------------------------------------ DECLARE VARIABLES ---------------------------------------
// ****************************************************************************************************

//TEST, 2 questions in an array of objects
const quizContent = [
    {
        questionText: 'What is 1 + 1?',
        answerOptions: ['3', '2', '4'],
        correct: '2',
    },

    {
        questionText: 'What is 2 + 3?',
        answerOptions: ['7', '4', '5'],
        correct: '5',
    },
]

//selecting the html-containers for question and answer options
const questionContainer = document.querySelector("#question-text");
const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");

//selecting the next-question-button
const nextBtn = document.querySelector("#nextBtn");

//variable to keep track of the object index in the array, index starts on 0
let currentObject = 0;


// ****************************************************************************************************
// ----------------------------------------- DECLARE FUNCTIONS ----------------------------------------
// ****************************************************************************************************

/**
 * Function to show a new question and its answer options
 */
const newQuestion = () => {
    questionContainer.innerHTML = quizContent[currentObject].questionText;
    answer1.innerHTML = quizContent[currentObject].answerOptions[0];
    answer2.innerHTML = quizContent[currentObject].answerOptions[1];
    answer3.innerHTML = quizContent[currentObject].answerOptions[2];
    currentObject++; //adds +1 every time we run the function (keeps track of object index)
}


// ****************************************************************************************************
// --------------------------------------------- PROGRAM LOGIC ----------------------------------------
// ****************************************************************************************************

//Calls function to display question and answer options
newQuestion();

//Adds an event listener to the next-question-button, on click the function newQuestion will run
nextBtn.addEventListener('click', newQuestion);
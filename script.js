'use strict'

const questions = [
  {
    question: 'Is this Quiz easy to edit',
    answers: [
      {
        answer: 'Yes!',
        isCorrect: true,
      },
      {
        answer: 'Oh NO!',
        isCorrect: false,
      },
  ],
  },
  {
    question: 'Which of the following is not a real eCommerce platform?',
    answers: [
      {
        answer: 'Shopify',
        isCorrect: false,
      },
      {
        answer: 'WooCommerce',
        isCorrect: false,
      },
      {
        answer: 'ShopCommerce',
        isCorrect: true,
      },
      {
        answer: 'BigCommerce',
        isCorrect: false,
      },
  ],
  },

  {
    question: 'If Shopify is so good, why are Shopify developers necessary?',
    answers: [
      {
        answer: 'To save time on things like store setups and migrations',
        isCorrect: false,
      },
      {
        answer: 'To extend the limited design options and functionalities of themes with custom code',
        isCorrect: false,
      },
      {
        answer: 'To provide support with a deep understanding of how the platform works and what its limitations are',
        isCorrect: false,
      },
      {
        answer: 'All the above',
        isCorrect: true,
      },
  ],
  },
  {
    question: 'Which of the following is true about Shopify developers?',
    answers: [
      {
        answer: 'They are paid extremely well',
        isCorrect: false,
      },
      {
        answer: 'There is a high demand for them',
        isCorrect: false,
      },
      {
        answer: 'They need to know web development, the platform itself, and the liquid template language',
        isCorrect: true,
      },
      {
        answer: 'All the above',
        isCorrect: true,
      },
    ],
  },
]

const questionContainers = [];
const nextButtonElements = [];
const previousButtonElements = [];
const errorMessages = [];

let radioID = 0;
let activeQuestionIndex = 0;

const mainContainerElement = document.querySelector('.main-container-js');
const scoreElement = document.querySelector('.score-board-js')
const formElement = document.querySelector('form')


//CREATE HTML
//CREATE QUESTION CONTAINERS
for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
  
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');
  if (questionIndex > 0) questionContainer.classList.add('hidden');

  //CREATE QUESTION HEADLINES
    questionContainer.insertAdjacentHTML(
    'beforeend',
    `<h2>Question ${questionIndex + 1} of ${questions.length}:</h2>
    <p>${questions[questionIndex].question}</p>`);

    //CREATE RADIO ANSWERS
    for (
      let answerIndex = 0;
      answerIndex < questions[questionIndex].answers.length;
      answerIndex++
      ) {
        radioID++
        questionContainer.insertAdjacentHTML('beforeend', 
          `<div class="radio-container">
          <label for=${radioID}>
          <input type="radio" id=${radioID} name=${questionIndex + 1} data-is-correct=${questions[questionIndex].answers[answerIndex].isCorrect}>
          ${questions[questionIndex].answers[answerIndex].answer}
          <span class="checkmark"></span>
          </label>
          </div`)
        }

    //CREATE ERROR MESSAEGES
    const errorMessage = document.createElement('p')
    errorMessage.innerText = 'Please, select one answer.'
    errorMessage.classList.add('hidden');
    errorMessages.push(errorMessage);
    questionContainer.appendChild(errorMessage)

    //CREATE PREVIOUS BUTTONS
    if (questionIndex > 0) {
    const previousButtonElement = document.createElement('button');
    previousButtonElement.innerText = '< Previous'
    previousButtonElements.push(previousButtonElement);
    questionContainer.appendChild(previousButtonElement)
  }
   
    //CREATE NEXT BUTTONS
    const buttonElement = document.createElement('button');
    buttonElement.innerText = 'Next >'
    buttonElement.id=`button-num-${questionIndex + 1}`
    
    nextButtonElements.push(buttonElement);
    questionContainer.appendChild(buttonElement)
  
  // RENDER QUESTION CONTAINER
  questionContainers.push(questionContainer);
  formElement.appendChild(questionContainer);
}

// NEXT BUTTON
nextButtonElements.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    if (document.querySelectorAll('input[type="radio"]:checked').length <= activeQuestionIndex) {
      showErrorMessage();
    }
    else if (activeQuestionIndex + 1 === questions.length) {
      hideAllQuestions();
      showScore();
    }
    else moveToNext();
  })
})

// PREVIOUS BUTTON
previousButtonElements.forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    moveToPrevious();
  } )
} )

// FUNCTIONS
function moveToNext() {
  activeQuestionIndex++
  hideAllQuestions();
  showActiveQuestion(); 
}

function moveToPrevious() {
  activeQuestionIndex--
  errorMessages[activeQuestionIndex].classList.add('hidden');

  hideAllQuestions();
  showActiveQuestion();
}

function hideAllQuestions() {
  questionContainers.forEach(function(container){
    container.classList.add('hidden')
  })
}

function showActiveQuestion() {
  questionContainers[activeQuestionIndex].classList.remove('hidden');
}

function showErrorMessage() {
  errorMessages[activeQuestionIndex].classList.remove('hidden');
}

function countScore() {
  let score = 0;
  document.querySelectorAll('input[type="radio"]:checked').forEach(
    function(answer) {
      if (answer.dataset.isCorrect === 'true') score++;
    }
  )
  return score;
}

function showScore() {
  scoreElement.innerText = `Score: ${countScore()} of ${questions.length}!`
  scoreElement.classList.remove('hidden')
}
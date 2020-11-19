'use strict'
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Who discovered that the universe is expanding?',
      answers: [
        'Georges Lemaître',
        'Edwin Hubble',
        'Albert Einstein',
        'Max Tegmark'
      ],
      correctAnswer: 'Edwin Hubble'
    },
    {
      question: 'What is the age of the Universe?',
      answers: [
        '6000 years',
        '13.8 billion years',
        'Infinite',
        'It was created last Thursday'
      ],
      correctAnswer: '13.8 billion years'
      // lastThursdayism: true
    },
    {
      question: 'What is the diameter of the Visible Universe?',
      answers: [
        '93 billion light-years',
        '13.8 billion light-years',
        '27.6 billion light-years',
        'Very, very big.'
      ],
      correctAnswer: '93 billion light-years'
    },
    {
      question: 'Who is responsible for creating the Big Bang model of Cosmology?',
      answers: [
        'Alan Guth',
        'Leonard Susskind',
        'Fred Hoyle',
        'Georges Lemaître'
      ],
      correctAnswer: 'Georges Lemaître'
    },
    {
      question: 'Who is responsible for creating the Inflationary model of Cosmology?',
      answers: [
        'Alan Guth',
        'Leonard Susskind',
        'Fred Hoyle',
        'Max Tegmark'
      ],
      correctAnswer: 'Alan Guth'
    },
    {
      question: 'What member of the band Queen has a Ph.D. in Cosmology?',
      answers: [
        'Freddie Mercury',
        'John Deacon',
        'Brian May',
        'Roger Taylor'
      ],
      correctAnswer: 'Brian May'
    },
    {
      question: 'How long after the Big Bang did it take for the Cosmic Microwave Background (CMB) to become visible?',
      answers: [
        '1 million years',
        '4 million years',
        '400,000 years',
        '100,000 years'
      ],
      correctAnswer: '400,000 years'
    },
    {
      question: 'What instrument was used to measure the CMB?',
      answers: [
        'JWST - James Webb Space Telescope',
        'Chandra X-ray Observatory',
        'Spitzer Space Telescope',
        'WMAP - The Wilkinson Microwave Anisotropy Probe'
      ],
      correctAnswer: 'WMAP - The Wilkinson Microwave Anisotropy Probe'
    },
    {
      question: 'What is the name of NASA\'s space telescope set to launch in 2021',
      answers: [
        'TESS - Transiting Exoplanet Survey Satellite',
        'JWST - James Webb Space Telescope',
        'Swift Observatory',
        'Deep Space 1'
      ],
      correctAnswer: 'JWST - James Webb Space Telescope'
    },
    {
      question: 'What did Albert Einstein contribute to Cosmology?',
      answers: [
        'Theory of General relativity',
        'laws of planetary motion',
        'laws of Universal Gravitation',
        'The fine structure constant'
      ],
      correctAnswer: 'Theory of General relativity'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  continue: 0,
  correct: 0
};



/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/


// These functions handle events (submit, click, etc)
function generateMainPage() {
  return `<div class="mainPage">
  <h2>Cosmology</h2>
  <p>This is an easy Cosmology Quiz. Enjoy.</p>
  <div class="startButton">
  <button id="startQuiz">Start Quiz</button>
  </div>
  </div>`

}

function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (event) {
    store.quizStarted = true;

    render();
  })

}



function generateQuestionPage() {
  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer, index) => {
    if (index === 0) {
      return `<input type="radio" id=answer${index}" name="answer" value="${answer}" required>
      <label for"answer${index}">${answer}</label><br>`;
    }
    return `<input type="radio" id=answer${index}" name="answer" value="${answer}">
      <label for"answer${index}">${answer}</label><br>`;
  });
  return `<div class="questionPage">
  <div class="status">Current Question: ${store.questionNumber + 1} of 10</div>
  <div class="score">Current Score: ${store.score}</div>
  <div class="numberCorrect"> ${store.score} correct and ${(store.questionNumber - store.score)} incorrect </div>

  <h2>${question.question}</h2><br>
  <div class="answerBox">  
  <form id="question">
    ${answers.join("")}<br>
  <button type="submit">Submit Answer</button>
  </form>
  </div>
  </div>`

}

function handleAnswerSubmission() {
  $('main').on('submit', '#question', function (event) {
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();


    if (chosenAnswer === store["questions"][`${store.questionNumber}`]["correctAnswer"]) {
      store.score++
      store.correct++
    }
    console.log(store.correct)
    store.questionNumber++;
    store.continue++
    render();
  })
}

function generateCorrectPage() {

  return `<div class="correctPage">
    <h2>Your answer was correct</h2>
    <p>Current Score: ${store.score} of ${store.questionNumber}</p>
    <p>${store.score} correct and ${(store.questionNumber - store.score)} incorrect</p>
    <div class="continueButton">
    <button id ="continue">Continue</button>
    </div>
    </div>`
}

function generateIncorrectPage() {
  return `<div class="incorrectPage">
    <h2>Your answer was incorrect</h2>
    <p> The correct answer is ${store["questions"][store["questionNumber"] - 1]["correctAnswer"]}</p>
    <p>Current Score: ${store.score} of ${store.questionNumber}</p>
    <p>${store.score} correct and ${(store.questionNumber - store.score)} incorrect</p>
    <div class="continueButton">
    <button id ="continue">Continue</button>
    </div>   
    </div>`
}

function generateFinalPage() {
  return `<div class="finalPage">
    <h2>Congratulations, you've completed my quiz.</h2>
    <p>Final Score: ${store.score}</p>
    <p>${store.score} correct and ${(store.questionNumber - store.score)} incorrect</p>
    <div class="startOver">
    <button id ="startOver">Start Over</button>
    </div>
    </div>`
}

function handleStartOver() {
  $('main').on('click', '#startOver', function (event) {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    render();
  })

}

function handleContinue() {
  $('main').on('click', '#continue', function (event) {
    store.continue = 0
    store.correct = 0
    render();
  })

}



function render() {
  let html = "";
  if (!store.quizStarted) {
    html = generateMainPage()
  } else if (store.questionNumber < store.questions.length && store.continue === 0) {
    html = generateQuestionPage();
  } else if (store.questionNumber < store.questions.length && store.correct === 1) {
    store.correct--;
    html = generateCorrectPage();
  } else if (store.questionNumber < store.questions.length) {
    html = generateIncorrectPage();
  }
  else {
    html = generateFinalPage();
  }
  console.log(store.correct)
  $('main').html(html)
}

function main() {

  render();
  handleStartQuiz();
  handleAnswerSubmission();
  handleStartOver();
  handleContinue();
}
$(main);

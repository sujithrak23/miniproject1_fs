const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Javascript is an _______ language?',
    answers: [
      { text: 'object oriended', correct: true },
      { text: 'object based', correct: false },
      { text: 'procedural', correct: false},
      { text: 'none', correct: false},
      
    ]
  },
  {
    question: 'Which of the following keywords is used to define a variable in Javascript?',
    answers: [
      { text: 'var', correct: false },
      { text: 'let', correct: false },
      { text: 'const', correct: false },
      { text: 'all the above', correct: true }
    ]
  },
  {
    question: 'How can a datatype be declared to be a constant type?',
    answers: [
      { text: 'var', correct: false },
      { text: 'const', correct: true },
      { text: 'let', correct: false },
      { text: 'constant', correct: false }
    ]
  },
  {
    question: ' What keyword is used to check whether a given property is valid or not?',
    answers: [
      { text: 'of', correct: false },
      { text: 'in', correct: true },
      { text: 'valid', correct: false },
      { text: 'exist', correct: false },
    ]
  },
  {
    question: 'When an operator’s value is NULL, the typeof returned by the unary operator is:',
    answers: [
      { text: 'NaN', correct: false },
      { text: 'undefined', correct: false },
      { text: 'booleon', correct: false },
      { text: 'object', correct: true },
    ]
  }
]
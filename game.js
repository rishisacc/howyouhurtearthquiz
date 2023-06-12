const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "How much garbage is made annualy in America?",
        choice1: '268 Million',
        choice2: '1.2 Billion',
        choice3: '500 Million',
        choice4: '3 Billion',
        answer: 1,

    },
    {
        question: "How many gallons of water is wasted in shower?",
        choice1: '14 Gallons',
        choice2: '20 Gallons',
        choice3: '10 Gallons',
        choice4: '17 Gallons',
        answer: 4,
        
    },
    {
        question: "Approx, how much plastic is wasted each year?",
        choice1: '15 Million Tons',
        choice2: '14 Millon Tons',
        choice3: '10 Million Tons',
        choice4: '20 Million Tons',
        answer: 3,
        
    },
    {
        question: "How much food is wasted weekly?",
        choice1: '4.8 Pounds',
        choice2: '3.5 Pounds',
        choice3: '3 Pounds',
        choice4: '4.5 Pounds',
        answer: 2,
        
    },
    {
        question: "How much waste ends up in landfills?",
        choice1: '140 Million',
        choice3: '160 Trillion',
        choice2: '130 Million',
        choice4: '145 Million',
        answer: 1,
        
    },
    {
        question: "How many marine animals die from plastic every year?",
        choice1: '100 Million',
        choice2: '200 Million',
        choice3: '130 Million',
        choice4: '90 Million',
        answer: 1,
        
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 7

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ' + questionCounter + ' of ' + MAX_QUESTIONS 
    progressBarFull.style.width = (questionCounter/MAX_QUESTIONS) * 100 + "%"

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

}

startGame()
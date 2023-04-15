const cardArray = [
    {
        name: 'Angry',
        img: 'images/Angry.png'
    },
    {
        name: 'Crying',
        img: 'images/Crying.png'
    },
    {
        name: 'Dizzy',
        img: 'images/Dizzy.png'
    },
    {
        name: 'Happy',
        img: 'images/Happy.png'
    },
    {
        name: 'Hungry',
        img: 'images/Hungry.png'
    },
    {
        name: 'Loudly Crying',
        img: 'images/Loudly Crying.png'
    },
    {
        name: 'Omg',
        img: 'images/Omg.png'
    },
    {
        name: 'Sleeping',
        img: 'images/Sleeping.png'
    },
    {
        name: 'Tears',
        img: 'images/Tears.png'
    },
    {
        name: 'Very Mad',
        img: 'images/Very Mad.png'
    },
    {
        name: 'Angry',
        img: 'images/Angry.png'
    },
    {
        name: 'Crying',
        img: 'images/Crying.png'
    },
    {
        name: 'Dizzy',
        img: 'images/Dizzy.png'
    },
    {
        name: 'Happy',
        img: 'images/Happy.png'
    },
    {
        name: 'Hungry',
        img: 'images/Hungry.png'
    },
    {
        name: 'Loudly Crying',
        img: 'images/Loudly Crying.png'
    },
    {
        name: 'Omg',
        img: 'images/Omg.png'
    },
    {
        name: 'Sleeping',
        img: 'images/Sleeping.png'
    },
    {
        name: 'Tears',
        img: 'images/Tears.png'
    },
    {
        name: 'Very Mad',
        img: 'images/Very Mad.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
var score = 0
let cardsChosenName = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('height', '80px')
        card.setAttribute('width', '80px')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipboard)
        gridDisplay.appendChild(card)
    }
}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    if (optionOneId == optionTwoId) {
        alert('You have clicked the same image!')
    }
    if (cardsChosenName[0] == cardsChosenName[1]) {
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipboard)
        cards[optionTwoId].removeEventListener('click', flipboard)
        cardsWon.push(cardsChosenName[0])
        score += 2
    }
    if (cardsChosenName[0] != cardsChosenName[1]) {
        alert('Try again!')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        score -= 1
    }
    cardsChosenName = []
    cardsChosenIds = []
    document.getElementById('result').innerHTML = score
    if (cardsWon.length == cardArray.length/2)
        alert(`Congratulations! You finished the game. Your score is ${score}!`)
}

function flipboard() {
    const cardId = this.getAttribute('data-id')
    cardsChosenName.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosenName.length === 2) {
        setTimeout(checkMatch, 500)
    }
}
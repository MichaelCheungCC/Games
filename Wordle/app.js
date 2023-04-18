const gridSize = [6, 5];
const wordOfTheDay = 'HELLO';
let boxRow = 0;
let boxColumn = 0;

const gridDisplay = document.querySelector('#grid')
const keyboardKey = document.querySelectorAll('.keyboardKey')
const keyboardKeyEnter = document.querySelector('.keyboardKeyEnter')
const keyboardKeyBackspace = document.querySelector('.keyboardKeyBackspace')


// Board Control //
function createBoard() {
    for (let i = 0; i < gridSize[0]; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'center';
        for (let j = 0; j < gridSize[1]; j++) {
            const box = document.createElement('div');
            box.classList.add('grid-item');
            box.setAttribute('box-row', i);
            box.setAttribute('box-column', j);
            row.appendChild(box);
        }
        gridDisplay.appendChild(row);
    }
}
createBoard()

// Keyboard Control //

// Character Handling //
keyboardKey.forEach(function (button) {
    addClick(button);
});
function addCharacterHandler() {
    addCharacter(this);
}
function addClick(button) {
    button.addEventListener('click', addCharacterHandler);
}

function addCharacter(button) {
    if (boxColumn < 5) {
        const getKey = button.getAttribute('data-key');
        const currentBox = document.querySelector(`[box-row=\"${boxRow}\"][box-column=\"${boxColumn}\"]`);
        const para = document.createElement('div');

        para.innerText = getKey;
        para.classList.add('boxCharacter');
        currentBox.appendChild(para);

        boxColumn += 1;
    }
}

// Enter Handling //
function addEnterHandler() {
    checkResult();
}
keyboardKeyEnter.addEventListener('click', addEnterHandler)

function checkResult() {
    // checkResult //
    if (boxColumn < 5) {
        alert('Not enough letter');
    }
    else if (boxRow < 6) {
        const currentAttempt = document.querySelectorAll(`[box-row=\"${boxRow}\"]`);
        let userInput = "";
        let ignore = [];
        for (let i = 0; i < 5; i++) {
            userInput += currentAttempt[i].querySelector('.boxCharacter').innerHTML;
        }
        if (wordOfTheDay == userInput) {
            alert('Congratulations! You got it!');
            // removeEventListener //
            keyboardKey.forEach(function (button) {
                button.removeEventListener('click', addCharacterHandler);
            });
            keyboardKeyEnter.removeEventListener('click', addEnterHandler);
            keyboardKeyBackspace.removeEventListener('click', addBackspaceHandler);
        }

        for (let i = 0; i < 5; i++) {
            if (wordOfTheDay[i] == userInput[i]) {
                currentAttempt[i].classList.add('correctBox');
                numberOfCorrect += 1;
                ignore.push(i)
                wordOfTheDayRemaining = wordOfTheDay.slice(0, i) + wordOfTheDay.slice(i+1);
                userInputRemaining = userInput.slice(0, i) + userInput.slice(i+1);
            }
        for (let i = 0; i < 5; i++) {
            if (!ignore.includes(i) && userInput.indexOf(wordOfTheDay[i]) !== -1) {
                currentAttempt[i].classList.add('semicorrectBox');
            }
        }
            // TODO: semicorrectBox incorrectBox //


        }
        if (boxRow == 5) {
            alert('Game Over');
        }
        boxRow += 1;
        boxColumn = 0;
    }
}

// Backspace Handling //
function addBackspaceHandler() {
    backspace();
}
keyboardKeyBackspace.addEventListener('click', addBackspaceHandler);

function backspace() {
    // remove a character //
    if (boxColumn > 0) {
        boxColumn -= 1;
        const currentBox = document.querySelector(`[box-row=\"${boxRow}\"][box-column=\"${boxColumn}\"]`);
        const para = currentBox.lastChild;
        currentBox.removeChild(para);
    }
}
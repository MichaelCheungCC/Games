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

function addClick(button) {
    var clickHandler = function() {
        addCharacter(button);
    };
    button.addEventListener('click', clickHandler);
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
keyboardKeyEnter.addEventListener('click', function () {
    checkResult();
})

function checkResult() {
    // checkResult //
    if (boxColumn < 5) {
        alert('Not enough letter');
    }
    else if (boxRow < 6) {
        const currentAttempt = document.querySelectorAll(`[box-row=\"${boxRow}\"]`);
        let userInput = "";

        for (let i = 0; i < 5; i++) {
            userInput += currentAttempt[i].querySelector('.boxCharacter').innerHTML;
        }
        if (wordOfTheDay == userInput) {
            alert('Congratulations! You got the word!')
            // removeEventListener //
            keyboardKey.forEach(function (button) {
                removeClick(button);
            });

            function removeClick(button) {
                button.removeEventListener('click', clickHandler);
            }
            // TODO: removeEventListener for Enter key and Backspace Key //
        }

        for (let i = 0; i < 5; i++) {
            if (wordOfTheDay[i] == currentAttempt[i].querySelector('.boxCharacter').innerHTML) {
                console.log(wordOfTheDay[i]);
                currentAttempt[i].classList.add('correctBox');
            }
            else {
                currentAttempt[i].classList.add('incorrectBox')
            }
            // TODO: semicorrectBox //

        }
        if (boxRow == 5) {
            alert('Game Over');
        }
        boxRow += 1;
        boxColumn = 0;
    }
}

// Backspace Handling //
keyboardKeyBackspace.addEventListener('click', function () {
    backspace();
})

function backspace() {
    // remove a character //
    if (boxColumn > 0) {
        boxColumn -= 1;
        const currentBox = document.querySelector(`[box-row=\"${boxRow}\"][box-column=\"${boxColumn}\"]`);
        const para = currentBox.lastChild;
        console.log(para);
        currentBox.removeChild(para);
    }
}
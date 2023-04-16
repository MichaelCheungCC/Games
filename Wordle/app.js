const gridSize = [6, 5];
const wordOfTheDay = 'Hello';
let boxRow = 0;
let boxColumn = 0;

const gridDisplay = document.querySelector('#grid')
const keyboardKey = document.querySelectorAll('.keyboardKey')
const keyboardKeySpecial = document.querySelectorAll('.keyboardKeySpecial')

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
    button.addEventListener('click', function () {
        addCharacter(button);
    });
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
function checkResult() {
    // checkResult //
    if (true) {
        console.log('test')
    }
    boxRow += 1;
    boxColumn = 0;
}

// Backspace Handling //
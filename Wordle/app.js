const gridSize = [6, 5];
let boxRow = 0;
let boxColumn = 0;

const gridDisplay = document.querySelector('#grid')
const keyboardKey = document.querySelectorAll('.keyboardKey')
const keyboardKeyEnter = document.querySelector('.keyboardKeyEnter')
const keyboardKeyBackspace = document.querySelector('.keyboardKeyBackspace')

// API to retrieve all 5-letter English words
const baseUrl = 'https://api.datamuse.com/words?sp=&freq>=3000';
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

async function getAllWords() {
    const words = [];

    for (const letter of letters) {
        const url = `${baseUrl}${letter}[a-z]{4}&max=1000`;
        const response = await fetch(url);
        const data = await response.json();
        const letterWords = data.map(word => word.word);
        words.push(...letterWords);
    }
    return words; // async return Promise
}

getAllWords()
    .then(words => {
        const random = Math.floor(Math.random() * words.length);
        const wordOfTheDay = words[random].toUpperCase();

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
            if (boxColumn < gridSize[1]) {
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
            if (boxColumn < gridSize[1]) {
                alert('Not enough letter');
            }
            else if (boxRow < gridSize[0]) {
                const currentAttempt = document.querySelectorAll(`[box-row=\"${boxRow}\"]`);
                let userInput = "";
                let ignore = [];
                for (let i = 0; i < gridSize[1]; i++) {
                    userInput += currentAttempt[i].querySelector('.boxCharacter').innerHTML;
                }
                // TODO: check userInput is a valid word //
                if (wordOfTheDay == userInput) {
                    alert('Congratulations! You got it!');
                    // removeEventListener //
                    keyboardKey.forEach(function (button) {
                        button.removeEventListener('click', addCharacterHandler);
                    });
                    keyboardKeyEnter.removeEventListener('click', addEnterHandler);
                    keyboardKeyBackspace.removeEventListener('click', addBackspaceHandler);
                }

                for (let i = 0; i < gridSize[1]; i++) {
                    if (wordOfTheDay[i] == userInput[i]) {
                        currentAttempt[i].classList.add('correctBox');
                        ignore.push(i);
                    }
                }
                for (let i = 0; i < gridSize[1]; i++) {
                    if (!ignore.includes(i) && userInput.indexOf(wordOfTheDay[i]) !== -1) {
                        const foundIndex = userInput.indexOf(wordOfTheDay[i]);
                        currentAttempt[foundIndex].classList.add('semicorrectBox');
                        ignore.push(foundIndex);
                    }
                }
                for (let i = 0; i < gridSize[1]; i++) {
                    if (!ignore.includes(i)) {
                        currentAttempt[i].classList.add('incorrectBox');
                    }
                }
                boxRow += 1;
                boxColumn = 0;
            }
            if (boxRow == gridSize[0]) {
                alert(`Game Over! The correct answer is ${wordOfTheDay}`);
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
    })
    .catch(error => console.error(error));
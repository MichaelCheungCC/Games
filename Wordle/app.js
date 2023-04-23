const gridSize = [6, 5];
let boxRow = 0;
let boxColumn = 0;

const gridDisplay = document.querySelector('#grid');
const keyboard = document.querySelector('.keyboard');
const keyboardKey = document.querySelectorAll('.keyboardKey');
const keyboardKeyEnter = document.querySelector('.keyboardKeyEnter');
const keyboardKeyBackspace = document.querySelector('.keyboardKeyBackspace');
const loader = document.querySelector('#loader');

// API to retrieve all 5-letter English words
const baseUrl = 'https://api.datamuse.com/words?sp=';
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

async function getAllWords() {
    const words = [];

    for (const letter of letters) {
        const url = `${baseUrl}${letter}[a-z]{4}&max=100`;
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
        console.log(wordOfTheDay);

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
        loader.style.display = 'none';
        keyboard.style.display = 'block';

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
            addEnter();
        }
        keyboardKeyEnter.addEventListener('click', addEnterHandler)

        function addEnter() {
            // checkResult //
            if (boxColumn < gridSize[1]) {
                alert('Not enough letter');
            }
            else if (boxRow < gridSize[0]) {
                const currentAttempt = document.querySelectorAll(`[box-row=\"${boxRow}\"]`);
                let userInput = "";
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

                function checkResult(answer, input) {
                    const correctnessArray = { correct: [], semicorrect: [], incorrect: [] };

                    // Check for correct characters and positions
                    for (let i = 0; i < gridSize[1]; i++) {
                        if (answer[i] == input[i]) {
                            correctnessArray.correct.push(i);
                        }
                    }

                    // Check for correct characters but incorrect positions
                    for (let i = 0; i < gridSize[1]; i++) {
                        if (correctnessArray.correct.includes(i)) {
                            continue; // Skip already matched characters
                        }
                        const foundIndices = [];
                        // Find all occurrences of the current character in the input
                        for (let j = 0; j < gridSize[1]; j++) {
                            if (answer[i] === input[j]) {
                                foundIndices.push(j);
                            }
                        }
                        // Check if any of the found indices are not already matched
                        const semicorrectIndex = foundIndices.find(
                            (index) => !correctnessArray.correct.includes(index) && !correctnessArray.semicorrect.includes(index) // second condition solve bcbcc vs ebebb
                        );
                        if (semicorrectIndex !== undefined) {
                            correctnessArray.semicorrect.push(semicorrectIndex);
                        }
                    }

                    // Check for incorrect characters
                    for (let i = 0; i < gridSize[1]; i++) {
                        if (!correctnessArray.correct.includes(i) && !correctnessArray.semicorrect.includes(i)) {
                            correctnessArray.incorrect.push(i);
                        }
                    }

                    return correctnessArray;
                }
                const correctnessArray = checkResult(wordOfTheDay, userInput);
                console.log(JSON.stringify(correctnessArray));
                for (let i in correctnessArray.correct) {
                    const j = correctnessArray.correct[i];
                    currentAttempt[j].classList.add('correctBox');
                    const greenKey = document.querySelector(`[data-key=\"${userInput[j]}\"]`);
                    greenKey.classList.add('correctBox');
                }
                for (let i in correctnessArray.semicorrect) {
                    const j = correctnessArray.semicorrect[i];
                    currentAttempt[j].classList.add('semicorrectBox');
                    const yellowKey = document.querySelector(`[data-key=\"${userInput[j]}\"]`);
                    if (!yellowKey.classList.contains("correctBox")) {
                        yellowKey.classList.add('semicorrectBox');
                    }
                }
                for (let i in correctnessArray.incorrect) {
                    const j = correctnessArray.incorrect[i];
                    currentAttempt[j].classList.add('incorrectBox');
                    const redKey = document.querySelector(`[data-key=\"${userInput[j]}\"]`);
                    if ((!redKey.classList.contains("correctBox")) && (!redKey.classList.contains("incorrectBox"))) {
                        redKey.classList.add('incorrectBox');
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
            addBackspace();
        }
        keyboardKeyBackspace.addEventListener('click', addBackspaceHandler);

        function addBackspace() {
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
const gridSize = [6, 5];

function checkResult(answer, input) {
    const correctnessArray = { 'correct': [], 'semicorrect': [], 'incorrect': [] };

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
    
    // Sort the arrays in ascending order
    correctnessArray.correct.sort();
    correctnessArray.semicorrect.sort();
    correctnessArray.incorrect.sort();
    return correctnessArray;
}

console.log(JSON.stringify(checkResult('bcbcc', 'mbmbb')));

module.exports = checkResult;
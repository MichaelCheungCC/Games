const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const result = document.getElementById("result");
const pathLength = playerChoice.src.toString().split('/').length


function getPlayerMove(playerMove) {
    playerChoice.src = "./images/" + playerMove + ".png";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerMove() {
    let random = getRandomInt(3);
    switch (random) {
        case 0:
            computerChoice.src = "./images/rock.png";
            console.log(random);
            break;
        case 1:
            computerChoice.src = "./images/paper.png";
            console.log(random);
            break;
        case 2:
            computerChoice.src = "./images/scissors.png";
            console.log(random);
            break;
    }
}

function getResult() {
    if (
        playerChoice.src ===
        computerChoice.src
    ) {
        result.innerHTML = "Draw";
    } else if (
        (playerChoice.src.toString().endsWith("rock.png") &&
            computerChoice.src.toString().endsWith("scissors.png")) ||
        (playerChoice.src.toString().endsWith("paper.png") &&
            computerChoice.src.toString().endsWith("rock.png")) ||
        (playerChoice.src.toString().endsWith("scissors.png") &&
            computerChoice.src.toString().endsWith("raper.png"))
    ) {
        result.innerHTML = "Player Wins";
    }
    else {
        result.innerHTML = "Computer Wins";
    }
}

document.getElementById("rock").onclick = function () {
    getPlayerMove("rock");
    getComputerMove();
    getResult();
};
document.getElementById("paper").onclick = function () {
    getPlayerMove("paper");
    getComputerMove();
    getResult();
};
document.getElementById("scissors").onclick = function () {
    getPlayerMove("scissors");
    getComputerMove();
    getResult();
};
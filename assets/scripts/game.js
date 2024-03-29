
//TODO Possibly make dynamic?? Remove Start Button on click, add Game Over text
//TODO * and restart button on game end??
//TODO for start game remove start button and call main, for game over add restart button
//TODO * that calls main

//TODO implement game modes easy, medium, hard, and dynamic

let GAME_SPEED = 100;

const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'white';

const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';

const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

//* the users score
let score = 0;

//* checking if direction is currently changing
let changingDirection;

//* food's coordinates
let foodX;
let foodY;

//* Horizontal velocity
let dx = 10;
//* Vertical velocity
let dy = 0;

//* Get canvas element
const gameCanvas = document.getElementById("gameCanvas");

//* Return a 2-dimensional drawing context
const ctx = gameCanvas.getContext("2d");


/*
* Main function of the game
* called repeatedly to advance game
*/
function main() {

    if (didGameEnd()) {
        const scoreContainer = document.querySelector("#score-container");
        scoreContainer.innerHTML += "<div id='game-over'>GAME OVER</div>"

        if (score > JSON.parse(localStorage.getItem("forests-snake-scores"))[4]) {
            getName();
        }

        const buttonContainer = document.querySelector("#button-container")
        buttonContainer.innerHTML = '<button id="homeButton"><a href="../index.html">Home</a></button><button id="restart"><a href="./snake.html">Restart</a></button>'
        const restartButton = document.querySelector("#restart a");
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 13) {
                restartButton.click();
            }
        })
        return;
    }

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        main();
    }, GAME_SPEED)
}


//* FUNCTIONALITY *//

//* check if game ended
function didGameEnd() {
    //* start at 4 because impossible for first three parts to
    //* collide with head
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (didCollide) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

//* GAME CANVAS *//

/*
* Change the bg color of the canvas and draw
* a border around it
*/
function clearCanvas() {
    //* select color to fill the drawing
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    //* select the colorFor the border of canvas
    ctx.strokeStyle = CANVAS_BORDER_COLOR;
    //* Draw a "filled" rectangle toC cover the entire canvas
    ctx.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.height);
    //* Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.clientWidth, gameCanvas.height);
}

//* FOOD *//

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;

        if (foodIsOnSnake) {
            createFood();
        }
    })
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.strokeStyle = FOOD_BORDER_COLOR;

    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

//* SNAKE *//

let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 },];

//* draws a part
function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//* Draws snake on canvas
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function advanceSnake() {
    //* create new snake head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    //* Add new snake head to beginning of body
    snake.unshift(head);
    //* check if snake ate food
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        //* update score when food is eaten
        score += 10;
        //? For dynamic game mode
        // if (score === 30) {
        //     GAME_SPEED = 50;
        // }
        //* change score value in html doc
        document.getElementById('score').innerHTML = score;
        //* create new food instance
        createFood();
    } else {
        //* remove last part of body
        snake.pop();
    }
}

//* LOCAL STORAGE *//

function getName() {
    const name = document.cookie.match("current-player-name").input.split("=")[1];

    const buttonContainer = document.querySelector("#button-container");

    handleScores(name);
    buttonContainer.innerHTML = '<button id="homeButton"><a href="../index.html">Home</a></button><button id="restart"><a href="./snake.html">Restart</a></button>'

}

function handleScores(name) {
    const scores = JSON.parse(localStorage.getItem("forests-snake-scores"));
    const names = JSON.parse(localStorage.getItem("forests-snake-names"));

    for (let i = 0; i < scores.length; i++) {
        if (score > scores[i]) {
            scores.splice(i, 0, score);
            names.splice(i, 0, name);
            scores.pop();
            names.pop()
            localStorage.setItem("forests-snake-scores", JSON.stringify(scores));
            localStorage.setItem("forests-snake-names", JSON.stringify(names));
            setScores();
            setNames();
            return;
        }
    }
}

function setScores() {
    const scores = JSON.parse(localStorage.getItem("forests-snake-scores"));
    const leaderboard = document.querySelector("#leaderboard-body");
    for (let i = 0; i < scores.length; i++) {
        leaderboard.children[i].children[2].innerText = scores[i]
    }
}

function setNames() {
    const names = JSON.parse(localStorage.getItem("forests-snake-names"));
    const leaderboard = document.querySelector("#leaderboard-body");
    for (let i = 0; i < names.length; i++) {
        leaderboard.children[i].children[1].innerText = names[i];
    }
}

//* START GAME *//

if (localStorage.getItem("forests-snake-scores")) {
    setScores();
} else {
    localStorage.setItem("forests-snake-scores", JSON.stringify([0, 0, 0, 0, 0]))
    setScores();
}

if (localStorage.getItem("forests-snake-names")) {
    setNames()
} else {
    localStorage.setItem("forests-snake-names", JSON.stringify(["PLAY MORE", "PLAY MORE", "PLAY MORE", "PLAY MORE", "PLAY MORE"]));
    setNames();
}
main();

//* Create first food instance
createFood();

//* call changeDirection whenever a key is pressed
document.addEventListener("keydown", changeDirection);

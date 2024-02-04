const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'white';
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

let foodX = 40;
let foodY = 80;

//* Get canvas element
const gameCanvas = document.getElementById("gameCanvas");
//* Return a 2-dimensional drawing context
const ctx = gameCanvas.getContext("2d");

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

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.strokeStyle = FOOD_BORDER_COLOR;

    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

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

clearCanvas();
drawSnake();
drawFood();

const nameInput = document.querySelector("#name-input");
const startButton = document.querySelector("#start-button");

if (document.cookie.match("current-player-name")) {
    nameInput.value = document.cookie.match("current-player-name").input.split("=")[1];
}

startButton.addEventListener("click", getName);
startButton.addEventListener("keydown", (e) => {
    if (e.keyCode === "13") {
        getName()
    }
})

function getName() {
    if (nameInput.value) {
        document.cookie = `current-player-name=${nameInput.value}`;
        location.replace("../../views/snake.html")
    }
}

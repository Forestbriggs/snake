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


clearCanvas();
drawSnake();
drawFood();

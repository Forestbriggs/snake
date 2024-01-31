const GAME_SPEED = 100;
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

    if (didGameEnd()) return;

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        main();
    }, GAME_SPEED)
}


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
        //* change score value in html doc
        document.getElementById('score').innerHTML = score;
        //* create new food instance
        createFood();
    } else {
        //* remove last part of body
        snake.pop();
    }
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


//* start game
main();

//* Create first food instance
createFood();

//* call changeDirection whenever a key is pressed
document.addEventListener("keydown", changeDirection);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paddle setup
const paddleWidth = 10;
const paddleHeight = 160;
let paddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 6;

//Keys
let upPressed = false;
let downPressed = false;

// Ball setup
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 9;

// Draw paddle
function drawPaddle() {
    // paddle should calc pos here

    ctx.fillStyle = '#eee';  // style set
    ctx.fillRect(10, paddleY, paddleWidth, paddleHeight); // draw shape
}

// Draw ball
function drawBall() {

    //style
    ctx.fillStyle = '#eee';
    // drawing
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if (upPressed && paddleY > 0) {
        paddleY -= paddleSpeed;
    }
    if (downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += paddleSpeed;
    }



    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY *= -1;
    }

    // Check collision with paddle before reset
    if (
        ballX - ballRadius <= 10 + paddleWidth &&
        ballY >= paddleY &&
        ballY <= paddleY + paddleHeight
    ) {
        ballSpeedX *= -1;
        ballX = 10 + paddleWidth + ballRadius; // prevent sticking
    } else if (ballX - ballRadius <= 0) {
        // player missed
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = Math.abs(ballSpeedX); // reset to move right
    }

    // Right wall reset remains unchanged
    if (ballX + ballRadius >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -Math.abs(ballSpeedX); // reset to move left
    }

    drawPaddle();
    drawBall();

    requestAnimationFrame(draw);
}





requestAnimationFrame(draw);


// Events

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') upPressed = true;
    if (e.key === 'ArrowDown') downPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') upPressed = false;
    if (e.key === 'ArrowDown') downPressed = false;
});


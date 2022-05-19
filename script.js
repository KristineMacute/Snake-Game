    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    class SnakePart {
        constructor(x, y) {
        this.x = x;
        this.y = y;
        }
    }

    let speed = 5; 
    let squareTile = 20; 
    let tileSize = canvas.width / squareTile - 2; 
    let headX = 10;
    let headY = 10;
    const snakeParts = [];
    let tailLength = 2; 
    let appleX = 5;
    let appleY = 5;
    let inputsXpos = 0;
    let inputsYpos = 0;
    let xpos = 0;
    let ypos = 0;
    let score = 0;
    let playAgain = document.querySelector(".playAgain");
    const gulpSound = new Audio("1food.mp3");
    const gameoverSound = new Audio("3gameover.mp3");
    const moveSound = new Audio("2move.mp3");

    function drawGame() {
        xpos = inputsXpos;
        ypos = inputsYpos;

        changePosition();
        let result = isGameOver();
        if (result) {
            gameoverSound.play() ;
            return;
        }

        screen();
        checkAppleCollision();
        drawFood();
        drawSnake();
        drawScore();

        if (score > 5) {
            speed = 7;
        } 
        if(score > 10) {
            speed = 10;
        } 
        if(score > 20) {
            speed = 12;
        } 
        if(score > 50) {
            speed = 20;
        } 
    
        setTimeout(drawGame, 1000 / speed); 
    }

    function isGameOver() {
        let gameOver = false;
        if (ypos === 0 && xpos === 0) {
            return false;
        }
        if (headX < 0) {
            gameOver = true;
        } else if (headX === squareTile) {
            gameOver = true;
        } else if (headY < 0) {
                gameOver = true;
        } else if (headY === squareTile) {
                gameOver = true;
            }

        for (let i = 0; i < snakeParts.length; i++) {
            let part = snakeParts[i];
            if (part.x === headX && part.y === headY) {
                gameOver = true;
                break;
            }
            
        }

        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        }
        return gameOver;
    }

    function drawScore() {
            ctx.fillStyle = "white";
            ctx.font = "10px Libre Baskerville";
            ctx.fillText("Score : " + score, canvas.width - 50, 10);
    }

    function screen() {
        ctx.fillStyle = "yellowgreen";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        ctx.fillStyle = "green";
        for (let i = 0; i < snakeParts.length; i++) {
                let part = snakeParts[i];
                ctx.fillRect(part.x * squareTile, part.y * squareTile, tileSize, tileSize);
        }
        snakeParts.push(new SnakePart(headX, headY));
        while (snakeParts.length > tailLength) {
                snakeParts.shift(); 
        }
        ctx.fillStyle = "yellow";
        ctx.fillRect(headX * squareTile, headY * squareTile, tileSize, tileSize);
    }

    function changePosition() {
        headX = headX + xpos;
        headY = headY + ypos;
    }

    function drawFood() {
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * squareTile, appleY * squareTile, tileSize, tileSize);
    }

    function checkAppleCollision() {
        if (appleX === headX && appleY == headY) {
            appleX = Math.floor(Math.random() * squareTile);
            appleY = Math.floor(Math.random() * squareTile);
            tailLength++;
            score++;
            gulpSound.play();
        }
    }

        document.body.addEventListener("keydown", keyDown);

    function keyDown(event) {
        moveSound.play();
        if (event.keyCode == 38) {
            inputsYpos = -1;
            inputsXpos = 0;
        } else if(event.keyCode == 40) {
            inputsYpos = 1;
            inputsXpos = 0;
        } 
        if (event.keyCode == 37) {
            inputsYpos = 0; 
            inputsXpos = -1;
        } else if (event.keyCode == 39) {
            inputsYpos = 0;
            inputsXpos = 1;
        }
    }

    function restart(){
        score = 0;
        speed = 5; 
        xpos = tileSize;
        ypos = 0;
        headX = 10;
        headY = 10;
        tailLength = 2; 
        appleX = 5;
        appleY = 5;
        drawGame();
    }
    
    drawGame();
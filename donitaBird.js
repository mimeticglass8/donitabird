document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("donitaBirdCanvas");
    const ctx = canvas.getContext("2d");

    const bird = {
        x: -50, // Start off-screen to the left
        y: canvas.height / 2 - 15,
        width: 40,
        height: 30,
        color: "#FFD700", // Golden color
        velocity: 0,
        gravity: 1.5,
        jump: -15
    };

    const pipes = [];
    let score = 0;
    let timeAlive = 0; // Variable to keep track of the time the bird spends alive

    function drawBird() {
        ctx.fillStyle = bird.color;
        ctx.beginPath();
        ctx.arc(bird.x + bird.width / 2, bird.y + bird.height / 2, bird.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    function drawPipes() {
        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];
            const gapHeight = 150;

            // Draw top pipe
            ctx.fillStyle = "#228B22"; // Forest Green
            ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapTop);

            // Draw bottom pipe
            ctx.fillRect(pipe.x, pipe.gapBottom, pipe.width, canvas.height - pipe.gapBottom);
        }
    }

    function moveBird() {
        if (bird.x < canvas.width / 2 - 15) {
            // Move bird to the center
            bird.x += 2;
        }

        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
    }

    function generatePipes() {
        if (Math.random() < 0.01) {
            const gapHeight = 150;
            const gapPosition = Math.floor(Math.random() * (canvas.height - gapHeight));
            const pipeWidth = 30;

            pipes.push({
                x: canvas.width,
                gapTop: gapPosition,
                gapBottom: gapPosition + gapHeight,
                width: pipeWidth
            });
        }
    }

    function movePipes() {
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= 2;
        }

        pipes.forEach((pipe, index) => {
            if (pipe.x + pipe.width < 0) {
                pipes.splice(index, 1);
                score++; // Increase score for every pipe passed
            }
        });
    }

    function drawScore() {
        ctx.fillStyle = "#FFD700"; // Golden color
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + score, 20, 50);
    }

    function drawBackground() {
        ctx.fillStyle = "#87CEEB"; // Sky Blue
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function checkCollision() {
        if (bird.y < 0 || bird.y + bird.height > canvas.height) {
            endGame();
        }

        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];

            if (
                bird.x < pipe.x + pipe.width &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.gapTop || bird.y + bird.height > pipe.gapBottom)
            ) {
                endGame();
            }
        }
    }

    function endGame() {
        alert("Game Over! Your Score: " + score);
        bird.x = -50; // Move bird off-screen to the left
        bird.y = canvas.height / 2 - 15;
        bird.velocity = 0;
        pipes.length = 0;
        score = 0;
        timeAlive = 0; // Reset time alive
    }

    function draw() {
        drawBackground();
        drawBird();
        drawPipes();
        moveBird();
        generatePipes();
        movePipes();
        checkCollision();
        drawScore();
        timeAlive++; // Increase time alive

        // Update score every second
        if (timeAlive % 60 === 0) {
            score += 2;
        }

        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 32) { // Space key
            bird.velocity = bird.jump;
        }
    });

    draw();
});

let player = document.getElementById("player");
let blocks = document.querySelectorAll(".block");
let scoreDisplay = document.getElementById("score");

let score = 0;
let gameRunning = true;

// 🎯 Score system
function updateScore() {
  if (!gameRunning) return;

  score++;
  scoreDisplay.innerText = "Score: " + score;
}

// update score every 100ms
let scoreInterval = setInterval(updateScore, 100);


// 🟢 Simple gravity + jump
let isJumping = false;

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let position = 50;

  let up = setInterval(() => {
    if (position >= 150) {
      clearInterval(up);

      let down = setInterval(() => {
        if (position <= 50) {
          clearInterval(down);
          isJumping = false;
        }
        position -= 5;
        player.style.bottom = position + "px";
      }, 20);

    }
    position += 5;
    player.style.bottom = position + "px";
  }, 20);
}


// 🚧 Move blocks (obstacles)
blocks.forEach(block => {
  let blockLeft = parseInt(block.style.left);

  let move = setInterval(() => {
    if (!gameRunning) return;

    blockLeft -= 5;
    if (blockLeft < -50) {
      blockLeft = 800; // reset to right side
    }

    block.style.left = blockLeft + "px";

    // 💥 Collision detection
    let playerRect = player.getBoundingClientRect();
    let blockRect = block.getBoundingClientRect();

    if (
      playerRect.right > blockRect.left &&
      playerRect.left < blockRect.right &&
      playerRect.bottom > blockRect.top &&
      playerRect.top < blockRect.bottom
    ) {
      gameOver();
    }

  }, 30);
});


// ❌ Game Over
function gameOver() {
  gameRunning = false;
  clearInterval(scoreInterval);
  alert("Game Over! Your Score: " + score);
}

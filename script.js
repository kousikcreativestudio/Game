let player = document.getElementById("player");
let blocks = document.querySelectorAll(".block");
let scoreDisplay = document.getElementById("score");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameRunning = true;

// 🎯 Score + High Score
function updateScore() {
  if (!gameRunning) return;

  score++;
  scoreDisplay.innerText = "Score: " + score + " | High: " + highScore;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}

setInterval(updateScore, 100);


// 🟢 Jump
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


// 🚧 Move blocks + collision
blocks.forEach(block => {
  let blockLeft = parseInt(block.style.left);

  setInterval(() => {
    if (!gameRunning) return;

    blockLeft -= 5;
    if (blockLeft < -50) {
      blockLeft = 800;
    }

    block.style.left = blockLeft + "px";

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
  alert("Game Over! Score: " + score);
}

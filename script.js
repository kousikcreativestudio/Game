window.onload = function() {

let player = document.getElementById("player");
let blocks = document.querySelectorAll(".block");
let scoreDisplay = document.getElementById("score");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameRunning = true;

// 🎯 Score
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
let jumpCount = 0;

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && jumpCount < 2) {
    jump();
    jumpCount++;
  }
});

function jump() {
  let position = parseInt(player.style.bottom) || 50;

  let up = setInterval(() => {
    if (position >= 200) { // higher jump
      clearInterval(up);

      let down = setInterval(() => {
        if (position <= 50) {
          clearInterval(down);
          jumpCount = 0; // reset jump
        }
        position -= 5;
        player.style.bottom = position + "px";
      }, 20);
    }
    position += 5;
    player.style.bottom = position + "px";
  }, 20);
}


// 🚧 Blocks
let passed = false;

blocks.forEach(block => {
  let blockLeft = parseInt(block.style.left);

  setInterval(() => {
    if (!gameRunning) return;

    blockLeft -= 5;

    if (blockLeft < -50) {
      blockLeft = 800;
      passed = false;
    }

    block.style.left = blockLeft + "px";

    // 🎯 Score when player passes block
    if (!passed && blockLeft < 50) {
      score++;
      passed = true;
    }

    scoreDisplay.innerText = "Score: " + score + " | Coins: " + coins;
  }, 30);
});


// ❌ Game Over
function gameOver() {
  gameRunning = false;
  alert("Game Over! Score: " + score);
}

}

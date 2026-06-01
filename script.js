window.onload = function () {

  // 🎯 VARIABLES
  let player = document.getElementById("player");
  let blocks = document.querySelectorAll(".block");
  let scoreDisplay = document.getElementById("score");

  let coins = parseInt(localStorage.getItem("coins")) || 0;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("highScore")) || 0;

  let gameRunning = true;

  // 🟢 PLAYER SETTINGS
  let position = 50;
  let jumpCount = 0;

  // 🎯 UPDATE UI
  function updateScore() {
    scoreDisplay.innerText =
      "Score: " + score + " | Coins: " + coins + " | High: " + highScore;
  }

  updateScore();

  // 🟢 JUMP FUNCTION (DOUBLE JUMP)
  function jump() {
    if (jumpCount >= 2) return;

    jumpCount++;

    let up = setInterval(() => {
      if (position >= 150) {
        clearInterval(up);

        let down = setInterval(() => {
          if (position <= 50) {
            clearInterval(down);
            jumpCount = 0;
          } else {
            position -= 5;
            player.style.bottom = position + "px";
          }
        }, 20);

      } else {
        position += 5;
        player.style.bottom = position + "px";
      }
    }, 20);
  }

  // 🎮 CONTROLS
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") jump();
  });

  document.addEventListener("touchstart", function () {
    jump();
  });

  // 🚧 BLOCK MOVEMENT + SCORE
  blocks.forEach(block => {

    let blockLeft = parseInt(block.style.left) || 800;
    let passed = false;

    setInterval(() => {
      if (!gameRunning) return;

      blockLeft -= 5;

      if (blockLeft < -50) {
        blockLeft = 800;
        passed = false;
      }

      block.style.left = blockLeft + "px";

      // 🎯 SCORE
      if (!passed && blockLeft < 50) {
        score++;
        passed = true;

        // 🏆 HIGH SCORE
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
        }

        updateScore();
      }

      // 💥 COLLISION DETECTION
      let playerBottom = parseInt(player.style.bottom) || 50;

      if (blockLeft < 80 && blockLeft > 0 && playerBottom < 60) {
        gameOver();
      }

    }, 30);
  });

  // 💰 SIMPLE COIN SYSTEM (AUTO REWARD)
  setInterval(() => {
    if (!gameRunning) return;

    coins += 1;
    localStorage.setItem("coins", coins);
    updateScore();

  }, 3000); // every 3 sec

  // ❌ GAME OVER
  function gameOver() {
    gameRunning = false;

    alert("💥 Game Over!\nScore: " + score);

    // restart
    location.reload();
  }

};

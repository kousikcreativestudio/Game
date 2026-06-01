window.onload = function () {

  // 🎯 ELEMENTS
  let player = document.getElementById("player");
  let blocks = document.querySelectorAll(".block");
  let coinsEl = document.querySelectorAll(".coin");
  let scoreDisplay = document.getElementById("score");

  // 📊 DATA
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("highScore")) || 0;

  let gameRunning = true;

  // 🟢 PLAYER PHYSICS
  let position = 50;
  let velocity = 0;
  let gravity = -0.6;
  let jumpCount = 0;

  // 🎯 UPDATE UI
  function updateScore() {
    scoreDisplay.innerText =
      "Score: " + score + " | Coins: " + coins + " | High: " + highScore;
  }
  updateScore();

  // 🟢 GAME LOOP (SMOOTH PHYSICS)
  function gameLoop() {
    if (!gameRunning) return;

    velocity += gravity;
    position += velocity;

    if (position <= 50) {
      position = 50;
      velocity = 0;
      jumpCount = 0;
    }

    player.style.bottom = position + "px";

    requestAnimationFrame(gameLoop);
  }
  gameLoop();

  // 🎮 CONTROLS
  function jump() {
    if (jumpCount >= 2) return;

    velocity = 10; // jump power
    jumpCount++;
  }

  document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
  });

  document.addEventListener("touchstart", jump);

  // 🚧 BLOCKS
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

        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
        }

        updateScore();
      }

      // 💥 COLLISION
      if (blockLeft < 80 && blockLeft > 0 && position < 60) {
        gameOver();
      }

    }, 30);
  });

  // 💰 REAL COIN SYSTEM
  coinsEl.forEach(coin => {

    let coinLeft = parseInt(coin.style.left) || 900;
    let coinBottom = parseInt(coin.style.bottom) || 80;

    coin.style.bottom = coinBottom + "px";

    setInterval(() => {
      if (!gameRunning) return;

      coinLeft -= 5;

      if (coinLeft < -20) {
        coinLeft = 900;

        // 🎯 random height
        coinBottom = Math.floor(Math.random() * 100) + 60;
        coin.style.bottom = coinBottom + "px";
      }

      coin.style.left = coinLeft + "px";

      // 💥 COLLECT
      if (
        coinLeft < 80 &&
        coinLeft > 20 &&
        position > coinBottom - 20 &&
        position < coinBottom + 40
      ) {
        coins++;
        localStorage.setItem("coins", coins);

        coinLeft = -50; // hide
        updateScore();
      }

    }, 30);
  });

  // ❌ GAME OVER
  function gameOver() {
    gameRunning = false;

    alert("💥 Game Over!\nScore: " + score);
    location.reload();
  }

};

window.onload = function () {

  // 🎯 ELEMENTS
  const player = document.getElementById("player");
  const blocks = document.querySelectorAll(".block");
  const coinsEl = document.querySelectorAll(".coin");
  const scoreDisplay = document.getElementById("score");

  let coins = parseInt(localStorage.getItem("coins")) || 0;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("highScore")) || 0;

  let gameRunning = true;

  // 🟢 PLAYER PHYSICS
  let position = 50;
  let velocity = 0;
  let gravity = -0.5;
  let jumpPower = 10;
  let jumpCount = 0;

  function jump() {
    if (jumpCount >= 2) return;
    velocity = jumpPower;
    jumpCount++;
  }

  // 🎯 SCORE UI
  function updateScore() {
    scoreDisplay.innerText =
      "Score: " + score + " | Coins: " + coins + " | High: " + highScore;
  }

  updateScore();

  // 🟢 GAME LOOP (PLAYER ONLY)
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
  document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
  });

  document.addEventListener("touchstart", jump);

  // 🪨 BLOCK LOGIC (FIXED)
  blocks.forEach(block => {

    let blockLeft = 800;
    let passed = false;
    let speed = 5;

    function setRandomStone() {
      let r = Math.random();
      if (r < 0.6) {
        block.style.width = "20px";
        block.style.height = "20px";
      } else if (r < 0.9) {
        block.style.width = "30px";
        block.style.height = "30px";
      } else {
        block.style.width = "40px";
        block.style.height = "40px";
      }
    }

    setRandomStone();

    setInterval(() => {
      if (!gameRunning) return;

      blockLeft -= speed;

      if (blockLeft < -60) {
        blockLeft = 800;
        passed = false;
        setRandomStone();
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

      // 💥 COLLISION (FIXED)
      let p = player.getBoundingClientRect();
      let b = block.getBoundingClientRect();

      let pad = 8;

      if (
        p.right - pad > b.left &&
        p.left + pad < b.right &&
        p.bottom - pad > b.top
      ) {
        gameOver();
      }

    }, 30);
  });

  // 💰 COINS (FIXED - NO NESTED INTERVAL BUG)
  coinsEl.forEach(coin => {

    let coinLeft = 900;
    let coinBottom = Math.random() * 120 + 60;

    setInterval(() => {
      if (!gameRunning) return;

      coinLeft -= 5;

      if (coinLeft < -20) {
        coinLeft = 900;
        coinBottom = Math.random() * 120 + 60;
      }

      coin.style.left = coinLeft + "px";
      coin.style.bottom = coinBottom + "px";

      // 💰 COLLECT
      if (
        coinLeft < 80 &&
        coinLeft > 20 &&
        position > coinBottom - 30 &&
        position < coinBottom + 30
      ) {
        coins++;
        localStorage.setItem("coins", coins);

        coinLeft = -50;
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

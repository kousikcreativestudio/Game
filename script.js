window.onload = function () {

  // 🎯 VARIABLES
  let player = document.getElementById("player");
  let blocks = document.querySelectorAll(".block");
  let coinsEl = document.querySelectorAll(".coin");
  let scoreDisplay = document.getElementById("score");

  let coins = parseInt(localStorage.getItem("coins")) || 0;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("highScore")) || 0;

  let gameRunning = true;

  // 🟢 PLAYER PHYSICS
  let position = 50;
  let velocity = 0;
 let gravity = -0.5;
let jumpPower = 9.5;

function jump() {
  if (jumpCount >= 2) return;

  velocity = jumpPower;
  jumpCount++;
}

  // 🎯 UPDATE UI
  function updateScore() {
    scoreDisplay.innerText =
      "Score: " + score + " | Coins: " + coins + " | High: " + highScore;
  }

  updateScore();

  // 🟢 GAME LOOP (SMOOTH MOVEMENT)
  function gameLoop() {
    if (!gameRunning) return;

    velocity += gravity;
    position += velocity;

    // 🟢 LAND FIX
    if (position <= 50) {
      position = 50;
      velocity = 0;
      jumpCount = 0;
    }

    player.style.bottom = position + "px";

    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  // 🟢 DOUBLE JUMP
  function jump() {
    if (jumpCount >= 2) return;

    velocity = 10;
    jumpCount++;
  }

  // 🎮 CONTROLS
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") jump();
  });

  document.addEventListener("touchstart", jump);

  // 🚧 BLOCK MOVEMENT
blocks.forEach(block => {

  let blockLeft = parseInt(block.style.left) || 800;
  let passed = false;

  let blockSpeed = 4.2; // ✅ ONLY ONE TIME

  // 🪨 RANDOM SIZE (SMALL / MEDIUM / BIG)
  function setRandomStone() {
    let type = Math.random();

    if (type < 0.65) {
      block.style.width = "18px";
      block.style.height = "18px";
    } 
    else if (type < 0.9) {
      block.style.width = "28px";
      block.style.height = "28px";
    } 
    else {
      block.style.width = "38px";
      block.style.height = "38px";
    }
  }

  setRandomStone();

  setInterval(() => {
    if (!gameRunning) return;

    // 🎯 MOVE
    blockLeft -= blockSpeed;

    // 🔁 RESET
    if (blockLeft < -60) {
      blockLeft = 800;
      passed = false;
      setRandomStone();
    }

    block.style.left = blockLeft + "px";

    // 🧮 SCORE
    if (!passed && blockLeft < 50) {
      score++;
      passed = true;

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }

      updateScore();
    }

// 💥 SAFE COLLISION (NO GAME FREEZE)

if (!player || !block) return; // 🛑 prevent crash

let playerRect = player.getBoundingClientRect();
let blockRect = block.getBoundingClientRect();

// hitbox adjust
let paddingX = 10;
let paddingY = 10;

let pLeft = playerRect.left + paddingX;
let pRight = playerRect.right - paddingX;
let pTop = playerRect.top + paddingY;
let pBottom = playerRect.bottom - paddingY;

if (
  pRight > blockRect.left &&
  pLeft < blockRect.right &&
  pBottom > blockRect.top &&
  pTop < blockRect.bottom
) {
  gameOver();
}

  // 💰 COIN SYSTEM (MOVING + COLLECT)
  coinsEl.forEach(coin => {

    let coinLeft = parseInt(coin.style.left) || 900;
    let coinBottom = Math.floor(Math.random() * 100) + 60;

    coin.style.bottom = coinBottom + "px";

    setInterval(() => {
      if (!gameRunning) return;

      coinLeft -= 5;

      if (coinLeft < -20) {
        coinLeft = 900;
        coinBottom = Math.floor(Math.random() * 120) + 60;
        coin.style.bottom = coinBottom + "px";
      }

      coin.style.left = coinLeft + "px";

      // 💥 COIN COLLECT
      if (
        coinLeft < 80 &&
        coinLeft > 20 &&
        position > coinBottom - 30 &&
        position < coinBottom + 30
      ) {
        coins++;
        localStorage.setItem("coins", coins);

        coinLeft = -50; // hide coin
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

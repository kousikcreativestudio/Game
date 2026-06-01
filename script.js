let player = document.getElementById("player");

let x = 50;
let y = 50;
let velocity = 0;
let gravity = 1;
let isJumping = false;

function gameLoop() {
  velocity -= gravity;
  y += velocity;

  if (y <= 50) {
    y = 50;
    velocity = 0;
    isJumping = false;
  }

  player.style.bottom = y + "px";
  player.style.left = x + "px";

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && !isJumping) {
    velocity = 15;
    isJumping = true;
  }

  if (e.code === "ArrowRight") {
    x += 10;
  }

  if (e.code === "ArrowLeft") {
    x -= 10;
  }
});

gameLoop();

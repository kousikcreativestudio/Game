let player = document.getElementById("player");

let position = 50;
let isJumping = false;

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && !isJumping) {
    jump();
  }

  if (e.code === "ArrowRight") {
    position += 10;
    player.style.left = position + "px";
  }

  if (e.code === "ArrowLeft") {
    position -= 10;
    player.style.left = position + "px";
  }
});

function jump() {
  isJumping = true;
  let up = 0;

  let jumpUp = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpUp);

      let fallDown = setInterval(() => {
        if (up <= 0) {
          clearInterval(fallDown);
          isJumping = false;
        }
        up -= 5;
        player.style.bottom = (50 + up) + "px";
      }, 20);

    }
    up += 5;
    player.style.bottom = (50 + up) + "px";
  }, 20);
}

const container = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const playAgainBtn = document.getElementById("playAgain");

let posX = parseInt(window.getComputedStyle(player).left);
let posY = parseInt(window.getComputedStyle(player).top);
const moveSpeed = 10;
let score = 0;
let cars = [];
let gameOver = false;

function createCar() {
  let c = document.createElement("div");
  c.className = "car";
  container.appendChild(c);
  return c;
}
function randomCar(carObj) {
  carObj.x = Math.random() < 0.5 ? -60 : 600;
  carObj.y = 100 + Math.floor(Math.random() * 400);
  carObj.speed = (Math.random() * 10 + 1) * (carObj.x < 0 ? 1 : -1);
  carObj.element.style.background = randomColor();
  carObj.element.style.top = carObj.y + "px";
}
function randomColor() {
  let r = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  let g = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  let b = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  return "#" + r + g + b;
}

for (let i = 0; i < 5; i++) {
  let e = createCar();
  cars.push({ element: e, x: -60, y: 200, speed: 2 });
}

const keys = {
  w: false,
  s: false,
  a: false,
  d: false,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "W") keys.w = true;
  if (e.key === "s" || e.key === "S") keys.s = true;
  if (e.key === "a" || e.key === "A") keys.a = true;
  if (e.key === "d" || e.key === "D") keys.d = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "W") keys.w = false;
  if (e.key === "s" || e.key === "S") keys.s = false;
  if (e.key === "a" || e.key === "A") keys.a = false;
  if (e.key === "d" || e.key === "D") keys.d = false;
});

cars.forEach((c) => randomCar(c));

function updatePlayer() {
  // Prevent further movement if game is over
  if (gameOver) return;

  let maxX = container.clientWidth - player.clientWidth;
  let maxY = container.clientHeight - player.clientHeight;
  if (keys.w) posY -= moveSpeed;
  if (keys.s) posY += moveSpeed;
  if (keys.a) posX -= moveSpeed;
  if (keys.d) posX += moveSpeed;
  if (posX < 0) posX = 0;
  if (posX > maxX) posX = maxX;
  if (posY > maxY) posY = maxY;
  player.style.left = posX + "px";
  player.style.top = posY + "px";
}

window.addEventListener("gamepadconnected", (e) => {});
window.addEventListener("gamepaddisconnected", (e) => {});

function readGamepad() {
  let g = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const gp of g) {
    if (!gp) continue;
    let dz = 0.2;
    let x = gp.axes[0],
      y = gp.axes[1];
    if (Math.abs(x) < dz) x = 0;
    if (Math.abs(y) < dz) y = 0;
    posX += x * moveSpeed;
    posY += y * moveSpeed;
  }
  updatePlayer();
}

function loop() {
  readGamepad();
  if (!gameOver) {
    cars.forEach((c) => {
      c.x += c.speed;
      if (c.x > 600 && c.speed > 0) c.x = -60;
      if (c.x < -60 && c.speed < 0) c.x = 600;
      c.element.style.left = c.x + "px";
      c.element.style.top = c.y + "px";
    });
    if (posY < 0) {
      score++;
      scoreDisplay.innerText = "Score: " + score;
      posY = 550;
      posX = 280;
      cars.forEach((c) => randomCar(c));
    }
    checkCollision();
  }
  requestAnimationFrame(loop);
}

function checkCollision() {
  let playerWidth = 38.8,
    playerHeight = 38.8,
    carWidth = 59,
    carHeight = 40;

  let playerX = posX + (40 - playerWidth) / 2;
  let playerY = posY + (40 - playerHeight) / 2;

  cars.forEach((c) => {
    let carX = c.x + (60 - carWidth) / 2;
    let carY = c.y + (40 - carHeight) / 2;

    if (
      playerX < carX + carWidth &&
      playerX + playerWidth > carX &&
      playerY < carY + carHeight &&
      playerY + playerHeight > carY
    ) {
      // collision
      gameOver = true;
      scoreDisplay.innerText += " | Game Over!";
      playAgainBtn.style.display = "block";
    }
  });
}

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

requestAnimationFrame(loop);

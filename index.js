/** @format */

const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;

const gameSpeedEl = document.querySelector("h2");

let frame = 0;
let gameSpeed = 5;

const boat = {
  x: 100,
  y: 100,
  width: 176,
  height: 136,
  frameX: 0,
  frameY: 0,
  speed: 5,
  moving: false,
};


// BACKGROUND - Mattias
const bg1 = new Image();
bg1.src = "./sprite/bg1.png"
const bg2 = new Image();
bg2.src = "./sprite/bg2.png"
const bg3 = new Image();
bg3.src = "./sprite/bg3.png"
const bg4 = new Image();
bg4.src = "./sprite/bg4.png"

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 125;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = 10 * this.speedModifier;
  }
  update() {
    this.speed = 10 * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = this.x - this.speed;
    this.x2 = this.x2 - this.speed;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y2, this.width, this.height);
  }
}

const layer1 = new Layer(bg4, 0.04);
const layer2 = new Layer(bg3, 0.06);
const layer3 = new Layer(bg2, 0.08);
const layer4 = new Layer(bg1, 0.10);

const gameBg = [layer1, layer2, layer3, layer4];

const boatSprite = new Image();
boatSprite.src = "./sprite/boat2.png";

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

const keys = [];
const moveBoat = () => {
  if (keys["ArrowUp"] && boat.y > 0) {
    boat.y -= boat.speed;
    boat.frameX = 1;
    boat.frameY = 1;
    boat.moving = true;
  }
  if (keys["ArrowDown"] && boat.y < canvas.height - boat.height) {
    boat.y += boat.speed;
    boat.frameX = 1;
    boat.frameY = 1;
    boat.moving = true;
  }
  if (keys["ArrowLeft"] && boat.x > 0) {
    boat.x -= boat.speed;
    boat.frameX = 0;
    boat.frameY = 3;
    boat.moving = true;
  }
  if (keys["ArrowRight"] && boat.x < canvas.width - boat.width) {
    boat.x += boat.speed;
    boat.frameX = 1;
    boat.frameY = 0;
    boat.moving = true;
  }

  // speedboost? :P
  if (keys["s"]) {
    console.log("speeeed");
    boat.speed += 3;
    setTimeout(() => {
      boat.speed = 1;
    }, 5000);
  }
};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  delete keys[e.key];
});

// let x = 0;
// let x2 = 2400;

let fps, fpsInterval, startTime, now, then, elapsed;

const startAnimating = (fps) => {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameBg.forEach(object => {
      object.update();
      object.draw();
    });
    drawSprite(
      boatSprite,
      boat.width * boat.frameX,
      boat.height * boat.frameY,
      boat.width,
      boat.height,
      boat.x,
      boat.y,
      boat.width,
      boat.height
    );
    moveBoat();
    handleCollisions();
    handleObstacles();
    
    frame++;
    if (frame%500 === 0) {
        gameSpeed++;
        gameSpeedEl.textContent = "Gamespeed: " + gameSpeed;
    }
  }
};

startAnimating(360);


// stone *****************
const stoneArray = [];

class Stone {
    constructor(x, y, size, color) {
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.floor(Math.random() * 70) + 30;
        this.color = 'white';
    }

    draw = () => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update = () => {
        this.x -= gameSpeed;
        this.draw();
    }
}


const handleObstacles = () => {
    if (frame%200 === 0) {
      stoneArray.unshift(new Stone);
    }

    for (let i = 0; i < stoneArray.length; i++) {
      stoneArray[i].update();
    }

    if (stoneArray.length > 10) {
      stoneArray.pop(stoneArray[0]);
    };
}

// collision ***********
const handleCollisions = () => {
    for (let i = 0; i < stoneArray.length; i++) {
        if (boat.x < stoneArray[i].x + stoneArray[i].size && boat.x + boat.width > stoneArray[i].x && boat.y < stoneArray[i].y + stoneArray[i].size && boat.y + boat.height > stoneArray[i].y) {
            console.log('pang');
            stoneArray[i].color = 'red';
            return true;
        }
    }
}
/** @format */

const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

const gameSpeedEl = document.querySelector("h2");

let frame = 0;
let gameSpeed = 1;

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
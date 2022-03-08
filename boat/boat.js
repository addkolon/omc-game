/** @format */

import { canvas, ctx } from "../index.js";

import { gamePlay } from "../gamePlay/gamePlay.js";

let changeGameSpeed = true;

let drivingSpeedChange = 2;

export const boat = {
  x: 100,
  y: 100,
  width: 176,
  height: 74,
  frameX: 0,
  frameY: 0,
  speed: 5,
  moving: false,
};

export const boatSprite = new Image();
boatSprite.src = "../sprite/boat-3.png";

export const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

const keys = [];
export const moveBoat = () => {
  if (keys["ArrowUp"] && boat.y > 125) {
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
  if (keys["ArrowLeft"]) {
    if (boat.x > 0) {
      boat.x -= boat.speed;
      boat.frameX = 1;
      boat.frameY = 2;
      boat.moving = true;
    }

    if (changeGameSpeed) {
      console.log("left");
      if (gamePlay.speed > 1 && !keys["ArrowRight"]) {
        gamePlay.updateSpeed(drivingSpeedChange, false);
      }
      changeGameSpeed = false;
    }
  }
  if (keys["ArrowRight"]) {
    if (boat.x < canvas.width - boat.width) {
      boat.x += boat.speed;
      boat.frameX = 2;
      boat.frameY = 0;
      boat.moving = true;
    }

    if (changeGameSpeed) {
      console.log("right");
      if (!keys["ArrowDown"]) {
        gamePlay.updateSpeed(drivingSpeedChange, true);
        // gameSpeed += drivingSpeedChange;
      }
      changeGameSpeed = false;
    }
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
  if (!keys[e.key]) {
    keys[e.key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (keys[e.key]) {
    delete keys[e.key];
    if (e.key === "ArrowRight") {
      console.log("right up");
      if (!keys["ArrowLeft"] && gamePlay.speed > 1) {
        gamePlay.updateSpeed(drivingSpeedChange, false);
      }
      changeGameSpeed = true;
    }
    if (e.key === "ArrowLeft") {
      console.log("left up");
      if (!keys["ArrowRight"] && gamePlay.speed > 1) {
        gamePlay.updateSpeed(drivingSpeedChange, true);
      }
      changeGameSpeed = true;
    }
  }
});
